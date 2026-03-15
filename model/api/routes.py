from fastapi import APIRouter, HTTPException
import sys
import os

# Ensure the project root is in sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.schemas import QueryRequest, UserProfile, TextQueryRequest, VoiceQueryRequest
from ai_pipeline.pipeline_controller import handle_query
from voice_pipeline.voice_controller import process_voice_query, process_text_query
from forecasting_engine.retirement_model import generate_retirement_forecast
from forecasting_engine.monte_carlo_simulator import run_monte_carlo_simulation
from decision_engine.recommendation_engine import generate_financial_advice
from ai_pipeline.response_formatter import format_response

import logging
import time
import jwt

logger = logging.getLogger(__name__)

SECRET_KEY = "nps_saathi_secret_key_mock"

router = APIRouter(prefix="/api/v1")

# --- AUTH ROUTES ---
@router.post("/auth/login", summary="User Login")
async def login_user(credentials: dict):
    # Mocking standard DB login for phase 1 
    token = jwt.encode({"user": credentials.get("email", "user@example.com")}, SECRET_KEY, algorithm="HS256")
    return {"success": True, "token": token, "message": "Login successful"}

@router.post("/auth/register", summary="User Registration")
async def register_user(user_data: dict):
    # Mocking standard DB register for phase 1 
    token = jwt.encode({"user": user_data.get("email", "user@example.com")}, SECRET_KEY, algorithm="HS256")
    return {"success": True, "token": token, "message": "Registration successful"}
# --------------------

@router.post("/ask", summary="Send a unified AI Query")
async def ask_ai(request: QueryRequest):
    """
    Routes a general text query through the AI Pipeline Controller.
    """
    user_profile_dict = request.user_profile.model_dump() if request.user_profile else {}
    
    start_time = time.time()
    logger.info(f"Incoming request: /ask | Query: {request.query}")
    
    try:
        response = handle_query(request.query, user_profile_dict)
        logger.info(f"Response generation time: {time.time() - start_time:.4f}s")
        return response
    except Exception as e:
        logger.error(f"Error processing /ask: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/text_query", summary="Send a native language text query")
async def text_query_endpoint(request: TextQueryRequest):
    """
    Translates native text to English, generates response, translates back.
    """
    user_profile_dict = request.user_profile.model_dump() if request.user_profile else {}
    
    start_time = time.time()
    logger.info(f"Incoming request: /text_query | Language: {request.language}")
    
    try:
        response = process_text_query(
            text=request.text,
            source_lang=request.language,
            ai_pipeline_func=handle_query,
            user_profile=user_profile_dict,
            requires_tts=False
        )
        return response
    except Exception as e:
        logger.error(f"Error processing /text_query: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/voice_query", summary="Send a voice query (base64 audio)")
async def voice_query_endpoint(request: VoiceQueryRequest):
    """
    STT -> Translate -> AI -> Translate -> TTS
    """
    user_profile_dict = request.user_profile.model_dump() if request.user_profile else {}
    
    start_time = time.time()
    logger.info(f"Incoming request: /voice_query | Language: {request.language}")
    
    try:
        response = process_voice_query(
            audio_base64=request.audio_base64,
            source_lang=request.language,
            ai_pipeline_func=handle_query,
            user_profile=user_profile_dict
        )
        return response
    except Exception as e:
        logger.error(f"Error processing /voice_query: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/forecast", summary="Generate a deterministic retirement forecast")
async def forecast_endpoint(profile: UserProfile):
    """
    Directly calls the forecasting engine using the provided profile.
    """
    start_time = time.time()
    logger.info(f"Incoming request: /forecast | Profile: {profile}")
    logger.info("Detected Intent: retirement_forecast")
    logger.info("Selected Engine: Forecasting Engine")
    
    try:
        result = generate_retirement_forecast(profile.model_dump())
        response = format_response(
            intent="retirement_forecast",
            response_text="Retirement forecast generated.",
            financial_data=result
        )
        logger.info(f"Response generation time: {time.time() - start_time:.4f}s")
        return response
    except Exception as e:
        logger.error(f"Error processing /forecast: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/simulate", summary="Run a Monte Carlo retirement simulation")
async def simulate_endpoint(profile: UserProfile):
    """
    Directly calls the Monte Carlo stochastic engine.
    """
    start_time = time.time()
    logger.info(f"Incoming request: /simulate | Profile: {profile}")
    logger.info("Detected Intent: simulation")
    logger.info("Selected Engine: Monte Carlo Simulator")
    
    try:
        data = profile.model_dump()
        result = run_monte_carlo_simulation(
            age=data["age"],
            retirement_age=data["retirement_age"],
            monthly_contribution=data["monthly_contribution"],
            mean_return=data["expected_return"],
            volatility=data["volatility"]
        )
        # Strip exact list for JSON payload stability
        summary = {k: v for k, v in result.items() if k != "all_simulations"}
        response = format_response(
            intent="simulation",
            response_text="Monte Carlo simulation complete.",
            financial_data=summary
        )
        logger.info(f"Response generation time: {time.time() - start_time:.4f}s")
        return response
    except Exception as e:
        logger.error(f"Error processing /simulate: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend", summary="Generate financial advice and schemes")
async def recommend_endpoint(profile: UserProfile):
    """
    Directly calls the Decision Intelligence engine.
    """
    start_time = time.time()
    logger.info(f"Incoming request: /recommend | Profile: {profile}")
    logger.info("Detected Intent: investment_recommendation")
    logger.info("Selected Engine: Decision Engine")
    
    try:
        result = generate_financial_advice(profile.model_dump())
        response = format_response(
            intent="investment_recommendation",
            response_text="Financial advice generated.",
            financial_data=result
        )
        logger.info(f"Response generation time: {time.time() - start_time:.4f}s")
        return response
    except Exception as e:
        logger.error(f"Error processing /recommend: {e}")
        raise HTTPException(status_code=500, detail=str(e))
