# AI Career Coach Platform

A comprehensive full-stack AI platform for career guidance, resume analysis, and mock interviews.

## Architecture

The system is built using a microservices architecture:

### Backend (Microservices)
- **API Gateway** (Node.js): Central entry point running on port `8000`. Routes requests to specific services.
- **Resume Service** (FastAPI, Port 8001): Parses resumes (PDF/DOCX), extracts skills, and calculates ATS scores.
- **Career Service** (FastAPI, Port 8002): Recommends career paths based on skills and interests.
- **Interview Service** (FastAPI, Port 8003): Generates interview questions and evaluates answers using LLMs (Google Gemini).
- **Multimodal Service** (FastAPI, Port 8004): Analyzes video/audio for sentiment and confidence.
- **Database**: PostgreSQL (for storing user data and results).

### Frontend
- **React + Vite**: Modern, fast frontend.
- **Tailwind CSS**: Styling.
- **Axios**: API integration.

## Prerequisites
- Docker & Docker Compose
- Node.js (for local frontend dev)
- Google Gemini API Key (for Interview Service)

## Setup & Running

### 1. Backend (Docker)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Set your Google API Key in `docker-compose.yml` or export it:
   ```bash
   export GOOGLE_API_KEY=your_key_here
   ```
3. Build and start the services:
   ```bash
   docker-compose up --build
   ```

The API Gateway will be available at `http://localhost:8000`.

### 2. Frontend (Local)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The UI will be available at `http://localhost:3000` (or whatever port Vite selects).

## API Endpoints

- **POST /api/resume/parse**: Upload `file` (PDF/DOCX).
- **POST /api/career/recommend**: JSON body `{ skills: [], interests: [], academic_score: float }`.
- **POST /api/interview/start**: JSON body `{ role: string, level: string }`.
- **POST /api/interview/evaluate**: Multipart form with `answer_audio` and query param `question`.
- **POST /api/multimodal/analyze**: Multipart form with `video` and `audio` files.

## Features Implemented
- ✅ Resume Parsing & ATS Scoring
- ✅ Career Path Recommendation
- ✅ AI Mock Interview (Question Generation & Evaluation)
- ✅ Multimodal Analysis (Mocked logic for heavy ML models)
