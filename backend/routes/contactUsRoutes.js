import express from 'express'

const router = express.Router()// api/contactus/...

import {adminProtect} from '../middleware/authMiddleware.js' //routes protecting middleware
import {createContactUsRecord, getAllContactUsRecords} from '../controllers/contactUsControllers.js'

//we construct a protect rout for /api/orders/...
//post- we creating a new order in the orders DB
router.route('/').post(createContactUsRecord).get(adminProtect,getAllContactUsRecords)//get all orders for admin

export default router