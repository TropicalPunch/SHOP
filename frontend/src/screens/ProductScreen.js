import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Ratings from '../components/Ratings'
//import products from '../products' //its not a react component but a js variable
import YouTubePlayer from '../components/YouTubePlayer'
import axios from 'axios'

const ProductScreen = (props) => {
  //we use props.match!
  //accessing the URL id param using props.match
  // const product = products.find(
  //   //this was used at the beginning when we fetch producs from ../products.js
  //   (element) => element._id === props.match.params.id
  // )

  const [product, setProduct] = useState({}) // initial state is an empty object, because product is an object.

  useEffect(() => {
    const fetchProdFromDB = async () => {
      //props.match.params.id allow us to get the params passed in the frontend's url !
      const response = await axios.get(`/api/products/${props.match.params.id}`)
      const data = await response.data
      console.log(data)
      setProduct(data) //setting the local state
    }
    fetchProdFromDB()
  }, [props.match])

  return (
    <>
      <Link className='btn btn-light my-5 ' to='/'>
        Back to Products
      </Link>

      <Row>
        <Col>
          <Image src={product.poster} alt={product.name} fluid />
        </Col>
      </Row>
      {/*/////////////////////// */}
      <Row>
        <Col>
          <h1 className='text-center my-5'>
            A NEW KIND OF VOCAL TRANSFORMING PROCESSOR
          </h1>
        </Col>
      </Row>
      {/*/////////////////////// */}
      <Row>
        <Col>
          <Row className='justify-content-center'>
            <Image src={product.interface} alt='product interface' fluid />
          </Row>
          <Row className='justify-content-center m-3'>
            <YouTubePlayer videoLink={product.video1} />{' '}
            {/*youtube player is here! */}
          </Row>
          <Row>
            <Card className='priceCard'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className='my-1 text-dark h5'>Price:</Col>
                    <Col className='my-1 text-success h5'>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='my-1 text-dark h5'>Status:</Col>
                    <Col className='my-1 text-info h5'>
                      {product.status ? ' Available' : 'Coming Soon'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-0 '>
                  <Button
                    // className='btn-block' //will make it spread all across its div.

                    variant='info'
                    type='button'
                    disabled={!product.status}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
        </Col>
        <Col>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <Ratings value={product.rating} text={product.numReviews} />
              </h4>
            </ListGroup.Item>

            <Card
              style={{
                width: '100%',
              }}
            >
              <Card.Body>
                <Card.Title>
                  {' '}
                  <strong>Description</strong>
                </Card.Title>
                <Card.Text style={{ fontSize: '1rem' }}>
                  {product.longDescription}
                </Card.Text>
                <Button variant='secondary'>Read more</Button>
              </Card.Body>
            </Card>
          </ListGroup>
        </Col>
      </Row>
      {/*/////////////////////// */}
      <Row>
        <Col className='text-center my-5'>
          <h1>FEATURES</h1>
          <ListGroup variant='flush'>
            {!product.features ? (
              <h1> ...loading </h1>
            ) : (
              product.features.map((feature) => (
                <ListGroup.Item>
                  <h5>{feature}</h5>
                </ListGroup.Item>
              ))
            )}
            <ListGroup.Item>
              <Image src={product.compatibility} alt='compatibility' fluid />
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
