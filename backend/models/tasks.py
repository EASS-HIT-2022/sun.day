from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime
from .ObjectId import PyObjectId
from bson import ObjectId

class Status(str, Enum):
    todo = 'todo'
    in_progress = 'in_progress'
    done = 'done'

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    status: Status = Status.todo
    tags: Optional[str] = None
    created_at: datetime = datetime.now()

class TaskOut(Task):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}