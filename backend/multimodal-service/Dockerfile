FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Install torch CPU separately to keep image smaller
RUN pip install torch --index-url https://download.pytorch.org/whl/cpu

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8004"]
