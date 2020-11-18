import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
USER_LOGIN_SUCCESS ,
USER_LOGIN_FAIL ,
USER_LOGOUT ,

USER_REGISTER_REQUEST,
USER_REGISTER_SUCCESS ,
USER_REGISTER_FAIL ,
 } from '../constants/userConstants'
 
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
   