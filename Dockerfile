FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python3", "-m", "flask", "--app", "app.py", "run", "--host=0.0.0.0"]
