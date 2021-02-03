import axios from 'axios'
import{
 CONTACT_US_TICKET_CREATE_REQUEST,
 CONTACT_US_TICKET_CREATE_SUCCESS,
 CONTACT_US_TICKET_CREATE_FAIL 
} from '../constants/contactUsConstants'

export const createContactUsRecord = (name, email, title, message) => async (dispatch)=>{
        //here we also use the redux-thunk to make an asynchronous request.
        //we use getState because we can access the userInfo which contains the token.
        //the reducer wil recieve the entier order object an an argument. and will be sent to the server from the frontend (placeOrderScreen)
        try{
           dispatch({
               type: CONTACT_US_TICKET_CREATE_REQUEST
           })
    
           const config = {
               headers:{
                   'Content-type':'application/json',
                   //for communicating with the server
                   
               }
           }
           await axios.post(`/api/contactus`, {name, email, title, message} ,config)
        //we are going to put(edit!) data on server, the route is /api/orders.
        //the second parameter- order- is the specific order we put on the server.
        //the data we get back is basically the order including one more parameter- user: req.user._id. who created the order.  
        dispatch({
            type: CONTACT_US_TICKET_CREATE_SUCCESS
        
           })
     
       }catch (error){
           dispatch({type: CONTACT_US_TICKET_CREATE_FAIL, 
               payload: 
               error.response && error.response.data.message 
               ?
                error.response.data.message
               :
               error.message
            })
        }
       
}
