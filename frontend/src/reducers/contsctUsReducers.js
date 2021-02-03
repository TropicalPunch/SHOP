import {
    CONTACT_US_TICKET_CREATE_REQUEST,
    CONTACT_US_TICKET_CREATE_SUCCESS,
    CONTACT_US_TICKET_CREATE_FAIL 
    
       } from '../constants/contactUsConstants'
    

    
    export const contactUsTicketReducer  = ( state = {}, action ) => { //this is the reducer function we export it!
    
            switch( action.type ){
               case  CONTACT_US_TICKET_CREATE_REQUEST:
                   return {loading: true } // fetching data ...
            
               case CONTACT_US_TICKET_CREATE_SUCCESS:
                       return {loading: false, success: true} //if fech success...
               
               case CONTACT_US_TICKET_CREATE_FAIL:
                       return {loading: false, error: action.payload} //if fech failed...
               
            
                 default:
                   return state //pass the state as is.
            
    }}
    

    

    
    