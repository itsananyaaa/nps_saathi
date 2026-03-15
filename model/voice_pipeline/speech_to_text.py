import logging

logger = logging.getLogger(__name__)

def speech_to_text(audio_base64: str, source_lang: str = "hi") -> str:
    """
    Converts speech (base64 audio) to text using Bhashini API.
    Since API keys are not provided, this returns a mocked text based on the language.
    """
    logger.info(f"Calling Bhashini STT API for language: {source_lang}")
    
    # Mocking Bhashini STT response
    mock_responses = {
        "hi": "मैं एनपीएस से पैसे कब निकाल सकता हूँ?",
        "ta": "என்.பி.எஸ் இலிருந்து பணத்தை எப்போது எடுக்க முடியும்?",
        "ml": "എനിക്ക് എപ്പോൾ എൻപിഎസിൽ നിന്ന് പണം പിൻവലിക്കാം?",
        "bn": "আমি কখন এনপিএস থেকে টাকা তুলতে পারবো?",
        "en": "When can I withdraw money from NPS?"
    }
    
    result = mock_responses.get(source_lang, mock_responses["en"])
    logger.info(f"STT Result: {result}")
    return result
