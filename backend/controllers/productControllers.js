import Product from '../models/productModel.js'
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch

const getProducts = asyncErrorhandler(async (req,res)=>{
    const products = await Product.find({}) //get all products
     
    // throw new Error('throw error at will for fun:)')
    res.json(products) //.json will sent the data as a JSON format! sowhen fatching it we will nedd to JSON.parse() (it is an array of objects.)
   
})

const getProductById =  asyncErrorhandler( async (req, res) => {
    //now lets serve a specific product data by url param, user id!
    const product = await Product.findById(req.params.id) // matching the user in the DB to the one being asked in the url parameter.
    if(product){
        res.json(product) //.json will sent the data as a JSON format!
        
    }else{
       // res.status(404).json({message:'Ho no! Product not found'})
       res.status(404)
       throw new Error('Product not found in DB')
    }
})

export {getProductById, getProducts}
