import os
try:
    from langchain_openai import ChatOpenAI
    from langchain_google_genai import ChatGoogleGenerativeAI
except ImportError:
    pass

from .prompt_templates import pension_prompt_template
from .vector_db import retrieve_context

def get_llm():
    """
    Initializes the LLM based on available environment variables.
    Currently prioritizes Google Gemini, falling back to OpenAI.
    """
    if os.getenv("GOOGLE_API_KEY"):
        print("Using Google Gemini 2.5 Flash...")
        return ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
    elif os.getenv("OPENAI_API_KEY"):
        print("Using OpenAI GPT-4o-mini...")
        return ChatOpenAI(model="gpt-4o-mini", temperature=0)
    else:
        raise ValueError("No LLM API key found in environment variables. Please set GOOGLE_API_KEY or OPENAI_API_KEY.")

def format_context(retrieved_chunks: list, max_tokens: int = 1200) -> str:
    """
    Formats the context efficiently, injecting source and chunk_id metadata 
    to ensure the LLM can provide correct citations. Limits tokens roughly.
    """
    formatted_chunks = []
    estimated_length = 0
    
    for res in retrieved_chunks:
        chunk = res["chunk"]
        chunk_text = f"[{chunk.get('chunk_id')} | source: {chunk.get('source')}]\n{chunk.get('text')}"
        
        # Rough token estimation (1 token approx 4 chars)
        if estimated_length + (len(chunk_text) / 4) > max_tokens:
            break
            
        formatted_chunks.append(chunk_text)
        estimated_length += len(chunk_text) / 4
        
    return "\n\n".join(formatted_chunks)

import json
from .response_validator import validate_response

def generate_rag_response(query: str, retrieved_chunks: list, user_profile: dict = None) -> dict:
    """
    The main RAG pipeline generator with hallucination prevention and personalization.
    Formats the retrieved context, applies the strict prompt template, invokes the LLM,
    and then parses and validates the response securely.
    """
    llm = get_llm()
    
    user_profile_text = "\\n".join([f"{k}: {v}" for k, v in user_profile.items()]) if user_profile else "No profile provided."
    
    if query.startswith("SYSTEM_ERROR"):
        return {
            "answer": query,
            "sources": []
        }
    
    if not retrieved_chunks:
        # Fallback for out-of-scope or general queries:
        # Ask the LLM to provide a general helpful conversational response instead of rejecting it.
        fallback_prompt = f"You are a helpful pension assistant for NPS Saathi. The user's profile is: {user_profile_text}. The user asked: '{query}'. Provide a helpful, concise, personalized response. Do not hallucinate NPS specific rules if you don't know them."
        response_text = llm.invoke(fallback_prompt).content
        return {
            "answer": response_text.strip(),
            "sources": []
        }
    
    context_text = format_context(retrieved_chunks)
    
    # Format the prompt
    prompt_value = pension_prompt_template.invoke({
        "context_text": context_text,
        "query": query,
        "user_profile_text": user_profile_text
    })
    
    # Generate the response
    llm_output = llm.invoke(prompt_value).content
    
    # Parse the LLM output (expecting JSON)
    try:
        # Strip markdown json block if LLM added it
        raw_json = llm_output.strip()
        if raw_json.startswith("```json"):
            raw_json = raw_json[7:-3].strip()
        elif raw_json.startswith("```"):
            raw_json = raw_json[3:-3].strip()
            
        parsed_response = json.loads(raw_json)
        answer = parsed_response.get("answer", "")
        sources = parsed_response.get("sources", [])
        
    except json.JSONDecodeError:
        # Fallback if the LLM didn't return strict JSON
        answer = llm_output
        sources = []
        
    # Validate the semantic answer against rules
    validated_answer = validate_response(answer, retrieved_chunks)
    
    # If the validator overwrote it with the rejection phrase, clear the sources
    if "could not find this information" in validated_answer.lower():
        sources = []
        # Instead of failing, query Gemini via general knowledge
        try:
            fallback_prompt = f"You are a helpful pension assistant for NPS Saathi. The user's profile is: {user_profile_text}. The user asked: '{query}'. Provide a helpful, personalized response using your general knowledge about NPS. Do not hallucinate specific numbers if you are unsure. Never say you cannot provide personalized advice."
            response_text = llm.invoke(fallback_prompt).content
            validated_answer = response_text.strip()
        except Exception as e:
            error_msg = str(e).lower()
            if "429" in error_msg or "quota" in error_msg:
                 validated_answer = "SYSTEM ERROR: API Quota Exceeded. The AI is currently rate-limited. Please try again soon."
            else:
                 validated_answer = "I'm sorry, an error occurred while generating a response."
        
    return {
        "answer": validated_answer,
        "sources": sources
    }
