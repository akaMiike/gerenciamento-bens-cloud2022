FROM python:3.10-alpine

RUN pip install minio

COPY create-bucket.py .

CMD ["python3", "create-bucket.py"]

