import logging
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)

# Initialize Gemini API if key is available
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

SUPPORTED_LANGUAGES = {
    "English": "en",
    "Hindi": "hi",
    "Tamil": "ta",
    "Malayalam": "ml",
    "Bengali": "bn"
}

def detect_language(text: str) -> str:
    """
    Detects the language of the given text using Gemini API.
    Returns the ISO 639-1 language code (e.g., 'en', 'hi', 'ta').
    """
    logger.info("Detecting language using Gemini...")
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        Detect the language of the following text. 
        Respond with ONLY the two-letter ISO 639-1 language code (e.g., 'en' for English, 'hi' for Hindi, 'ta' for Tamil).
        Do not include any other text, punctuation, or explanation.
        
        Text:
        {text}
        """
        
        response = model.generate_content(prompt)
        lang_code = response.text.strip().lower()
        
        # Basic validation
        if len(lang_code) == 2 and lang_code.isalpha():
            logger.info(f"Detected language: {lang_code}")
            return lang_code
        else:
            logger.warning(f"Unexpected language code format from Gemini: '{lang_code}'. Defaulting to 'en'.")
            return "en"
            
    except Exception as e:
        logger.error(f"Gemini Language Detection failed: {e}")
        return "en"
