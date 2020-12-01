import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import { Row, Col, Image,Card, ListGroup} from 'react-bootstrap'
import {getOrderDetails, payOrder} from '../actions/orderActions'
import{ORDER_PAY_RESET} from '../constants/orderConstants'
import{CART_RESET} from '../constants/cartConstants'
import Loader from'../components/Loader'
import Message from '../components/Message'


const OrderScreen = ({match}) => {

    const orderId = match.params.id //previous screen pushed us to /order/orderid
   
    const[sdkReady, setSdkReady]= useState (false) //for controlling the rendering of the paypal sdk on load
   
    const dispatch = useDispatch()

    const orderDetails = useSelector(state=> state.orderDetails) //we get it from the store.
    const {order, loading, error} = orderDetails //destructure
    //we will use order to gain access to all order parameters as shown in order model
   
    const orderPayment = useSelector(state=> state.orderPay) //we get it from the store.
    const {loading:loadingPayment ,success: successPayment} = orderPayment //destructure + renaming due to duplicates!

    useEffect(() => {

        const addPayPalSDKscript = async ()=>{
            const {data: clientId } = await axios.get('/api/config/paypal') //fetching the paypal client id from the server in it's json form to object
           //clientId- will give us back the string itself 

           //lets create the SDK script (<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>)
           // using JS syntax:
           const script = document.createElement('script')
           script.type = 'text/javascript'
           script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
           script.async = true //an HTML attribute for asynchronous script proccess.
            //once the script loads:
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script) //dynamically adding the SDK script to the body!
        }
        


        if(!order || order._id !== orderId || successPayment ) {
           
             //in order to prevent an infinet loop when a successful payment is made, we must reset the order's state or else it will keep refreshing the order.
             dispatch({type:ORDER_PAY_RESET}) //in the reducers will return an empty object!
           

             dispatch(getOrderDetails(orderId))

             dispatch({type: CART_RESET})

        }else if(!order.isPaid){ //if the order is not(!) paid we will generate paypal SDK
            if(!window.paypal){
                addPayPalSDKscript() 
            }else{
                setSdkReady(true)
            }
        }
    }, [order, orderId, dispatch, successPayment]) 

    const successPaymentHandler = (paymentResult)=>{ //paymentResult - is from paypal
        //console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))//pass it to the orderActions
        
    }

   
    return loading ? <Loader/> : error ? <Message>{error}</Message> :
     <>
        <h1>Order: {order._id} </h1>
        <Row>
           
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Shipping</h2>
                           <p>
                            <strong>Name:</strong>
                                &nbsp;{order.user.name}
                           </p>
                           <p>
                            <strong>Email:</strong>
                                &nbsp;{order.user.email}
                           </p>
                           <p>
                              <strong>Address:</strong> 
                              &nbsp;{order.shippingAddress.address}, {order.shippingAddress.city}{' '} {order.shippingAddress.postalCode}, {order.shippingAddress.country}.
                           </p>
                           {order.isDelivered ? 
                            <Message variant='success'>Delivered on : {order.deliveredAt}</Message>
                             : 
                             <Message>Delivery status: waiting for confirmation </Message>}
                       </ListGroup.Item>
                  
                       <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <p>
                             <strong>Method:</strong> 
                            {' '}{order.paymentMethod}.
                           </p>
                            {order.isPaid ? 
                            <Message variant='success'>Purchase completed on : {order.paidAt}</Message>
                             : 
                             <Message>Purchase incomplete </Message>}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {order.orderItems.length === 0 ?
                            <Message>Order is Empty</Message>
                            :
                            (
                                <ListGroup variant= 'flush'>
                                    {order.orderItems.map((product, index)=>(
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
                                 <p> ${order.itemsTotalPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Shipping Price:</h3>
                               </Col>
                               <Col>
                                 <p> ${order.shippingPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Tax:</h3>
                               </Col>
                               <Col>
                                 <p> ${order.taxPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item > 
                           <Row>
                               <Col>
                                  <h3>Total:</h3>
                               </Col>
                               <Col>
                                 <p> ${order.totalOrderPrice} {/*we still need to create it*/}</p>
                               </Col>
                           </Row>
                       </ListGroup.Item>
                          {!order.isPaid && (
                            <ListGroup.Item > 
                                {loadingPayment && <Loader/>}
                                {!sdkReady ? <Loader/> : (
                                    <>
                                    
                                    <PayPalButton
                                    amount={order.totalOrderPrice}
                                    onSuccess={successPaymentHandler} 
                                    
                                    />
                                    </>
                                )}
                            </ListGroup.Item>
                          )}
                       
                       </ListGroup>

                         {/*we will soon add a paypal button */}
                   </Card>
               </Col>
           </Row>
     </>
}

export default OrderScreen
