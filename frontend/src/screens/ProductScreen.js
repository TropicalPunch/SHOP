import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { detailsProduct } from '../actions/productsActions';
import { Row, Col, Image, ListGroup, Card, Button,Collapse  } from 'react-bootstrap'
import Ratings from '../components/Ratings'
//import products from '../products' //its not a react component but a js variable
import YouTubePlayer from '../components/YouTubePlayer'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import axios from 'axios'

const ProductScreen = (props) => {

    const [minimPrice, setMinimPrice] = useState(true) // this state will control the size of the price card
    const [prodQuant, setProdQuant] = useState(1) // initial Quantity of zero products


    const dispatch = useDispatch()
    const productRes = useSelector(state=> state.productDetails) // initial state is an empty object, because product is an object.
    const {product, loading, error} = productRes

  useEffect(() => {
      dispatch(detailsProduct(props.match.params.id))
    
  }, [dispatch,props.match])

  const addToCartHandler = ()=>{
      props.history.push(`/cart/${props.match.params.id}?quant=${prodQuant}`) //now when we will push the button we will see this change in the url of the browser.

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
             A NEW KIND OF VOCAL TRANSFORMING PROCESSOR
           </h1>
         </Col>
       </Row>
     
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
               {/*this is the price & buy card */}
               <Card className='priceCard'> 
                    <Button variant='light' type='button' onClick ={()=> setMinimPrice(!minimPrice)} aria-controls="example-collapse-text" aria-expanded={minimPrice}>
                            <i className='fas fa-minus'></i>
                    </Button>
                    <Collapse in={minimPrice}>
                        <div id="example-collapse-text">
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                <Row>
                                    <Col className='my-1 text-dark h5'>Price:</Col>
                                    <Col className='my-1 text-success h5'>
                                    <strong>${product.price}</strong>
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
    )}
      
        
    </>
  )
}

export default ProductScreen
