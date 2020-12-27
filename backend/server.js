import path from 'path' // this is a node.js module
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import {notFoundError, allErrorsHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js' // DB connection
// import products from './data/products.js'

import productRoutes from './routes/productsRoutes.js' //import the routes of products.
import userRoutes from './routes/userRoutes.js'//import the routes of users (login).
import orderRoutes from './routes/orderRoutes.js'//import the routes of orders .
import uploadRoutes from './routes/uploadRoutes.js'//import the routes of orders .
dotenv.config()
const PORT = process.env.PORT || 5000
const mode = process.env.NODE_ENV

connectDB() //this function connects us to the DB!!! it must be after dotenv.config

const app = express()
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
app.use(express.json()) //will allow us to parse json data that arrives through the body

app.get('/', (req, res) => {
  res.send('this is what you GET when you request this path (/)')
})

app.use('/api/products', productRoutes) //connect the product url to the router
app.use('/api/users', userRoutes)//connect the users url to the router
app.use('/api/orders', orderRoutes)//connect the users url to the router
app.use('/api/uploads', uploadRoutes)//connect the uploads url to the router 

app.get('/api/config/paypal', (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID)) //part of connecting to paypal via client id

//making the "uploads" folder a static folder- accessible through the browser- with express:
//__dirname ==> will point to the current folder
// does not available in node es modules (only in common js) therfore...
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 404 error creator:
app.use(notFoundError)


//error handling middleware:
app.use(allErrorsHandler)

app.listen(
  PORT,
  console.log(`Hey! server is running in ${mode} mode on port: ${PORT}`.yellow.bold)
)
