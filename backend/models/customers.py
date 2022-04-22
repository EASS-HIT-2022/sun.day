from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from .ObjectId import PyObjectId
from bson import ObjectId

class Customer(BaseModel):
	firstname: str
	lastname: str
	email: EmailStr
	company: Optional[str] = None
	role: str
	phone: Optional[str] = None
	address: Optional[str] = None
	avatar: Optional[str] = None

class CustomerOut(Customer):
	id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
	class Config:
		allow_population_by_field_name = True
		json_encoders = {ObjectId: str}