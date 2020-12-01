import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Button, Row, Col, Image,Card, ListGroup} from 'react-bootstrap'
import {createOrder} from '../actions/orderActions'
import CheckoutProgressBar from'../components/CheckoutProgressBar'
import Message from '../components/Message'

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()
  

    const addTwoDecimals = (price)=>{
        //this function will make sure we display the price allways with 2 decimals, even if it's 5.2 === 5.20 
         return (Math.round(price*100 / 100).toFixed(2))
    } 

    const cart = useSelector(state=>state.cart)
    const {shippingAddress, paymentMethod, cartItems} = cart
    console.log(cartItems)
    console.log(cart)

    //lets setup the summary variables: this is the first time we create those variables 
    //calculate items in cart total price:
    cart.itemsTotalPrice = addTwoDecimals(cartItems.reduce((acc,item)=>item.price*item.quantity + acc , 0).toFixed(2))//0-> the start value of the acc variable
    //setup shipping price if there is any:
    cart.shippingPrice = addTwoDecimals(cart.itemsTotalPrice > 200 ? 0 : 50)    //setup Tax price
    //setup tax price based on 18% from total items price:
    cart.taxPrice = addTwoDecimals(Number((0.18*cart.itemsTotalPrice).toFixed(2)))
    //setup total order price  if there is any:
    cart.totalOrderPrice = (Number(cart.itemsTotalPrice) + Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
    
    const orderCreate = useSelector(state=> state.orderCreate) //we get it from the store.
    const {order, success, error} = orderCreate
   
    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`) //if we filles the order successfully we will redirect the user to the order page.
        
        }
        // eslint-disable-next-line
    },[history, success])


    const placeOrderHandler = ()=>{
        dispatch(createOrder({ //the order object is dispatched and makes its way to action and from there to the server
            orderItems: cartItems, //this is the first time we create orderItems
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsTotalPrice: cart.itemsTotalPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalOrderPrice: cart.totalOrderPrice
        }))

    }

    return (
        <>
           <CheckoutProgressBar step1 step2 step3 step4 /> 
           <Row>
           
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Shipping</h2>
                           <p>
                              <strong>Address:</strong> 
                              &nbsp;{shippingAddress.address}, {shippingAddress.city}{' '} {shippingAddress.postalCode}, {shippingAddress.country}.
                           </p>
                       </ListGroup.Item>
                  
                       <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <p>
                             <strong>Method:</strong> 
                            {' '}{paymentMethod}.
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {cartItems.length === 0 ?
                            <Message>Cart is Empty</Message>
                            :
                            (
                                <ListGroup variant= 'flush'>
                                    {cartItems.map((product, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={4} >
                                                     <Image src={product.image} alt={product.name} fluid />
                                                </Col>
                                                <Col >
                                                     <Link style={{color:'steelblue'}} className='font-weight-bold h3 ' to={`/products/${product.productId}`}>{product.name}</Link>
                                                   <strong> <p>{product.quantity} x ${product.price.toFixed(2)} = ${(product.quantity * product.price).toFixed(2)}</p></strong>
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col md={4}>
                   <Card>
                       <ListGroup variant='flush'>
                       <ListGroup.Item > 
                           <h2>Order Summary</h2>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Items:</h3>
                               </Col>
                               <Col>
                                 <p> ${cart.itemsTotalPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Shipping Price:</h3>
                               </Col>
                               <Col>
                                 <p> ${cart.shippingPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Tax:</h3>
                               </Col>
                               <Col>
                                 <p> ${cart.taxPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Total:</h3>
                               </Col>
                               <Col>
                                 <p> ${cart.totalOrderPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                                    {error && <Message>{error}</Message>}{/*if we recieved an error while submutting the order*/}
                       </ListGroup.Item>
                       </ListGroup>

                            <Button onClick={placeOrderHandler} disabled={cartItems.length === 0} variant="warning" block> 
                                    <h3>Place Order </h3>
                            </Button>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default PlaceOrderScreen
