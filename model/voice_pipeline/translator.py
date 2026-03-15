import logging

logger = logging.getLogger(__name__)

def translate_text(text: str, source_lang: str, target_lang: str = "en") -> str:
    """
    Translates text between languages using Bhashini API.
    Used to translate User Lang -> English before query, and English -> User Lang after response.
    """
    logger.info(f"Translating text: '{text}' from {source_lang} to {target_lang}")
    
    # Mocking translation
    if source_lang == target_lang:
        return text
        
    if target_lang == "en":
        return "When can I withdraw money from NPS?"
        
    # Translate EN back to Target Lang
    mock_translated_responses = {
        "hi": "आप अपनी सेवानिवृत्ति (60 वर्ष) पर एनपीएस से पैसे निकाल सकते हैं। कुछ विशेष परिस्थितियों में आंशिक निकासी की भी अनुमति है।",
        "ta": "உங்கள் ஓய்வு பெறும்போது (60 வயது) என்.பி.எஸ் இலிருந்து பணத்தை எடுக்கலாம். சில குறிப்பிட்ட சூழ்நிலைகளில் பகுதி பணமும் எடுக்க அனுமதிக்கப்படுகிறது.",
        "ml": "നിങ്ങളുടെ വിരമിക്കൽ സമയത്ത് (60 വയസ്സ്) എൻപിഎസിൽ നിന്ന് പണം പിൻവലിക്കാം. ചില പ്രത്യേക സാഹചര്യങ്ങളിൽ ഭാഗികമായി പണം പിൻവലിക്കാനും അനുവദിച്ചിരിക്കുന്നു.",
        "bn": "আপনি আপনার অবসরে (৬০ বছর) এনপিএস থেকে টাকা তুলতে পারবেন। কিছু নির্দিষ্ট পরিস্থিতিতে আংশিক টাকা তোলারও অনুমতি দেওয়া হয়।"
    }
    
    result = mock_translated_responses.get(target_lang, text)
    logger.info(f"Translated Result: {result}")
    return result
