import React ,{useEffect} from 'react'
import{Link} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import {Row,Col,ListGroup, Image, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCartAction, removeFromCartAction} from '../actions/cartActions'


const CartScreen = (props) => {
    const {match, location, history} = props
    const productId = match.params.id //if we click the cart icon before we addded any product there wont be any id!
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
     //location.search -> will get the url's quary param meaning the string that is after the id in the url. 
    //in our case:   /cart/5f91c9d117d7d2401c129497?quant=1 ==> ?quant=1 
    //inorder to gain access to the number we will split the string in the '=' mark and it will turn it into an array.
    /// and then we'll grab the number by the [1] index. we will still need to turn it into a number form by  Number() method
    //console.log(quantity)

    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart) //gain access to the cartItems from the state.
    const {cartItems} = cart
    
    useEffect(() => {
        if(productId){
            dispatch(addToCartAction(productId,quantity))
        }
        
    }, [dispatch,productId,quantity])

    const removeItemFromCart = (id) =>{ 
        dispatch(removeFromCartAction(id))
}
    const checkOutHandler = ()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <div>
           <Row className='py-3'  >
               <Col md={8}  >
               
                   <h1>Shopping Cart</h1>
                   <Card className='mt-5' >
                       <ListGroup variant='flush' className="d-flex align-items-center" >
                           <ListGroup.Item >
                               <h2>Subtotal ({cartItems.reduce((acc,currItem)=> acc + currItem.quantity,0)} items): ${cartItems.reduce((acc,currItem)=> acc + currItem.quantity*currItem.price,0).toFixed(2)} </h2>
                               <Button onClick={checkOutHandler} disabled={cartItems.length === 0} variant="warning" block> 
                               <h3> Proceed to checkout</h3>
                               </Button>
                           </ListGroup.Item>
                           
                       </ListGroup>
                   </Card>
              
                   
                   {cartItems.length === 0 ?
                    <Message><h3>Cart is currently empty <Link to='/'>Back To Products</Link></h3></Message>
                   
                    :
                    (
                    
                    <ListGroup variant='flush'>
                     
                        {cartItems.map(productProp => (
                            <ListGroup.Item key={productProp.productId} >
                                 <Row className="float-left">
                                    <Button  type='button' variant='light' onClick={()=> removeItemFromCart(productProp.productId)}>
                                        <i className='fas fa-times'></i>
                                    </Button>
                                 </Row>
                                <Row>
                                    <Col className="float-left" >
                                        <Image className="float-left" src={productProp.image} alt={productProp.name}  fluid ></Image>
                                    </Col>
                                    <Col className='d-flex flex-column pt-4'>
                                        <Row>
                                            <Link style={{color:'steelblue'}} className='font-weight-bold h3 ' to={`/product/${productProp.productId}`}>{productProp.name}</Link>
                                        </Row>

                                        <Row className='font-weight-bold h3 p-2' >
                                           ${productProp.price.toFixed(2)}
                                        </Row>

                                        <Row className="d-flex flex-nowrap justify-content-start ">
                                            <p className='text-dark h4 font-weight-bold p-2 '>Quantity:</p>
                                         
                                            <Button variant="outline-light" type='button'  disabled={productProp.quantity <= 1} onClick ={()=> dispatch(addToCartAction(productProp.productId, productProp.quantity - 1))} >
                                                    <i className='fas fa-minus'></i>
                                            </Button>
                                            
                                            <div className='h4 d-flex justify-content-center p-2'>
                                                    <strong>{productProp.quantity}</strong>
                                            </div>
                                           
                                            <Button   variant="outline-light" type='button' disabled={productProp.quantity > 4} onClick ={()=> dispatch(addToCartAction(productProp.productId, productProp.quantity +1))} >
                                                    <i className='fas fa-plus'></i>
                                            </Button>
                                        </Row>

                                    </Col>
                                </Row>
                                    
                                
                                       
                            </ListGroup.Item>

                        ))}
                    </ListGroup>
                    )}
               </Col>
               
               
               
              
           </Row>
           
        </div>
    )
}

export default CartScreen
