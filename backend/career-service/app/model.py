def recommend_career(skills, interests, score):
    # Mock logic based on ABES4U concept
    # In real implementation, load the .pkl model here
    
    recommendations = []
    gaps = []
    
    skills_lower = [s.lower() for s in skills]
    interests_lower = [i.lower() for i in interests]
    
    if "python" in skills_lower or "machine learning" in interests_lower:
        recommendations.append("Data Scientist")
        if "sql" not in skills_lower:
            gaps.append("SQL")
            
    if "react" in skills_lower or "web" in interests_lower:
        recommendations.append("Frontend Developer")
        if "node.js" not in skills_lower:
            gaps.append("Node.js")
            
    if not recommendations:
        recommendations = ["General Software Engineer"]
        
    return {
        "recommendations": recommendations,
        "confidence": 0.85,
        "skill_gaps": gaps
    }
