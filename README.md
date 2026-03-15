# NPS Saathi - National Pension System AI Assistant

## Environment
- Python 3.10+
- Node.js 18+

## Backend (`model/`)

### Install
```bash
cd model
pip install -r requirements.txt
```

### Run
```bash
uvicorn main:app --reload --port 8000
```

## Frontend (`frontend/`)

### Install
```bash
cd frontend
npm install
```

### Run
```bash
npm run dev
```

## AI Engines (Phase 1)
- RAG Pension Knowledge Engine
- Retirement Forecasting Engine
- Monte Carlo Simulator
- Decision Recommendation Engine
- AI Pipeline Controller

## Voice Pipeline (Phase 2)
- Multilingual support: English, Hindi, Tamil, Malayalam, Bengali
- Bhashini API integration for STT / Translate / TTS
- API endpoints: `POST /api/v1/voice_query`, `POST /api/v1/text_query`
- Frontend: language selector, MediaRecorder voice input, audio playback

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ask` | General AI query |
| POST | `/api/v1/text_query` | Multilingual text query |
| POST | `/api/v1/voice_query` | Voice-to-voice query |
| POST | `/api/v1/forecast` | Retirement forecast |
| POST | `/api/v1/simulate` | Monte Carlo simulation |
| POST | `/api/v1/recommend` | Investment advice |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/register` | User registration |

## Notes
- Bhashini API keys must be added to `model/.env` to enable live voice translation
- Without keys, the voice pipeline uses mock responses for local testing
