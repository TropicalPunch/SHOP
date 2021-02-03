import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { detailsProduct, addProductReview } from '../actions/productsActions';
import { Row, Col, Image, ListGroup, Card, Button,Collapse, Form  } from 'react-bootstrap'
import Ratings from '../components/Ratings'
import YouTubePlayer from '../components/YouTubePlayer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {PRODUCT_ADD_REVIEW_RESET } from '../constants/productsConstants'


const ProductScreen = (props) => {

  const productId = props.match.params.id

    const [minimPrice, setMinimPrice] = useState(true) // this state will control the size of the price card
    const [prodQuant, setProdQuant] = useState(1) // initial Quantity of one product
    
    const [rating, setRating] = useState(5) // initial Quantity of one product
    const [comment, setComment] = useState('') // initial Quantity of one product
    const [title, setTitle] = useState('') // initial Quantity of one product

    const dispatch = useDispatch()
    const productRes = useSelector(state=> state.productDetails) // initial state is an empty object, because product is an object.
    const {product, loading, error} = productRes
    const{reviews} = product

    const productAddReview = useSelector(state=> state.productAddReview) //get from store's state
    const { loading:loadingReview, error: errReview, success:successReview} = productAddReview // destructure and rename

    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {userInfo} = userLogin //destructre

  useEffect(() => {
    if(successReview){
      setRating(5)
      setComment('')
      setTitle('')
      dispatch(detailsProduct(productId))
    }
else if (!product._id || product._id !== productId) {
      dispatch(detailsProduct(productId))
     // dispatch({type: PRODUCT_ADD_REVIEW_RESET})
    }
    
    
  }, [dispatch,productId,successReview])

  const addToCartHandler = ()=>{
      props.history.push(`/cart/${props.match.params.id}?quant=${prodQuant}`) //now when we will push the button we will see this change in the url of the browser.

  }

  const reviewSubmitHandler = (event)=>{
    alert('successfully submitted')
    event.preventDefault()
    dispatch(addProductReview(productId,{rating, comment, title}))
   
  }

  const minimizeReview = ()=>{
    console.log("delete or minimize")
  }
  
  const deleteReview = ()=>{
    console.log("delete or minimize")
  }

  return (
    <>
        <Link className='btn btn-light my-5 ' to='/'>
          Back to Products
        </Link>
      
      {loading ? <Loader/> : error ? <Message varient = 'dark'> {error} </Message>:(
        <>
            
          <Row>
            <Col>
              <Image src={product.poster} alt={product.name} fluid />
            </Col>
          </Row>
        
          <Row>
            <Col>
              <h1 className='text-center my-5'>
                {product.heroPhrase}
              </h1>
            </Col>
          </Row>
     
          <Row>
            <Col>
              <Row className='justify-content-center'>
                <Image src={product.interfaceImage} alt='product interface Image' fluid />
              </Row>
              <Row className='justify-content-center m-3'>
                <YouTubePlayer videoLink={product.video1} />{' '}
                {/*youtube player is here! */}
              </Row>

              <Row>
                  {/*this is the price & buy card */}
                  <Card border="info"  className='priceCard'> 
                        <Button variant='light' type='button' onClick ={()=> setMinimPrice(!minimPrice)} aria-controls="example-collapse-text" aria-expanded={minimPrice}>
                              {minimPrice ? <i className="fas fa-angle-double-up"></i> : <i className='fas fa-plus'> Order {product.name}</i>}
                        </Button>
                        <Collapse in={minimPrice}>
                            <div id="example-collapse-text">
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                    <Row>
                                        <Col className='my-1 text-dark h5'>Price:</Col>
                                        <Col className='my-1 text-success h5'>
                                        <strong>${Number(product.price).toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                    {product.status ? (
                                    <ListGroup.Item>
                                    <Row>
                                        <Col className='my-1 text-dark h5'>Quantity:</Col>
                                        <Button variant='light' type='button'  disabled={prodQuant <= 0} onClick ={()=> setProdQuant(prodQuant -1)} >
                                                <i className='fas fa-minus'></i>
                                        </Button>
                                        <Col className='my-1 h4'>
                                        <strong>{prodQuant}</strong>
                                        </Col>
                                        <Button variant='light' type='button' disabled={prodQuant > 4} onClick ={()=> setProdQuant(prodQuant +1)} >
                                                <i className='fas fa-plus'></i>
                                        </Button>
                                    </Row>
                                    </ListGroup.Item>
                                    ) : '' }
                                    
                                    <ListGroup.Item>
                                    <Row>
                                        <Col className='my-1 text-dark h5'>Status:</Col>
                                        <Col className='my-1 text-info h5'>
                                        {product.status ? ' Available' : 'Coming Soon'}
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='text-center py-0 '>
                                    <Button variant='info'type='button' disabled={!product.status} onClick={ addToCartHandler }>
                                        Add to cart
                                    </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </Collapse>
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
                    <Ratings value={Number(product.rating)} text={Number(product.numReviews)} />
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
          
          <Row>
            <Col className='text-center my-5'>
              <h1>FEATURES</h1>
              <ListGroup variant='flush'>
                {!product.features ? (
                  <h1> ...loading </h1>
                ) : (
                  product.features.map((feature,index) => (
                    <ListGroup.Item key={index}>
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
        
          <Row>
            <Col md={6}>
                <h1>Customer reviews</h1>
                  {product.reviews.length === 0 &&  <Message> Be the firts to review this product.</Message>}
                    {/* <h1>{product.reviews[0]._id}</h1> */}
                    <div>
                         { reviews.length > 0 && reviews.map((review) => ( /*users reviwes on product */
                              <Card md={6} key={review._id} className='p-2 mb-2' >
                                <ListGroup>
                                  <Row className='reviewBar' >
                                    <Col  className='flex-grow-0 m-0 p-0'>
                                      <Button type='button' onClick ={()=> deleteReview()} variant="blank" >
                                       <i style={{color:'#9406ed',fontSize:'1rem'}} className="fas fa-times"></i>
                                      </Button>
                                    </Col>
                                    <Col className='flex-grow-0 m-0 p-0'>
                                      <Button  type='button' onClick ={()=> minimizeReview()} variant="blank" >
                                       <i style={{color:'#9406ed',fontSize:'1rem'}} className="fas fa-minus"></i>
                                      </Button>
                                    </Col>
                                  </Row>
                                  
                                  <Row md={12} className='reviewTop' >
                                    <Col xs md={1}>
                                      <i style={{color:'#9406ed',fontSize:'1.5rem',textAlign:'right'}} className="fas fa-user-astronaut"></i>
                                    </Col>
                                    <Col xs md={11} className='p-0 m-0'>
                                      <Link className='userReviewProfile' to={`/users/${review.name}`}>
                                      {review.name}
                                      </Link>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md={12}>
                                      <h4 style={{fontWeight:'bold',}}>{review.title}</h4>
                                      <h4><Ratings value={Number(review.rating)}/></h4>
                                    </Col>
                                  </Row>
                                  <Row className='m-0 pb-1 h6' >
                                    Created at: {review.createdAt.substring(0,10)} 
                                  </Row>
                                  <Row md xs={12} >
                                    <Col>
                                       <p>{review.comment}</p>
                                    </Col>
                                  </Row>
                                  <Row style={{paddingLeft:'0.8rem'}}>
                                     <Button variant="secondary">Comment</Button>
                                  </Row>
                                </ListGroup>
                              </Card>
                        ))} 
                    </div>
                 
            </Col> 
            <Col md={6}>    
            <h1>Add a Review </h1>
            {userInfo ? 
              (
              
                <Form onSubmit={reviewSubmitHandler}>
                          <Form.Group controlId='title'>
                          
                            <Form.Control 
                                placeholder='Title'
                                type='title' 
                                value={title}
                                onChange={(event)=> setTitle(event.target.value)}
                                >
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='rating'>
                            <Form.Control as='select' value={rating} onChange={(event)=>{setRating(Number(event.target.value))}}>
                              <option value='1'>Poor</option>
                              <option value='2'>Fair </option>
                              <option value='3'>Good </option>
                              <option value='4'>Very Good </option>
                              <option value='5'>Excellent </option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='rating'>
                           
                            <Form.Control placeholder='Tell us what you think about this product.' as='textarea' row='3' value={comment} onChange={(event)=>{setComment(event.target.value)}}></Form.Control>
                          </Form.Group>
                          <Button disabled={loadingReview} type='submit' variant="warning" >Submit</Button>
                        </Form>
              ) 
              :
                <Message>Only <Link to='/login'>Registered</Link> users can write a review</Message>
            
            }
                        
                      
            </Col>
          </Row>
        </>
    )}
      
        
    </>
  )
}

export default ProductScreen


{/*

             {product.reviews.length === 0 && <Message> Be the firts to review this product.</Message>}
              <ListGroup variant='flush'>
                    { product.reviews.map((review) => (
                        <ListGroup.item key={review._id}>
                          <strong>{review.name}</strong>
                          <Ratings value={review.rating} text={'1'} />
                          <p>{review.title}</p>
                          <p>{review.createdAt.substring(0,10)} </p>
                          <p>{review.comment}</p>
                        </ListGroup.item>
                       ))}
                </ListGroup>   
                 
*/}