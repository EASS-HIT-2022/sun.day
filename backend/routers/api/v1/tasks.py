from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from models.users import User
from models.ObjectId import PyObjectId
from models.customers import Customer
from models.tasks import Task,TaskOut
from db.database import db
from core.oauth import get_current_user
from .customers import get_customer_by_id

router = APIRouter()

# @route GET /api/v1/tasks
# @desc Get all tasks
# @access Private
@router.get("/", response_model=List[TaskOut])
async def get_tasks(current_user: User = Depends(get_current_user)):
    pipeline = [
        {"$lookup": { "from": "customers", "localField": "customers", "foreignField": "_id", "as": "customers" }},
        {"$match": {"username": current_user.username}},
        {"$lookup": { "from": "tasks", "localField": "customers.tasks", "foreignField": "_id", "as": "tasks" }},
        {"$project": {"_id": 0, "tasks": 1}}
    ]
    tasks = await db["users"].aggregate(pipeline).to_list(None)
    print(tasks)
    tasks = tasks[0]["tasks"]

    if not tasks:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No tasks found")
    
    return tasks

# @route GET /api/v1/tasks/{task_id}
# @desc Get task by id
# @access Private
@router.get("/{task_id}", response_model=TaskOut)
async def get_task_by_id(task_id: PyObjectId, current_user: User = Depends(get_current_user)):
    pipeline = [
        {"$lookup": { "from": "customers", "localField": "customers", "foreignField": "_id", "as": "customers" }},
        {"$match": {"username": current_user.username}},
        {"$lookup": { "from": "tasks", "localField": "customers.tasks", "foreignField": "_id", "as": "tasks" }},
        {"$project": { "tasks" : {"$filter": {"input": "$tasks", "as": "task", "cond": {"$eq": ["$$task._id", task_id]}}}}} 
    ]
    task = await db["users"].aggregate(pipeline).to_list(None)
    task = task[0]["tasks"]
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    return TaskOut(**task[0])

# @route GET /api/v1/tasks/{customer_id}
# @desc Get all tasks by customer id
# @access Private
@router.get("/customer/{id}", response_model=List[TaskOut])
async def get_tasks_by_customer_id(id: PyObjectId,current_user: User = Depends(get_current_user)):
    pipeline = [
        {"$lookup": { "from": "customers", "localField": "customers", "foreignField": "_id", "as": "customers" }},
        {"$match": {"username": current_user.username}},
        {"$project": {"customers": { "$filter": { "input": "$customers", "as": "customer", "cond": { "$eq": [ "$$customer._id", id ] } } } }},
        {"$lookup": { "from": "tasks", "localField": "customers.tasks", "foreignField": "_id", "as": "tasks" }},
        {"$project": {"_id": 0, "tasks": 1}}
    ]
    tasks = await db["users"].aggregate(pipeline).to_list(length=None)
    tasks = tasks[0]["tasks"]

    if not tasks:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No tasks found")
    
    return tasks

# @route POST /api/v1/tasks/{customer_id}
# @desc Create a new task for a customer
# @access Private
@router.post("/{customer_id}")
async def create_task(customer_id: PyObjectId,request: Task,current_user=Depends(get_current_user)):
    customer = await get_customer_by_id(customer_id,current_user)
    task_object = request.dict()
    task = await db["tasks"].insert_one(task_object)
    
    await db["customers"].update_one({"_id" : customer_id },{'$push' : { "tasks" : task.inserted_id}})
    return {"msg": "Task created successfully", "data": TaskOut(**task_object)}

# @route PUT /api/v1/tasks/{task_id}
# @desc Update a task for a customer
# @access Private
@router.put("/{task_id}")
async def update_task(task_id: PyObjectId,request: Task,current_user=Depends(get_current_user)):
    task = await get_task_by_id(task_id,current_user)
    task_object = request.dict()
    task = await db["tasks"].update_one({"_id" : task_id },{'$set' : task_object})
    
    return {"msg": "Task updated successfully", "data": TaskOut(**task_object)}

# @route DELETE /api/v1/tasks/{task_id}
# @desc Delete a task for a customer
# @access Private
@router.delete("/{task_id}")
async def delete_task(task_id: PyObjectId,current_user=Depends(get_current_user)):
    pipeline = [
        {"$lookup": { "from": "tasks", "localField": "tasks", "foreignField": "_id", "as": "tasks" }},
        {"$project": {"tasks": {"$filter": {"input": "$tasks", "as": "task", "cond": {"$eq": ["$$task._id", task_id]}}}}},
        {"$match": {"tasks": {"$not": {"$size": 0}}}},
    ]
    task = await get_task_by_id(task_id,current_user)
    data = await db.customers.aggregate(pipeline).to_list(length=None)
    customer_id = data[0]["_id"]
    await db["customers"].update_one({"_id" : customer_id },{'$pull' : { "tasks" : task_id}})
    await db["tasks"].delete_one({"_id" : task_id })
    return {"msg": "Task deleted successfully", "data": str(task_id)}