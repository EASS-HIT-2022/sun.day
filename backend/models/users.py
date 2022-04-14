from typing import Optional
from pydantic import BaseModel, EmailStr


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