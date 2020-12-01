import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Form, Button} from 'react-bootstrap'
import FormContainer from'../components/FormContainer'
import CheckoutProgressBar from'../components/CheckoutProgressBar'
import {saveShippingAddress} from '../actions/cartActions'//import the action to dispach


const ShippingScreen = ({history}) => {//destructure history from props
    const cart = useSelector(state => state.cart) //the store's cart state
    const{shippingAddress} = cart ////extract shippingAddress from the store's cart state
    
    //the initial local state will be that of the stores (if the user already filled it and it was saved in the local storage)
    const [address, setAddress] = useState(shippingAddress.address) 
    const [city, setCity] = useState(shippingAddress.city) 
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode) 
    const [country, setCountry] = useState(shippingAddress.country) 
    
    const dispatch = useDispatch()
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        
        //dispatch the action with the data the user entered in the form as an object!
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
 

    return (
    <>
        <CheckoutProgressBar step1 step2  />
        <FormContainer>
            <div style={{paddingTop:"5%", textAlign: "center"}}><h1>Fill shipping address</h1></div>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                   <Form.Control 
                       required //HTML5 form validation
                       type='text' 
                       placeholder='Shipping Address'
                       value={address}
                       onChange={(event)=> setAddress(event.target.value)}
                       /*whatever we typein will constantly be updated to the local state */
                       >
                   </Form.Control>
               </Form.Group>

               <Form.Group controlId='city'>
                   <Form.Control 
                       required
                       type='text' 
                       placeholder='Enter City'
                       value={city}
                       onChange={(event)=> setCity(event.target.value)}
                       /*whatever we typein will constantly be updated to the local state */
                       >
                   </Form.Control>
               </Form.Group>
               <Form.Group controlId='postalCode'>
                   <Form.Control 
                       required
                       type='text' 
                       placeholder='Enter Postal Code'
                       value={postalCode}
                       onChange={(event)=> setPostalCode(event.target.value)}
                       /*whatever we typein will constantly be updated to the local state */
                       >
                   </Form.Control>
               </Form.Group>

               <Form.Group controlId='country'>
                   <Form.Control 
                       required
                       type='text' 
                       placeholder='Enter Country'
                       value={country}
                       onChange={(event)=> setCountry(event.target.value)}
                       /*whatever we typein will constantly be updated to the local state */
                       >
                   </Form.Control>
               </Form.Group>
               <Button type='submit' variant="warning" block><h3>Continue to payment</h3></Button>
            

            </Form>

        </FormContainer>
     </>
    )
}

export default ShippingScreen
