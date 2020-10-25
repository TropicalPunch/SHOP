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

       await Product.insertMany(sampleProducts) //populate the DB with products containing the admin's id

       console.log('Data imported'.cyan)

       process.exit()


    } catch(error){
        console.error(`${error} -Data could not be imported`.red)
        process.exit(1) //1=> exit with failure
    }


}

const destroyData = async ()=>{ //from the database therefore its asynchronous
    
    try{ 
        //we first want to clear all our collections (user, order , product) from data it might have and prepare it to recieve fresh data.
       await Order.deleteMany() 
       await Product.deleteMany() 
       await User.deleteMany() 

       console.log('All Data Deleted'.orange)

       process.exit()


    } catch(error){
        console.error('Data could not be deleted'.red)
        process.exit(1) //1=> exit with failure
    }


}

if(process.argv[2] === '-d'){ // argv will be an array, if we will pass -d it will populate the third element of the array
    destroyData()
}else{
    importData()
}

