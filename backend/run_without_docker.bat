@echo off
echo ===================================================
echo Starting AI Career Coach Backend (Local Mode)
echo ===================================================

echo 1. Starting Resume Service (Port 8001)...
start "Resume Service" cmd /k "cd resume-service && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload"

echo 2. Starting Career Service (Port 8002)...
start "Career Service" cmd /k "cd career-service && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8002 --reload"

echo 3. Starting Interview Service (Port 8003)...
:: Setting the API Key you provided
start "Interview Service" cmd /k "cd interview-service && set GOOGLE_API_KEY=AIzaSyBOECsI3hj7ZV42Qp5InRR8tyqI5JWgpso&& pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8003 --reload"

echo 4. Starting Multimodal Service (Port 8004)...
start "Multimodal Service" cmd /k "cd multimodal-service && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8004 --reload"

echo 5. Starting API Gateway (Port 8000)...
:: Setting environment variables to point to localhost instead of docker names
start "API Gateway" cmd /k "cd api-gateway && npm install && set RESUME_SERVICE_URL=http://localhost:8001&& set CAREER_SERVICE_URL=http://localhost:8002&& set INTERVIEW_SERVICE_URL=http://localhost:8003&& set MULTIMODAL_SERVICE_URL=http://localhost:8004&& node index.js"

echo ===================================================
echo All services are launching in new windows.
echo Please wait for them to finish installing dependencies.
echo Once running, the API Gateway will be at http://localhost:8000
echo ===================================================
pause
