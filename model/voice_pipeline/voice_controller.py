import logging
import time
from typing import Optional
from voice_pipeline.speech_to_text import speech_to_text
from voice_pipeline.translator import translate_text
from voice_pipeline.text_to_speech import text_to_speech

logger = logging.getLogger(__name__)

def process_voice_query(audio_base64: str, source_lang: str, ai_pipeline_func, user_profile: dict) -> dict:
    """
    End-to-End Multilingual Voice Pipeline:
    1. STT (Audio -> Orig Lang Text)
    2. Translate (Orig Lang Text -> EN Text)
    3. AI Engine Pipeline (EN Text -> EN Response)
    4. Translate (EN Response -> Orig Lang Response)
    5. TTS (Orig Lang Response -> Audio)
    """
    start_time = time.time()
    logger.info(f"[VOICE PIPELINE] Starting for user language: {source_lang}")
    
    # Step 1: Speech to Text
    try:
        orig_text = speech_to_text(audio_base64, source_lang)
    except Exception as e:
        logger.error(f"STT failed: {e}")
        raise ValueError("Speech to Text processing failed")
        
    # Process as a text query
    return process_text_query(orig_text, source_lang, ai_pipeline_func, user_profile, requires_tts=True, start_time=start_time)

def process_text_query(text: str, source_lang: str, ai_pipeline_func, user_profile: dict, requires_tts: bool = False, start_time: Optional[float] = None) -> dict:
    """
    Handles translation wrapper around the core AI pipeline function.
    """
    if start_time is None:
        start_time = time.time()
        logger.info(f"[TEXT PIPELINE] Starting for user language: {source_lang}")
        
    if text.startswith("SYSTEM_ERROR") or text.startswith("SYSTEM ERROR"):
        logger.warning("Short-circuiting due to STT System Error.")
        return _package_short_circuit(text, source_lang, requires_tts, start_time)

    # Step 2: Translate to English for AI processing
    logger.info(f"[PIPELINE LOG] User Language: {source_lang}")
    english_query = translate_text(text, source_lang=source_lang, target_lang="en")
    logger.info(f"[PIPELINE LOG] Translated Query (EN): {english_query}")
    
    if english_query.startswith("SYSTEM_ERROR") or english_query.startswith("SYSTEM ERROR"):
        logger.warning("Short-circuiting due to Translation System Error.")
        return _package_short_circuit(english_query, source_lang, requires_tts, start_time)
    
    # Step 3: Core AI Pipeline
    try:
        # ai_pipeline_func takes (query, user_profile) and returns a dict
        engine_response = ai_pipeline_func(english_query, user_profile)
    except Exception as e:
        logger.error(f"AI Pipeline failed: {e}")
        error_msg = str(e).lower()
        if "429" in error_msg or "quota" in error_msg or "resource_exhausted" in error_msg:
             resp_msg = "SYSTEM ERROR: API Quota Exceeded. The AI is currently rate-limited. Please try again soon."
        else:
             resp_msg = "An error occurred while processing your request."
        engine_response = {"intent": "unknown", "response": resp_msg, "sources": [], "financial_data": {}}
        
    en_response_text = engine_response.get("response", "No response generated.")
    logger.info(f"[PIPELINE LOG] Selected Engine Intent: {engine_response.get('intent')}")
    
    # Step 4: Translate back to user's native language
    if isinstance(en_response_text, str) and (en_response_text.startswith("SYSTEM_ERROR") or en_response_text.startswith("SYSTEM ERROR")):
         native_response_text = en_response_text
    else:
         native_response_text = translate_text(en_response_text, source_lang="en", target_lang=source_lang)
    
    # Output packaging
    final_output: dict = {
        "intent": engine_response.get("intent", "unknown"),
        "response": native_response_text,
        "sources": engine_response.get("sources", []),
        "financial_data": engine_response.get("financial_data", {})
    }
    
    # Step 5: Optional TTS conversion
    if requires_tts:
        try:
            audio_response = text_to_speech(native_response_text, target_lang=source_lang)
            final_output["audio_response"] = audio_response
        except Exception as e:
            logger.error(f"TTS failed: {e}")
            final_output["audio_response"] = None
            
    logger.info(f"[PIPELINE LOG] Response Time: {time.time() - start_time:.4f}s")
    return final_output

def _package_short_circuit(error_text: str, source_lang: str, requires_tts: bool, start_time: float) -> dict:
    final_output: dict = {
        "intent": "error",
        "response": error_text,
        "sources": [],
        "financial_data": {}
    }
    if requires_tts:
        try:
            audio_response = text_to_speech(error_text, target_lang=source_lang)
            final_output["audio_response"] = audio_response
        except Exception as e:
            logger.error(f"TTS failed: {e}")
            final_output["audio_response"] = None
            
    logger.info(f"[PIPELINE LOG] Response Time: {time.time() - start_time:.4f}s")
    return final_output
