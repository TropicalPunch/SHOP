
import{
    ORDER_CREATE_REQUEST ,
 ORDER_CREATE_SUCCESS , 
 ORDER_CREATE_FAIL,
 ORDER_CREATE_RESET,
 ORDER_DETAILS_REQUEST ,
 ORDER_DETAILS_SUCCESS , 
 ORDER_DETAILS_FAIL,
 ORDER_PAY_REQUEST,
 ORDER_PAY_SUCCESS,
 ORDER_PAY_RESET,
 ORDER_PAY_FAIL,
 ORDER_HISTORY_REQUEST,
 ORDER_HISTORY_SUCCESS,
ORDER_HISTORY_FAIL,
ORDER_HISTORY_RESET,
ORDERS_LIST_ALL_REQUEST,
ORDERS_LIST_ALL_SUCCESS,
ORDERS_LIST_ALL_FAIL,
ORDER_SET_DELIVERD_REQUEST,
ORDER_SET_DELIVERD_SUCCESS,
ORDER_SET_DELIVERD_FAIL,
ORDER_SET_DELIVERD_RESET,

} from '../constants/orderConstants'

 export const orderCreateReducer = ( state = {}, action)=>{
     switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success:true,
                order: action.payload, 
            }  
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload, 
            }
        case ORDER_CREATE_RESET:
        return{ } 
          
            default :
            return state         
     }

 }

 export const orderDetailsReducer = ( state = {loading: true ,orderItems:[], shippingAddress:[]}, action)=>{
    switch(action.type){
       case ORDER_DETAILS_REQUEST:
           return{
               ...state,
               loading: true
           }
       case ORDER_DETAILS_SUCCESS:
           return{
               loading: false,
               order: action.payload, 
           }  
       case ORDER_DETAILS_FAIL:
           return{
               loading: false,
               error: action.payload, 
           }  

        
           default :
           return state         
    }

}

export const orderPayReducer = ( state = {}, action)=>{ //this reducer will handle the transformation of an order to A PAID ORDER!
    switch(action.type){
       case ORDER_PAY_REQUEST:
           return{
               loading: true
           }
       case ORDER_PAY_SUCCESS:
           return{
               loading: false,
               success: true, 
           }  
       case ORDER_PAY_FAIL:
           return{
               loading: false,
               error: action.payload, 
           } 
        
        case ORDER_PAY_RESET: 
           return {}
               //we will retuen an empty object  

           default :
           return state         
    }
}

    
export const orderUserHistoryReducer = ( state = {orders:[]}, action)=>{ //this reducer will handle the transformation of an order to A PAID ORDER!
    //initial state will contain an empty orders array
    switch(action.type){
       case ORDER_HISTORY_REQUEST:
           return{
               loading: true
           }
       case ORDER_HISTORY_SUCCESS:
           return{
               loading: false,
               orders: action.payload, 
           }  
       case ORDER_HISTORY_FAIL:
           return{
               loading: false,
               error: action.payload, 
           } 
           case ORDER_HISTORY_RESET:
            return{orders:[]} 
       
           default :
           return state         
    }

}


 


//admin operation
export const ordersListAllReducer = ( state = {orders:[]}, action)=>{
    switch(action.type){
       case ORDERS_LIST_ALL_REQUEST:
           return{
               loading: true
           }
       case ORDERS_LIST_ALL_SUCCESS:
           return{
               loading: false,
               orders: action.payload, 
           }  
       case ORDERS_LIST_ALL_FAIL:
           return{
               loading: false,
               error: action.payload, 
           }  
           default :
           return state         
    }

}


//admin operation
export const orderSetAsDeliverdReducer = ( state = {}, action)=>{
    switch(action.type){
       case ORDER_SET_DELIVERD_REQUEST:
           return{
               loading: true
           }
       case ORDER_SET_DELIVERD_SUCCESS:
           return{
               loading: false,
               success: true, 
           }  
       case ORDER_SET_DELIVERD_FAIL:
           return{
               loading: false,
               error: action.payload, 
           }  
           
           case ORDER_SET_DELIVERD_RESET:
           return{ } 

           default :
           return state         
    }

}