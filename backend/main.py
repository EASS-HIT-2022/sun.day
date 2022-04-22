from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.api.v1 import users, customers, tasks
from core.config import settings

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
	users.router, 
	prefix= settings.API_V1_PATH + "/users", 
	tags=["Users"]
)

app.include_router(
	customers.router, 
	prefix= settings.API_V1_PATH + "/customers", 
	tags=["Customers"]
)

app.include_router(
	tasks.router, 
	prefix= settings.API_V1_PATH + "/tasks", 
	tags=["Tasks"]
)

@app.get("/")
async def root():
    return {"message": "Hello Sun.Day Backend Application!"}
