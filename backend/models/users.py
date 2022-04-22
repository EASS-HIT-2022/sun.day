from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from models.customers import Customer
from .ObjectId import PyObjectId
from bson import ObjectId

class User(BaseModel):
    username: str
    email: EmailStr
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    avatar: Optional[str] = None

class UserInDB(User):
    password: str

class UserOutDB(User):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}