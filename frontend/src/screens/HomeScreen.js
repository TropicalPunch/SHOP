import React from 'react'
import { Row, Col } from 'react-bootstrap'
import productsCat from '../products'
import ProductCard from '../components/ProductCard'
const HomeScreen = () => {
  return (
    <>
      <h1> Our Products </h1>
      <Row>
        {productsCat.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
