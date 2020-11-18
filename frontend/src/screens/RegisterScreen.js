import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {register} from '../actions/userActions'


const RegisterScreen = ({location, history}) => { //destructure location & history out of props
    const [email, setEmail] = useState('')  //local state
    const [password, setPassword] = useState('') //local state
    const [confirmPassword, setConfirmPassword] = useState('') //local state
    const [name, setName] = useState('') //local state
    const [message, setMessage] = useState(null) //local state

    const dispatch = useDispatch()
    const userRegister = useSelector(state=> state.userRegister) //from the store's state
    const {loading, error, userInfo} = userRegister //destructre
 

    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    useEffect(() => {
        
        if(userInfo){
           history.push(redirect) //if userInfo exists we will be redirected(form submitted successfully)
        }
    }, [history , userInfo , redirect])
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            //dispatch register 
            dispatch(register(name , email, password)) 
        }

    }

    return (
        //let's render the login from
        <FormContainer>
            <div style={{paddingTop:"5%", textAlign: "center"}}><h1>Become part of thousands of artists making magic with our products.</h1></div>
           
            {
            loading && <Loader/>//if  loading the data ... 
            }
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId='name'>
                   <Form.Control 
                       type='name' 
                       placeholder='Full Name'
                       value={name}
                       onChange={(event)=> setName(event.target.value)}
                       /*whatever we typein will constantly be updated to the local state */
                       >
                   </Form.Control>
               </Form.Group>

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
                <Form.Group controlId='password'>
                   
                    <Form.Control 
                        type='password' 
                        placeholder='Password'
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}/*whatever we typein will constantly be updated to the local state */
                        > 

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                   
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(event)=>setConfirmPassword(event.target.value)}/*whatever we typein will constantly be updated to the local state */
                        > 

                    </Form.Control>
                </Form.Group>
                {
                   error &&  <Message>{error}</Message>//if an error exists render a mesage 
                 }
                {
                   message &&  <Message>{message}</Message>//if an error exists render a mesage 
                 }
                <Button type='submit' variant="warning" block>Sign In</Button>
            </Form>
            <Row className='py-3 d-flex justify-content-center text-center '>
              <h3> Have an Account? Good to have you back,&nbsp; 
              <Link to= { redirect ? `/login?redirect=${redirect}` : '/login' }>
                 Login.
               </Link>
             
               </h3> 
            </Row>
           
        </FormContainer>
    )
}

export default RegisterScreen
