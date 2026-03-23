import logging
import base64
import io
from gtts import gTTS

logger = logging.getLogger(__name__)

def text_to_speech(text: str, target_lang: str) -> str:
    """
    Converts translated text back into speech using gTTS.
    Returns base64 encoded audio string.
    """
    logger.info(f"Calling gTTS API for language: {target_lang}")
    
    try:
        # Generate audio
        tts = gTTS(text=text, lang=target_lang, slow=False)
        
        # Save to in-memory bytes buffer
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        
        # Convert to base64
        audio_base64 = base64.b64encode(fp.read()).decode('utf-8')
        logger.info("TTS Conversion Complete (gTTS).")
        
        return audio_base64
        
    except Exception as e:
        logger.error(f"gTTS conversion failed: {e}")
        # Returning a mocked short base64 string as fallback
        return "UklGRhwKAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YfgJAAAA"
