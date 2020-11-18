import {
      USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS ,
  USER_LOGIN_FAIL ,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS ,
  USER_REGISTER_FAIL ,
   } from '../constants/userConstants'


export const userLoginReducer  = ( state = {}, action ) => { //this is the reducer function we export it!

switch( action.type ){
   case  USER_LOGIN_REQUEST:
       return {loading: true } // fetching data ...

   case USER_LOGIN_SUCCESS:
           return {loading: false, userInfo: action.payload} //if fech success...
   
   case USER_LOGIN_FAIL:
           return {loading: false, error: action.payload} //if fech failed...
   
   case USER_LOGOUT:
                return {}
     default:
       return state //pass the state as is.

}}

export const userRegisterReducer  = ( state = {}, action ) => { //this is the reducer function we export it!

        switch( action.type ){
           case  USER_REGISTER_REQUEST:
               return {loading: true } // fetching data ...
        
           case USER_REGISTER_SUCCESS:
                   return {loading: false, userInfo: action.payload} //if fech success...
           
           case USER_REGISTER_FAIL:
                   return {loading: false, error: action.payload} //if fech failed...
           
        
             default:
               return state //pass the state as is.
        
        }}
