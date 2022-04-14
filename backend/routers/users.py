from fastapi import APIRouter, Depends, HTTPException, Request, status
from models.users import User
from models.tokens import Token
from db.database import db
from core.hashing import Hash
from core.jwttoken import create_access_token
from core.oauth import authenticate_user, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from core.config import settings

router = APIRouter()

@router.get("/")
def read_root(current_user:User = Depends(get_current_user)):
	return {"data":"Hello World"}

@router.post('/register')
async def create_user(request:User):
	user = await db["users"].find_one({"username": request.username})
	if user:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user already exists")

	hashed_pass = Hash.bcrypt(request.password)
	user_object = dict(request)
	user_object["password"] = hashed_pass
	user_id = await db["users"].insert_one(user_object)
	return {"res":"created"}


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
	return current_user