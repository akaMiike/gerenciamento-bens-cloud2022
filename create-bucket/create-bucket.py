from minio import Minio

import os

minio = Minio(
    os.getenv("MINIO_ADDRESS"),
    access_key=os.getenv("MINIO_ACCESS_KEY"),
    secret_key=os.getenv("MINIO_SECRET_KEY"),
    secure=False
)

minio.make_bucket(os.getenv("MINIO_BUCKET_NAME"))