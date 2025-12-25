import spacy
from pypdf import PdfReader
import docx

nlp = spacy.load("en_core_web_sm")

# Simplified skill list for demo
KNOWN_SKILLS = {"python", "java", "react", "sql", "docker", "aws", "fastapi", "node.js", "machine learning", "communication"}

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def calculate_ats_score(text, skills):
    # Simple heuristic: more skills = higher score, max 100
    score = min(100, len(skills) * 10 + 20) 
    return score

def parse_resume(file_path):
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        text = ""
    
    doc = nlp(text.lower())
    
    # Extract skills (simple keyword matching)
    found_skills = []
    tokens = [token.text for token in doc]
    for skill in KNOWN_SKILLS:
        if skill in text.lower():
            found_skills.append(skill)
            
    missing = list(KNOWN_SKILLS - set(found_skills))
    
    ats_score = calculate_ats_score(text, found_skills)
    
    return {
        "text": text[:500] + "...", # Truncate for response
        "skills": found_skills,
        "ats_score": ats_score,
        "missing_keywords": missing[:5] # Top 5 missing
    }
