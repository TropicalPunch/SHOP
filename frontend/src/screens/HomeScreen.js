// import React, { useState, useEffect } from 'react'
import React, { useEffect,useState } from 'react'
import {useDispatch , useSelector } from 'react-redux' //using hooks for redux dispatch of the action creator
import {Link} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
//import axios from 'axios'
// import products from '../products' at first we brought the data from a js file.
import ProductCard from '../components/ProductCard'
import { listProducts } from '../actions/productsActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import CarouselProducts from '../components/CarouselProducts'
import LandingContainer from '../components/LandingContainer'



const HomeScreen = ({match}) => {
  const searchKeyword = match.params.searchKeyword //getting a search key word from the navbar search field by the url
 
  const pageNumber = match.params.pageNumber || 1 //getting page number from the url
  

  const[backButton, setBackButton ] = useState(false)
  
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.productsList)

  const { loading , error , products ,page, pages } = productsList
 //page, pages are a result of pagination implementation

  useEffect(() => {
    //make a request to the DB to fetch the products: by invoking productsActions.js
    dispatch(listProducts(searchKeyword, pageNumber)) //in no search keword exists it will render all products
    if(searchKeyword){
      setBackButton(true)
    }else{
      setBackButton(false)
    }
  }, [dispatch, searchKeyword, pageNumber]) //will be re invoked it dispatch chages

  
  return (
    <>
    <CarouselProducts/>
    <LandingContainer className='py-3'/>

    { backButton ? (
      <Link className='btn btn-light p-1 ' to='/'>
           All products
      </Link>
    )
     : ''
    }

      <Row className='pt-5 h3'>
         Our Products 
      </Row>
      <Row>
    
          { loading ? ( <Loader/> ) : error ? 
              (<Message variant='info'>{error}</Message>) 
              :( //if fetching products action: success
                  <>
                  <Row>
                    {
                      products.length === 0 ?
                      (<Message variant='info'>No product found, try again.</Message>) : ''
                    }
                    {products.map((product) => (
                      <Col sm={12} md={5} lg={4} xl={3} key={product._id}>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                  <Paginate className='pagination' pages={pages} page={page} searchKeyword={searchKeyword ? searchKeyword : ''}/>
                  </>
              )
          }
      </Row>
    </>
  )
}

export default HomeScreen
