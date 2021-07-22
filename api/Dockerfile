FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /api
COPY requirements.txt /api/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /api/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
