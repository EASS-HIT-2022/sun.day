from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, customers

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
	prefix="/users", 
	tags=["users"]
)

app.include_router(
	customers.router, 
	prefix="/customers", 
	tags=["customers"]
)


@app.get("/")
async def root():
    return {"message": "Hello Sun.Day Backend Application!"}
