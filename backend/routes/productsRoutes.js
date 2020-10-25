import express from 'express'
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch

const router = express.Router()// api/products/...

import Product from '../models/productModel.js'//lets import the po



//fetch all products from DB
router.get('/', asyncErrorhandler( async (req, res) => {

    const products = await Product.find({}) //passing empty object will give us all the elements(products) as a promise!!!.
    
    res.json(products) //.json will sent the data as a JSON format!
}))
  
//fetch single  product by id from DB
router.get('/:id', asyncErrorhandler( async (req, res) => {
    //now lets serve a specific product data by url param, user id!
    const product = await Product.findById(req.params.id) // matching the user in the DB to the one being asked in the url parameter.

    if(product){
        res.json(product) //.json will sent the data as a JSON format!
        
    }else{
       // res.status(404).json({message:'Ho no! Product not found'})
       res.status(404)
       throw new Error('Product not found in DB')
    }
}))

  export default router