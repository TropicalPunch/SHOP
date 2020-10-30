// import React, { useState, useEffect } from 'react'
import React, { useEffect } from 'react'
import {useDispatch , useSelector } from 'react-redux' //using hooks for redux dispatch of the action creator
import { Row, Col } from 'react-bootstrap'
//import axios from 'axios'
// import products from '../products' at first we brought the data from a js file.
import ProductCard from '../components/ProductCard'
import { listProducts } from '../actions/productsActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


const HomeScreen = () => {
 
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productsList)

  const { loading , error , products } = productsList

  useEffect(() => {
    //make a request to the DB to fetch the products: by invoking productsActions.js
    dispatch(listProducts())

  }, [dispatch]) //will be re invoked it dispatch chages

  
  return (
    <>
      <h1> Our Products </h1>
          { loading ? ( <Loader/> ) : error ? 
              (<Message variant='info'>{error}</Message>) 
              :( //if fetching products action: success
                  <Row>
                        {products.map((product) => (
                          <Col sm={12} md={5} lg={4} xl={3} key={product._id}>
                            <ProductCard product={product} />
                          </Col>
                        ))}
                  </Row>
              )
          }
      
    </>
  )
}

export default HomeScreen
