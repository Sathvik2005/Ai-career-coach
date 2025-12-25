from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from app.model import recommend_career

app = FastAPI(title="Career Service")

class CareerRequest(BaseModel):
    skills: list[str]
    interests: list[str]
    academic_score: float

class CareerResponse(BaseModel):
    recommendations: list[str]
    confidence: float
    skill_gaps: list[str]

@app.post("/career/recommend", response_model=CareerResponse)
async def recommend(request: CareerRequest):
    try:
        result = recommend_career(request.skills, request.interests, request.academic_score)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
