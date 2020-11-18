import express from 'express'

const router = express.Router()// api/products/...


import {getProductById, getProducts} from '../controllers/productControllers.js'

//fetch all products from DB
// syntax B-> router.get('/', getProducts )
router.route('/').get(getProducts)
  
//fetch single  product by id from DB
//syntax B-> router.get('/:id',getProductById )
router.route('/:id').get(getProductById)

export default router

  /*
  //fetch all products from DB
router.get('/', asyncErrorhandler( async (req, res) => {

    const products = await Product.find({}) //passing empty object will give us all the elements(products) as a promise FROM THE DB!!!.
    
    // throw new Error('throw error at will for fun:)')
    res.json(products) //.json will sent the data as a JSON format! sowhen fatching it we will nedd to JSON.parse() (it is an array of objects.)
   
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
  */