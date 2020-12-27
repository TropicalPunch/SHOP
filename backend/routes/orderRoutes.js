import express from 'express'

const router = express.Router()// api/orders/...

import {protect, adminProtect} from '../middleware/authMiddleware.js' //routes protecting middleware
import {createOrder, getOrderById,updateOrderToPaidById,allUserOrders, adminsAllOrders,updateOrderToDelivered} from '../controllers/orderControllers.js'

//we construct a protect rout for /api/orders/...
//post- we creating a new order in the orders DB
router.route('/').post(protect, createOrder).get(protect, adminProtect, adminsAllOrders)//get all orders for admin
router.route('/myorders').get(protect, allUserOrders) 
router.route('/:id').get(protect, getOrderById) //id is from the url params
router.route('/:id/pay').put(protect,updateOrderToPaidById) //id is from the url params
router.route('/:id/deliver').put(protect,adminProtect,updateOrderToDelivered) //id is from the url params

export default router