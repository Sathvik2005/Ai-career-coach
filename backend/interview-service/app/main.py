from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import uvicorn
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Interview Service")

# Configure Gemini (Mock key if not present, but logic is here)
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

class QuestionRequest(BaseModel):
    role: str
    level: str

class QuestionResponse(BaseModel):
    questions: list[str]

class EvaluationResponse(BaseModel):
    score: int
    feedback: str

@app.post("/interview/start", response_model=QuestionResponse)
async def start_interview(request: QuestionRequest):
    if not API_KEY:
        # Fallback if no key
        return {"questions": [
            f"Tell me about your experience as a {request.role}.",
            "What is your biggest strength?",
            "Describe a challenging project."
        ]}
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"Generate 3 interview questions for a {request.level} {request.role}."
        response = model.generate_content(prompt)
        questions = [q.strip() for q in response.text.split('\n') if q.strip()]
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/interview/evaluate", response_model=EvaluationResponse)
async def evaluate_answer(question: str, answer_audio: UploadFile = File(...)):
    # In a real app, we would use Speech-to-Text (Whisper/Google STT) here.
    # For this demo, we will assume the client sends text or we mock the transcription.
    
    # Mock transcription
    transcribed_text = "I have 3 years of experience in Python and I love building APIs."
    
    if not API_KEY:
        return {"score": 8, "feedback": "Good answer (Mock evaluation)."}

    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"Question: {question}\nAnswer: {transcribed_text}\nRate this answer 1-10 and give feedback."
        response = model.generate_content(prompt)
        return {"score": 8, "feedback": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8003)
