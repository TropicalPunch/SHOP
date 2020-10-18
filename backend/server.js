import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js' // DB connection
import products from './data/products.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const mode = process.env.NODE_ENV

const app = express()

connectDB() //this function connects us to the DB!!! it must be after dotenv.config

app.get('/', (req, res) => {
  res.send('this is what you GET when you request this path (/)')
})

app.get('/api/products', (req, res) => {
  //lets respond with a product information see backend->data-> products.js
  res.json(products) //.json will sent the data as a JSON format!
})

app.get('/api/products/:id', (req, res) => {
  //now lets serve a specific product data by url param, user id!
  const product = products.find((element) => element._id === req.params.id) // matching the user in the DB to the one being asked in the url parameter.
  res.json(product) //.json will sent the data as a JSON format!
})

app.listen(
  PORT,
  console.log(`Hey! server is running in ${mode} mode on port: ${PORT}`.yellow.bold)
)
