import os

class Settings:
    API_V1_PATH = '/api/v1'

    PROJECT_NAME: str = "Sun.Day"
    PROJECT_AUTHOR: str = "Niv Huga"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_USER: str = os.getenv("DATABASE_USER")
    DATABASE_PASSWORD: str = os.getenv("DATABASE_PASSWORD")
    DATABASE_HOST: str = os.getenv("DATABASE_HOST")
    DATABASE_PORT: str = os.getenv("DATABASE_PORT")
    DATABASE_URL = "mongodb://{user}:{password}@{host}:{port}".format(user=DATABASE_USER, password=DATABASE_PASSWORD, host=DATABASE_HOST, port=DATABASE_PORT)

    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    TEST_USER_EMAIL = "test@example.com"


settings = Settings()