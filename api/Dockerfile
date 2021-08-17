FROM python:3.7
ENV PYTHONUNBUFFERED=1

USER root
WORKDIR /api
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000

RUN adduser user
RUN chmod +x /api/*
RUN chmod 777 /api/db.sqlite3
RUN chown -R user:user /api
RUN chmod -R 777 /api
USER user

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["gunicorn", "trivia.wsgi", "-b", "0.0.0.0:8000"]
