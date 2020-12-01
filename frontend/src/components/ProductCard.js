import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'
import Ratings from './Ratings'

const ProductCard = ({ product }) => {
  //destructure props
  return (
    <Card className='my-3 p-3 rounded zoom'>
      <div>
        <Link to={`/products/${product._id}`}>
          <Image src={product.image} variant='top' alt={product.name} fluid />
        </Link>
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='text-info'>
            <p className='font-weight-bold h4'>{product.name}</p>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='my-3 text-dark h5'>
          <Ratings value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as='h3'>${product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default ProductCard
