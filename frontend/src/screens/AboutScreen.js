import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, Accordion, Card} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {createContactUsRecord} from'../actions/contsctUsActions'


const AboutScreen = () => { //destructure location & history out of props
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
        //let's render the login from
        <>
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" style={{cursor:'pointer', fontSize:'large'}}>
                    WHO WE ARE
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body className="h5">
                    <p>Polyverse Music is a “by musicians, for musicians” company that creates uniquely powerful tools and instruments for artists on the cutting edge of creativity.</p>
                     <p>
                         Founded in 2015, Polyverse has continually set the bar in terms of plugin innovation, vision, and user experience. Every person on the Polyverse team is a forward-thinking musician with extensive knowledge and experience with music, sound, synthesizers, and technology. In each new step, Polyverse continues to push the boundary of possibilities with digital musical instruments and effects.
                     </p>
                     <Button className='m-3' variant='warning'fluid> Our team</Button>
                     <Button variant='warning'fluid>Join our team</Button>
                     </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor:'pointer' ,fontSize:'large'}}>
                CONTACT US
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <FormContainer>
                        
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

                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

        
        </>
    )
}

export default AboutScreen
