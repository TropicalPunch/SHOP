import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state

import {Form, Button} from 'react-bootstrap'

import FormContainer from'../components/FormContainer'


const ShippingScreen = ({history}) => {//destructure history from props

    const [address, setAddress] = useState('') 
    const [city, setCity] = useState('') 
    const [postalCode, setPostalCode] = useState('') 
    const [country, setCountry] = useState('') 

    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        console.log('submitted')
        //soon we will add the dispatch
    }
 

    return (
        <FormContainer>
            <div style={{paddingTop:"5%", textAlign: "center"}}><h1>Fill your shipping address</h1></div>
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
               <Button type='submit' variant="warning" block>Continue To Checkout</Button>
            

            </Form>

        </FormContainer>
    )
}

export default ShippingScreen
