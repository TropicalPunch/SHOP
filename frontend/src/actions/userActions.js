import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
USER_LOGIN_SUCCESS ,
USER_LOGIN_FAIL ,
USER_LOGOUT ,

USER_REGISTER_REQUEST,
USER_REGISTER_SUCCESS ,
USER_REGISTER_FAIL, 
USER_PROFILE_REQUEST,
USER_PROFILE_SUCCESS,
USER_PROFILE_FAIL,
USER_PROFILE_UPDATE_REQUEST,
USER_PROFILE_UPDATE_SUCCESS,
USER_PROFILE_UPDATE_FAIL,
USER_PROFILE_RESET
 } from '../constants/userConstants'
import{ ORDER_HISTORY_RESET} from "../constants/orderConstants"

export const login = (email,password) => async (dispatch)=>{
 //here we also use the redux-thunk to make an asynchronous request.
 try{
    dispatch({
        type: USER_LOGIN_REQUEST
    })
    const config = {
        headers:{
            'Content-type':'application/json'
            //for posting data
        }
    }
    
    const {data} = await axios.post('/api/users/login',{email,password}, config)
 //the data we are going to post data to the server,if authorized we may gain access to the user data 
    dispatch({

     type: USER_LOGIN_SUCCESS,
     payload: data, //only if the email and pass, are valid


    })
//we are going to save the users data on local storage as userinfo, we will also have to update store.js with this feature!
    localStorage.setItem('userInfo',JSON.stringify(data))

}catch (error){
    dispatch({type: USER_LOGIN_FAIL, 
        payload: 
        error.response && error.response.data.message 
        ?
         error.response.data.message
        :
        error.message
         })


 }

}
//this is the logout action (it has no reducer)
export const logout = ()=> (dispatch)=>{
    localStorage.removeItem('userInfo') //deleting local storage
    dispatch({type: USER_LOGOUT}) //dispatching it to the reducer-{will empty the user related state}
    document.location.href = '/login' //re directing user to login
    dispatch({ type: USER_PROFILE_RESET})
    dispatch({ type: ORDER_HISTORY_RESET}) 
}


export const register = (name,email,password) => async (dispatch)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    try{
       dispatch({
           type: USER_REGISTER_REQUEST
       })
       const config = {
           headers:{
               'Content-type':'application/json'
               //for posting data
           }
       }
       
       const {data} = await axios.post('/api/users',{name,email,password}, config)
    //we are going to post(!) data to the server, the route is /api/users.
    //if the data is valid we will gat the user data (especiallly the token)
       dispatch({
   
        type: USER_REGISTER_SUCCESS,
        payload: data,
   
       })
       //after we registered successfully we must also dispatch a successful log in! 
       //it will enable the change in the navBar
       dispatch({

        type: USER_LOGIN_SUCCESS,
        payload: data, //only if the email and pass, are valid
   
       })
   //we are going to save the users data on local storage as userinfo, we will also have to update store.js with this feature!
       localStorage.setItem('userInfo',JSON.stringify(data))
   
   }catch (error){
       dispatch({type: USER_REGISTER_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
    }
   }

   export const getUserProfile = (id) => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token as well as all the other profile data 
    //we will pass getUserProfile("profile") to get to the /api/users/profile
    //or a specific id as an argument to get to the /api/users/${id} path
    try{
       dispatch({
           type: USER_PROFILE_REQUEST
       })

       const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
       //we use getState to access the userInfo which contains the token at--> userInfo.token .
    
       const config = {
           headers:{
               'Content-type':'application/json',
               //for posting data
               Authorization:`Bearer ${userInfo.token}`
               //for providing a Bearer token to the server
           }
       }
       
       const {data} = await axios.get(`/api/users/${id}`, config)
    //we are going to get(!) data from the server, the route is /api/users/.
    //if the data is valid we will gat the user data (especiallly the token)
       dispatch({
   
        type: USER_PROFILE_SUCCESS,
        payload: data,
   
       })
      

   
   }catch (error){
       dispatch({type: USER_PROFILE_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
   
   
    }
   
   }
   
   export const updateUserProfile = (user) => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token.
    //the reducer wil recieve the entier user object an an argument. the user object will contain the changes
    try{
       dispatch({
           type: USER_PROFILE_UPDATE_REQUEST
       })

       const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
       //we use getState to access the userInfo which contains the token at--> userInfo.token .
    
       const config = {
           headers:{
               'Content-type':'application/json',
               //for communicating with the server
               Authorization:`Bearer ${userInfo.token}`
               //for providing a Bearer token to the server (protected route)
           }
       }
       
       const {data} = await axios.put(`/api/users/profile`, user ,config)
    //we are going to put(edit!) data on server, the route is /api/users/profile.
    //the second parameter- user- is the specific user we will change which containes the new data
       dispatch({
   
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: data,
   
       })
       dispatch({ //so the name at the navbar will change if you changed your profile name
   
        type: USER_LOGIN_SUCCESS,
        payload: data,
   
       })
       //we are going to save the users data on local storage as userinfo, we will also have to update store.js with this feature!
       localStorage.setItem('userInfo',JSON.stringify(data))
       
   }catch (error){
       dispatch({type: USER_PROFILE_UPDATE_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
   
   
    }
   
   }
   