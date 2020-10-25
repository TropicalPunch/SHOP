import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import {notFoundError, allErrorsHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js' // DB connection
// import products from './data/products.js'

import productRoutes from './routes/productsRoutes.js' //import the routes.

dotenv.config()
const PORT = process.env.PORT || 5000
const mode = process.env.NODE_ENV

connectDB() //this function connects us to the DB!!! it must be after dotenv.config

const app = express()


app.get('/', (req, res) => {
  res.send('this is what you GET when you request this path (/)')
})

app.use('/api/products', productRoutes) //connect the product url to the router



// 404 error creator:
app.use(notFoundError)


//error handling middleware:
app.use(allErrorsHandler)

app.listen(
  PORT,
  console.log(`Hey! server is running in ${mode} mode on port: ${PORT}`.yellow.bold)
)
