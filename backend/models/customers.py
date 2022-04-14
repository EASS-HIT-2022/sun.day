from typing import Optional
from pydantic import BaseModel, EmailStr


class Customer(BaseModel):
	firstname: str
	lastname: str
	email: EmailStr
	company: Optional[str] = None
	role: str
	phone: Optional[str] = None
	address: Optional[str] = None
	avatar: Optional[str] = None