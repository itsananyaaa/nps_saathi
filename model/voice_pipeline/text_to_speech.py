import logging

logger = logging.getLogger(__name__)

def text_to_speech(text: str, target_lang: str) -> str:
    """
    Converts translated text back into speech using Bhashini TTS API.
    Returns base64 encoded audio string.
    """
    logger.info(f"Calling Bhashini TTS API for language: {target_lang}")
    
    # Returning a mocked short base64 string to simulate an audio file payload
    mock_audio_base64 = "UklGRhwKAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YfgJAAAA"
    logger.info("TTS Conversion Complete (mocked).")
    
    return mock_audio_base64
