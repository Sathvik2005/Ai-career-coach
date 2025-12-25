from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import uvicorn
from app.parser import parse_resume
import shutil
import os

app = FastAPI(title="Resume Service")

class ResumeResponse(BaseModel):
    text: str
    skills: list[str]
    ats_score: float
    missing_keywords: list[str]

@app.post("/resume/parse", response_model=ResumeResponse)
async def parse_resume_endpoint(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        result = parse_resume(temp_file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
