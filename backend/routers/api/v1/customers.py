from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from models.users import User
from models.ObjectId import PyObjectId
from models.customers import Customer,CustomerOut
from db.database import db
from core.oauth import get_current_user

router = APIRouter()

# @route GET /api/v1/customers
# @desc Get all customers
# @access Private
@router.get('/',response_model=List[CustomerOut])
async def get_customers(current_user:User = Depends(get_current_user)):
	pipeline = [ 
		{ '$match' : { 'username' : current_user.username } }, 
		{ '$project' : { '_id' : 0, 'customers' : 1 } },
		{ '$lookup' : { 'from' : 'customers', 'localField' : 'customers', 'foreignField' : '_id', 'as' : 'customers' } } ]
	customers = await db["users"].aggregate(pipeline).to_list(length=None)
	customers = customers[0]['customers']
	if not customers:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No customers found')
	return customers

# @route GET /api/v1/customers/{customer_id}
# @desc Get a customer by id
# @access Private
@router.get('/{customer_id}',response_model=CustomerOut)
async def get_customer_by_id(customer_id:PyObjectId,current_user:User = Depends(get_current_user)):
	user = await db["users"].find_one({"username":current_user.username},{'customers':1, '_id':0})
	if 'customers' not in user or customer_id not in user['customers']:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Customer not found')

	customer = await db["customers"].find_one({"_id":customer_id})
	if not customer:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Customer not found')
	return customer

# @route POST /api/v1/customers
# @desc Create a new customer
# @access Private
@router.post('/')
async def create_customer(request:Customer,current_user:User = Depends(get_current_user)):
	pipeline = [ 
		{ '$match' : { 'username' : current_user.username } }, 
		{ '$lookup' : { 'from' : 'customers', 'localField' : 'customers', 'foreignField' : '_id', 'as' : 'customers' } },
		{ '$project' : { 'customers': { '$filter' : { 'input' : "$customers", 'as': "customer", 'cond': { '$eq': ["$$customer.email", request.email]}}}}} ]
	customer = await db["users"].aggregate(pipeline).to_list(length=None)
	customer = customer[0]['customers']
	if customer:
		raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail = f'Customer with email {request.email} already exists')

	customer_object = dict(request)
	customer_id = await db["customers"].insert_one(customer_object)
	_id = customer_id.inserted_id
	await db["users"].update_one({"username":current_user.username},{'$push' : { "customers" : _id}})
	return {"msg": "Customer created successfully", "data": CustomerOut(**customer_object)}

# @route PUT /api/v1/customers/{customer_id}
# @desc Update a customer by id
# @access Private
@router.put('/{customer_id}')
async def update_customer(customer_id:PyObjectId,request:Customer,current_user:User = Depends(get_current_user)):
	customers_of_current_user = await db["users"].find_one({"username":current_user.username},{'customers':1, '_id':0})
	if customer_id not in customers_of_current_user['customers']:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No customer found')

	await db["customers"].update_one({"_id":customer_id},{'$set':dict(request)})
	return {"msg":"Customer updated successfully", "data": dict(request)}

# @route DELETE /api/v1/customers/{customer_id}
# @desc Delete a customer by id
# @access Private
@router.delete('/{customer_id}')
async def delete_customer(customer_id:PyObjectId,current_user:User = Depends(get_current_user)):
	user = await db["users"].find_one({"username":current_user.username},{'customers':1 ,'_id':0 })
	if 'customers' not in user or customer_id not in user['customers']:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No customer found')
	
	customer = await db["customers"].find_one({"_id":customer_id},{'tasks':1, '_id':0})

	if 'tasks' in customer and customer['tasks']:
		await db["tasks"].delete_many({"_id":{'$in':customer['tasks']}})

	await db["customers"].delete_one({"_id":customer_id})

	return {"msg":"Customer deleted successfully"}