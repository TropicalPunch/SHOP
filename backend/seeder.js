import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async ()=>{ //from the database therefore its asynchronous
    
    try{ 
        //we first want to clear all our collections (user, order , product) from data it might have and prepare it to recieve fresh data.
       await Order.deleteMany() 
       await Product.deleteMany() 
       await User.deleteMany() 

       const createdUsers = await User.insertMany(users) //will be an array
       const adminUser = createdUsers[0]._id // in users.js the first user in the array of users is the admin. we will populate this variable with the admin id!

       const sampleProducts = products.map(product=>{ //we will populate the "user" field in each product with the admin id, meaning he was the one who created it!
           return{...product, user: adminUser}
       })




    } catch(error){

    }


}

