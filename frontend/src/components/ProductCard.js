import React from 'react'
import { Card } from 'react-bootstrap'
import Ratings from './Ratings'

const ProductCard = ({ product }) => {
  //destructure props
  return (
    <Card className='my-3 p-3 rounded zoom'>
      <div>
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </a>
      </div>

      <Card.Body>
        <a href={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='text-info'>
            <p class='font-weight-bold h4'>{product.name}</p>
          </Card.Title>
        </a>
        <Card.Text as='div' className='my-3 text-dark h5'>
          <Ratings value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default ProductCard
