import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
// import products from '../products' at first we brought the data from a js file.
import ProductCard from '../components/ProductCard'
const HomeScreen = () => {
  const [products, setProducts] = useState([]) //no initial state
  useEffect(() => {
    //will run as soon as this component mounts!
    const fetchProductsServer = async () => {
      //the data has been sent as json from  server.js (app.get...)
      const response = await axios.get('/api/products')
      const data = await response.data //no need to use .json() method to pase the data , its already parsed by axios.
      console.log(response)
      console.log(data)
      setProducts(data) //connecting the state to data ==> products will be equal to data
    }
    fetchProductsServer() //calling the function to fetch the products!
  }, [])

  return (
    <>
      <h1> Our Products </h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={5} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
