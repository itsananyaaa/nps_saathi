# NPS Saathi - National Pension System AI Assistant

NPS Saathi is an AI-powered assistant, designed to simplify the National Pension System (NPS) experience for users through a comprehensive set of features including conversational AI, retirement forecasting, and multilingual voice interactions.

## Key Features

1. **RAG Pension Knowledge Engine**: Answers user queries accurately based on core NPS policies and rules.
2. **Retirement Forecasting & Monte Carlo Simulator**: Provides data-driven insights and simulations for retirement planning.
3. **Multilingual Voice Pipeline**: Supports native voice interactions in English, Hindi, Tamil, Malayalam, and Bengali, making the platform accessible.
4. **Interactive Dashboard**: Modern user interface (`new_frontend`) tailored for navigating NPS easily.

## Environment Requirements
- Python 3.10+
- Node.js 18+

## Backend Setup (`model/`)

The backend is powered by FastAPI and integrates the AI models, RAG engine, and voice processing.

### Install Dependencies
```bash
cd model
pip install -r requirements.txt
```

### Environment Configuration
Create a `.env` file in the `model/` directory. You will need:
- `OPENAI_API_KEY` (or equivalent for LLM)
- Bhashini API Keys (for live voice translation)
*Note: Without Bhashini keys, the voice pipeline will fall back to local mock responses.*

### Run Backend
```bash
cd model
uvicorn ai_pipeline.pipeline_controller:app --reload --port 8000
```
*(Check the specific entry file, typically launched via `pipeline_controller` or `main.py`)*

## Frontend Setup (`new_frontend/kimi/app/`)

The new user interface provides a rich, responsive experience.

### Install Dependencies
```bash
cd new_frontend/kimi/app
npm install
```

### Run Frontend
```bash
npm run dev
```

*(Legacy frontend remains in `frontend/` but is superseded by the `new_frontend`).*

## API Endpoints

The core backend offers several key endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ask` | General AI query using RAG |
| POST | `/api/v1/text_query` | Multilingual text query processing |
| POST | `/api/v1/voice_query` | Voice-to-voice query handling |
| POST | `/api/v1/forecast` | Retirement forecast generation |
| POST | `/api/v1/simulate` | Monte Carlo investment simulation |
| POST | `/api/v1/recommend` | Personalized investment advice |
| POST | `/api/v1/auth/login` | User authentication - login |
| POST | `/api/v1/auth/register` | User authentication - registration |

## Project Status
**Finished.** All major pipeline phases—including the core backend RAG system, the multilingual voice interactions, and the modern UI dashboard—are fully integrated and robust.
