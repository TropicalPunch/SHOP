import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {LinkContainer} from 'react-router-bootstrap'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserProfile,updateUserProfile } from '../actions/userActions'
import {getOrdersUserHistory} from '../actions/orderActions'
import {USER_PROFILE_UPDATE_RESET} from '../constants/userConstants'

const ProfileScreen = ({location, history}) => { //destructure location & history out of props
    const [email, setEmail] = useState('')  //local state
    const [password, setPassword] = useState('') //local state
    const [confirmPassword, setConfirmPassword] = useState('') //local state
    const [name, setName] = useState('') //local state
    const [message, setMessage] = useState(null) //local state

    const dispatch = useDispatch()
    const userProfile = useSelector(state=> state.userProfile) //from the store's state
    const {loading, error, user} = userProfile //destructre
 

    const userLogin= useSelector(state=> state.userLogin) //from the store's state
    const {userInfo} = userLogin //destructre

    
    const userUpdateProfile= useSelector(state=> state.userUpdateProfile) //from the store's state
    const {success} = userUpdateProfile //destructre success- see the reducer to understand.
    //if success= true we will notify the user! see the code down.
    
    const orderUserHistory= useSelector(state=> state.orderUserHistory) //from the store's state
    const {error: errorOrders, loading: loadingAllOrders, orders} = orderUserHistory //destructre plus re naming error and loading due to duplicate.
    //orders= all the orders this user has made.

    useEffect(() => {
        
        if(!userInfo){ //if the user is not logged in userInfo is null!
           history.push('/login') //if userInfo exists we will be redirected(form submitted successfully)
        }else{
            if(!user.name || !user || success){
                dispatch({type: USER_PROFILE_UPDATE_RESET}) //will reset the user related state and only then fetch it
                dispatch(getUserProfile('profile')) //in order to get data from the route /api/users/profile
                dispatch(getOrdersUserHistory())//in order to get all orders user has made.
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history , userInfo , dispatch, user , success])
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            //dispatch update user profile
           dispatch(updateUserProfile({id: user._id, name , email, password})) //firing off the action with the updated user data as an object, the action will fire a put request to the server.
        
        }

    }

    return (
        //let's render the login from
           <>
         
        <Row className='py-5'>
            <Col md={3}>
                <div style={{ textAlign: "center"}}><h1>My Profile</h1></div>
            
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
                    { //when the updated data uploaded correctly to the server, the reducer set success as true
                    success &&  <Message variant='success'>Profile Updated</Message>//if --> render a mesage 
                    }
                    {
                    message &&  <Message>{message}</Message>//if an error exists render a mesage 
                    }
                    <Button type='submit' variant="warning" block>Update Profile</Button>
                </Form>
            </Col>
            <Col md={9}>
            <div style={{ textAlign: "center"}}><h1>My Orders</h1></div>
                {loadingAllOrders ? 
                 <Loader/> : 
                 errorOrders ? 
                 <Message variant='danger'>{errorOrders}</Message> :
                  (
                    <Table   hover responsive size='sm' >
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10) }</td>
                                    <td>${order.totalOrderPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}></i> }</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fas fa-times" style={{color: 'red'}}></i> }</td>
                                    
                                        <LinkContainer to={`/order/${order._id}`} >
                                            <Button variant="light"> Details</Button>
                                        </LinkContainer>
                                    
                                </tr>
                            ) )}

                        </tbody>
                    </Table>
                  )
                }
            </Col>
         
        </Row>
        </>
    )
}

export default ProfileScreen
