import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from'../components/FormContainer'
import CheckoutProgressBar from'../components/CheckoutProgressBar'
import {savePaymentMethod} from '../actions/cartActions'//import the action to dispach


const PaymentScreen = ({history}) => {//destructure history from props
    const cart = useSelector(state => state.cart) //the store's cart state
    const{shippingAddress} = cart ////extract shippingAddress from the store's cart state
    if(!shippingAddress){
        history.push('/shipping')
    }
    //the initial local state will be PayPal
    const [paymentMethod, setPaymentMethod] = useState('PayPal') 
    
    const dispatch = useDispatch()
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        
        //dispatch the action with the choosen payment method the user entered in the form!
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
 

    return (
    <>
        <CheckoutProgressBar step1 step2 step3 />
        <FormContainer>
        <div style={{paddingTop:"5%",paddingBottom:"5%"}}><h1>Payment Method</h1></div>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label className='h2' as='legend'>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check 
                        className='h3'
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked //will automatically check it
                        onChange={(event)=>{setPaymentMethod(event.target.value)}}
                        ></Form.Check>
                        <Form.Check 
                        disabled
                        className='h3'
                        type='radio'
                        label='Stripe-coming soon'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(event)=>{setPaymentMethod(event.target.value)}}
                        ></Form.Check>
                        <Form.Check 
                        disabled
                        className='h3'
                        type='radio'
                        label='Crypto Currency-coming soon'
                        id='Crypto'
                        name='paymentMethod'
                        value='Crypto'
                        onChange={(event)=>{setPaymentMethod(event.target.value)}}
                        ></Form.Check>
                    </Col>

                </Form.Group>

               <Button type='submit' variant="warning" ><h3>Continue</h3></Button>
            

            </Form>

        </FormContainer>
     </>
    )
}

export default PaymentScreen
