import express from 'express'

const router = express.Router()// api/orders/...

import {protect} from '../middleware/authMiddleware.js' //routes protecting middleware
import {createOrder, getOrderById,updateOrderToPaidById,allUserOrders} from '../controllers/orderControllers.js'

//we construct a protect rout for /api/orders/...
//post- we creating a new order in the orders DB
router.route('/').post(protect, createOrder)
router.route('/myorders').get(protect, allUserOrders) 
router.route('/:id').get(protect, getOrderById) //id is from the url params
router.route('/:id/pay').put(protect,updateOrderToPaidById) //id is from the url params

export default router