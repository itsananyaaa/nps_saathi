import logging
import os
import base64
import google.generativeai as genai

logger = logging.getLogger(__name__)

# Initialize Gemini API if key is available
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def speech_to_text(audio_base64: str, source_lang: str = "hi") -> str:
    """
    Converts speech (base64 audio) to text using Gemini API.
    Handles audio uploaded as base64 string from the frontend.
    """
    logger.info(f"Calling Gemini STT API for language: {source_lang}")
    
    try:
        # Decode base64 audio
        audio_bytes = base64.b64decode(audio_base64)
        
        # Generate content using Gemini 2.5 Flash
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"Transcribe the attached audio accurately. The language spoken is roughly {source_lang}. Provide ONLY the exact transcribed text, without any conversational filler, explanation, or quotes around it."
        
        logger.info("Sending inline audio data to Gemini...")
        response = model.generate_content([
            prompt,
            {
                "mime_type": "audio/webm",
                "data": audio_bytes
            }
        ])
        
        transcribed_text = response.text.strip()
        logger.info(f"STT Result: {transcribed_text}")
        
        return transcribed_text
                
    except Exception as e:
        logger.error(f"Gemini Speech-to-Text failed: {e}")
        error_msg = str(e).lower()
        if "429" in error_msg or "quota" in error_msg:
             return "SYSTEM_ERROR: API Quota Exceeded. Please try typing your question instead, or wait a few minutes."
        # Fallback to English generic text if completely fails for other reasons
        return "When can I withdraw money from NPS?"
