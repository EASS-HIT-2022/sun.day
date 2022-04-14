from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from models.users import User
from models.customers import Customer
from db.database import db
from core.oauth import get_current_user

router = APIRouter()

@router.post('/api/v1/customers')
async def create_customer(request:Customer,current_user:User = Depends(get_current_user)):
	customer_object = dict(request)
	customer_id = await db["customers"].insert_one(customer_object)
	_id = customer_id.inserted_id
	await db["users"].update_one({"username":current_user.username},{'$push' : { "customers" : _id}})
	return {"res":"created"}


@router.get('/api/v1/customers',response_model=List[Customer])
async def get_customers(current_user:User = Depends(get_current_user)):
	pipeline = [ 
		{ '$match' : { 'username' : current_user.username } }, 
		{ '$project' : { '_id' : 0, 'customers' : 1 } },
		{ '$lookup' : { 'from' : 'customers', 'localField' : 'customers', 'foreignField' : '_id', 'as' : 'customers' } } ]
	customers = await db["users"].aggregate(pipeline).to_list(length=None)
	if not customers:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No customers found')
	customers = customers[0]['customers']
	return customers