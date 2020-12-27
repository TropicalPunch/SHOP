import axios from 'axios'
import{
    ORDER_CREATE_REQUEST ,
    ORDER_CREATE_SUCCESS , 
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST ,
    ORDER_DETAILS_SUCCESS , 
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDERS_LIST_ALL_REQUEST,
    ORDERS_LIST_ALL_SUCCESS,
    ORDERS_LIST_ALL_FAIL,
    ORDER_SET_DELIVERD_REQUEST,
    ORDER_SET_DELIVERD_SUCCESS,
    ORDER_SET_DELIVERD_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState)=>{
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token.
        //the reducer wil recieve the entier order object an an argument. and will be sent to the server from the frontend (placeOrderScreen)
        try{
           dispatch({
               type: ORDER_CREATE_REQUEST
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
           
           const {data} = await axios.post(`/api/orders`, order ,config)
        //we are going to put(edit!) data on server, the route is /api/orders.
        //the second parameter- order- is the specific order we put on the server.
        //the data we get back is basically the order including one more parameter- user: req.user._id. who created the order.  
        dispatch({
       
            type: ORDER_CREATE_SUCCESS,
            payload: data,
       
           })
     
       }catch (error){
           dispatch({type: ORDER_CREATE_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
       
       
        }
       
}

export const getOrderDetails = (orderId) => async (dispatch, getState)=>{
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token -private route.
        //the reducer wil recieve the order id as an argument. and will return the order details
        try{
           dispatch({
               type: ORDER_DETAILS_REQUEST
           })
    
           const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
           //we use getState to access the userInfo which contains the token at--> userInfo.token .
        
           const config = {
               headers:{
                   //'Content-type':'application/json', -we dont need in get request!
                   //for communicating with the server
                   Authorization:`Bearer ${userInfo.token}`
                   //for providing a Bearer token to the server (protected route)
               }
           }
           
           const {data} = await axios.get(`/api/orders/${orderId}`,config)
        //we are going to get the order data from server, the route is /api/orders/orderid.
  
        //the data we get back is basically the order 
        dispatch({
       
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
       
           })
     
       }catch (error){
           dispatch({type: ORDER_DETAILS_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
       
       
        }
       
}

    
export const payOrder = (orderId, paymentResult) => async (dispatch, getState)=>{
        //this action handles the transformation of the order to become A PAID ORDER!
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token -private route.
        //the reducer wil recieve the order and the paymentResult (from paypal!-->dispatched from the frontend orderScreen.js) as an argument. 
        try{
           dispatch({
               type: ORDER_PAY_REQUEST
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
           
           const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
        //we are going to change the order data that is currently in server, the route is /api/orders/orderid/pay.
        //paymentResult is another input in the put request. it will be attached to the order we edit.
        
        dispatch({
       
            type: ORDER_PAY_SUCCESS,
            payload: data,
       
           })
     
       }catch (error){
           dispatch({type: ORDER_PAY_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
       
       
        }
       
}

 
export const getOrdersUserHistory = () => async (dispatch, getState)=>{
        //this action will get all the orders a specific, looged in user ever made.
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token -private route.
        //the usage of token will also enable us to recieve the user's Id
        try{
           dispatch({
               type: ORDER_HISTORY_REQUEST
           })
    
           const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
           //we use getState to access the userInfo which contains the token at--> userInfo.token .
        
           const config = {
               headers:{
                    //'Content-type':'application/json', no need in get request
                   //for communicating with the server
                   Authorization:`Bearer ${userInfo.token}`
                   //for providing a Bearer token to the server (protected route)
               }
           }
           
           const {data} = await axios.get(`/api/orders/myorders`,config)
        //we are going to get all the orders in the db that connected to this user's id
        
        dispatch({
       
            type: ORDER_HISTORY_SUCCESS,
            payload: data,
       
           })
     
       }catch (error){
           dispatch({type: ORDER_HISTORY_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
       
       
        }
       
}      

export const getAllordersByAdmin = () => async (dispatch, getState)=>{
        //this action will get all the orders of alll users.
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token -private route.
        //the usage of token will also enable us to recieve the user's Id-admin.
        try{
           dispatch({
               type: ORDERS_LIST_ALL_REQUEST
           })
    
           const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
           //we use getState to access the userInfo which contains the token at--> userInfo.token .
        
           const config = {
               headers:{
                    //'Content-type':'application/json', no need in get request
                   //for communicating with the server
                   Authorization:`Bearer ${userInfo.token}`
                   //for providing a Bearer token to the server (protected route)
               }
           }
           
           const {data} = await axios.get(`/api/orders`,config)
        //we are going to get all the orders in the db 
        
        dispatch({
       
            type: ORDERS_LIST_ALL_SUCCESS,
            payload: data,
       
           })
     
       }catch (error){
           dispatch({type:  ORDERS_LIST_ALL_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
       
       
        }
       
}  


//admin operation
export const setOrderAsDeliveredByAdmin = (orderId) => async (dispatch, getState)=>{
        //this action will put - edit the order as deliverd by the admin.
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token -private route.
        //the usage of token will also enable us to recieve the user's Id-admin.
        try{
           dispatch({
               type: ORDER_SET_DELIVERD_REQUEST
           })
    
           const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
           //we use getState to access the userInfo which contains the token at--> userInfo.token .
        
           const config = {
               headers:{
                    //'Content-type':'application/json', no need ,we are not sending any data from the frontend, the controller in the backend sets it!
                   //for communicating with the server
                   Authorization:`Bearer ${userInfo.token}`
                   //for providing a Bearer token to the server (protected route)
               }
           }
           
          const {data} = await axios.put(`/api/orders/${orderId}/deliver`, {}, config)
        //we are going to set the order as delivered.
        //we dont send ant sata to the server therefore an empty object is passed.
        
        dispatch({
            type: ORDER_SET_DELIVERD_SUCCESS,
            payload: data
           })
     
       }catch (error){
           dispatch({type: ORDER_SET_DELIVERD_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
                })
        }
       
 }  


       