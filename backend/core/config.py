import os

class Settings:
    PROJECT_NAME: str = "Sun.Day"
    PROJECT_AUTHOR: str = "Niv Huga"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_USER: str = os.getenv("DATABASE_USER")
    DATABASE_PASSWORD: str = os.getenv("DATABASE_PASSWORD")
    DATABASE_URL = f"mongodb+srv://{DATABASE_USER}:{DATABASE_PASSWORD}@cluster0.dbayw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    TEST_USER_EMAIL = "test@example.com"


settings = Settings()