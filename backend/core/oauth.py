from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.tokens import TokenData
from models.users import UserInDB, User
from core.config import settings
from core.hashing import Hash
from db.database import db


oauth2_scheme = OAuth2PasswordBearer(tokenUrl= settings.API_V1_PATH + "/users/token")

async def authenticate_user(username: str, password: str):
    user = await get_user_from_db(username)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {username} username')
    if not Hash.verify(user.password, password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
    return user

async def get_user_from_db(username: str):
    user = await db["users"].find_one({"username": username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
    return UserInDB(**user)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user_from_db(username=token_data.username)
    if user is None:
        raise credentials_exception
    return User(**user.dict())