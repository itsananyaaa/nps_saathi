import logging
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)

# Initialize Gemini API if key is available
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def translate_text(text: str, source_lang: str, target_lang: str = "en") -> str:
    """
    Translates text between languages using Gemini API.
    Used to translate User Lang -> English before query, and English -> User Lang after response.
    """
    logger.info(f"Translating text: '{text}' from {source_lang} to {target_lang}")
    
    if source_lang == target_lang:
        return text
        
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        Translate the following text from {source_lang} to {target_lang}.
        Provide ONLY the translated text, with no conversational filler, explanations, or quotes.
        
        Text to translate:
        {text}
        """
        
        response = model.generate_content(prompt)
        translated_text = response.text.strip()
        logger.info(f"Translated Result: {translated_text}")
        return translated_text
        
    except Exception as e:
        logger.error(f"Gemini Translation failed: {e}")
        error_msg = str(e).lower()
        if "429" in error_msg or "quota" in error_msg:
             return "SYSTEM ERROR: API Quota Exceeded. Please try again later."
        # Fallback to returning original text if translation fails
        return text
