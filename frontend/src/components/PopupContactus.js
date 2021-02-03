
import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import Modal from 'react-modal'

import {Form, Button, Row} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {createContactUsRecord} from'../actions/contsctUsActions'



 
const PopupContactus = () => {
    const [email, setEmail] = useState('')  //local state
    const [name, setName] = useState('') //local state
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
   
    const dispatch = useDispatch()
    const contactUsTicket = useSelector(state=> state.contactUsTicket) //from the store's state
    const {loading, error, success} = contactUsTicket //destructre

   
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
      
        dispatch(createContactUsRecord(name, email, title, message))
    }

    return (
       <Modal>
            <FormContainer className='popup-wrapper'>
                        
                        <Row className='py-3 d-flex justify-content-center text-center h4 '>
                        If you have any questions or comments, please feel free to drop us a message!
                            </Row>
                            {loading &&
                            <Loader/> }
                            { success &&  <Message variant='success'>We will contact you soon via email. </Message>  }
                        
                            <Form onSubmit = {submitHandler}>
                                <Form.Group controlId='email'>
                                
                                    <Form.Control 
                                        type='email' 
                                        placeholder='Email'
                                        value={email}
                                        onChange={(event)=> setEmail(event.target.value)}
                                        /*whatever we typein will constantly be updated to the local state */
                                        >
    
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='name'>
                                
                                <Form.Control 
                                    type='name' 
                                    placeholder='Full name'
                                    value={name}
                                    onChange={(event)=> setName(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='title'>
                                
                                <Form.Control 
                                    type='title' 
                                    placeholder='Subject'
                                    value={title}
                                    onChange={(event)=> setTitle(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='Your message'>
                                    <Form.Control
                                        as='textarea'
                                        rows={5} 
                                        placeholder="Enter your message"
                                        value={message}
                                        onChange={(event)=> setMessage(event.target.value)}
                                        /*whatever we typein will constantly be updated to the local state */
                                        >
    
                                    </Form.Control>
                                </Form.Group>
                                {
                                error &&  <Message>{error}</Message>
                                } 
                                
                                <Button type='submit' variant="warning" block>Submit</Button>
                            </Form>
                            
                
                        </FormContainer>
        </Modal>
        
    )
}

export default PopupContactus
