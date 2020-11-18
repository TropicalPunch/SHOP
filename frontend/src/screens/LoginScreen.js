import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {login} from '../actions/userActions'


const LoginScreen = ({location, history}) => { //destructure location & history out of props
    const [email, setEmail] = useState('')  //local state
    const [password, setPassword] = useState('') //local state
   
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {loading, error, userInfo} = userLogin //destructre
 

    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    useEffect(() => {
        
        if(userInfo){
           history.push(redirect) //if userInfo exists we will be redirected 
        }
    }, [history , userInfo , redirect])
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        //dispatch login 
        dispatch(login(email, password)) //we execute the login action with the inputs the user gave us!

    }

    return (
        //let's render the login from
        <FormContainer>
            <div style={{paddingTop:"5%"}}><h1>Enter The Polyverse</h1></div>
           
            {
            loading && <Loader/>//if  loading the data ... 
            }
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
                <Form.Group controlId='password'>
                   
                    <Form.Control 
                        type='password' 
                        placeholder='Password'
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}/*whatever we typein will constantly be updated to the local state */
                        > 

                    </Form.Control>
                </Form.Group>
                {
                   error &&  <Message>{error}</Message>//if an error exists render a mesage 
                 }
                <Button type='submit' variant="warning" block>Sign In</Button>
            </Form>
            <Row className='py-3 d-flex justify-content-center text-center '>
              <h3> New Here?&nbsp; 
              <Link to= { redirect ? `/register?redirect=${redirect}` : '/register' }>
                 Join
               </Link>
               &nbsp;thousands of artists using our products.
               </h3> 
            </Row>
           
        </FormContainer>
    )
}

export default LoginScreen
