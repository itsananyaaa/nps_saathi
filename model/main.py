import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from api.routes import router as api_router

app = FastAPI(title="NPS Saathi API", description="AI-powered Pension Advisory System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to NPS Saathi. The API is running."}

if __name__ == "__main__":
    print("Starting NPS Saathi System...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
