import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {getUserProfile, updateUserByAdmin  } from '../actions/userActions'
import {USER_PROFILE_UPDATE_BY_ADMIN_RESET} from '../constants/userConstants'


const UserEditByAdminScreen = ({match, history}) => { //destructure match & history out of props
    const userId = match.params.id // get the user id from the url

    const [name, setName] = useState('') //local state
    const [email, setEmail] = useState('')  //local state
    const [isAdmin, setIsAdmin] = useState(false) //local state
  

    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {userInfo} = userLogin //destructre

    const userProfile = useSelector(state=> state.userProfile) //from the store's state
    const {loading, error, user} = userProfile //destructre

    const userUpdateByAdmin = useSelector(state=> state.userUpdateByAdmin) //from the store's state
    const {loading: loadingUpdate, error: errorUpdate, success: successfulUpdate} = userUpdateByAdmin //destructre
 
    
    useEffect(() => {
        
        if(userInfo && userInfo.isAdmin){
            if(successfulUpdate){ //if we updated successfully we will empty this state and push the admin back to the users list.
                dispatch(getUserProfile(userId))
                dispatch({type:USER_PROFILE_UPDATE_BY_ADMIN_RESET})
                history.push('/admin/users')
            }else{

                if(!user.name || user._id !== userId){
                    dispatch(getUserProfile(userId))
                }else{
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }
            }
            
        }else{//if a not admin trying to get to /admin/users/id route we will redirect him!
           history.push('/login')
        }

        
    }, [dispatch,userId, history,userInfo, user,successfulUpdate])
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
         //passing to the action the user object with tha new data... will be updated in the DB
        dispatch(updateUserByAdmin({_id:userId, name, email, isAdmin}))

    }

    return (
        //let's render the login from
        <>
         <Link to='/admin/users' className='btn btn-light my-3' >Back to list</Link>
            <FormContainer>
                  <div style={{ textAlign: "center"}}><h1>Admin Edit User Data</h1></div>
                {
                   errorUpdate &&  <Message>{errorUpdate}</Message>//if an error exists render a mesage 
                 }
                {
                   loadingUpdate &&  <Loader/>//while the data is being loaded to DB the just before redirect to users list. 
                }    
                {
                loading ? <Loader/>/*if  loading the data ...  */ : 
                          error ? <Message>{error}</Message>/*if an error exists render a mesage */ : (
              
                    <Form onSubmit = {submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}}> User Current Name: {user.name}  </Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Change User Name'
                                value={name}
                                onChange={(event)=> setName(event.target.value)}
                                /*whatever we typein will constantly be updated to the local state */
                                >
                            </Form.Control>
                        </Form.Group>

                            <Form.Group controlId='email'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > User Current Email: {user.email}  </Form.Label>
                                <Form.Control
                                    
                                    type='email' 
                                    placeholder='Change Email'
                                    value={email}
                                    onChange={(event)=> setEmail(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                            
                                <Form.Check 
                                    style={{fontSize:'large',fontWeight: 'bold'}}
                                    type='checkbox' 
                                    label='Check to set as Admin'
                                    checked={isAdmin}
                                    onChange={(event)=>setIsAdmin(event.target.checked)}/*whatever we check will be updated to the local state */
                                    > 

                                </Form.Check>
                            </Form.Group>
                           
                        
                            <Button type='submit' variant="warning" block>Update User Data</Button>
                    </Form>

                          )
                }
                  
                    
            
            
            </FormContainer>
        </>

    )
}

export default UserEditByAdminScreen
