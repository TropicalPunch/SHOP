import {
      USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS ,
  USER_LOGIN_FAIL ,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS ,
  USER_REGISTER_FAIL, 
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS ,
  USER_PROFILE_UPDATE_FAIL ,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_RESET,
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

export const userProfileReducer  = ( state = {user:{}}, action ) => { //this is the reducer function we export it!

                switch( action.type ){
                   case  USER_PROFILE_REQUEST:
                       return {...state, loading: true } // fetching data ...
                
                   case USER_PROFILE_SUCCESS:
                           return {loading: false, user: action.payload} //if fech success...
                   
                   case USER_PROFILE_FAIL:
                           return {loading: false, error: action.payload} //if fech failed...
                   
                          
                           
                  case USER_PROFILE_RESET:
                         return {user:{}} 
                        
                     default:
                       return state //pass the state as is.
                
}}

export const userUpdateProfileReducer  = ( state = {}, action ) => { //this is the reducer function we export it!

        switch( action.type ){
                case  USER_PROFILE_UPDATE_REQUEST:
                return {loading: true } // fetching data ...
        
                case USER_PROFILE_UPDATE_SUCCESS:
                        return {loading: false, success:true ,userInfo: action.payload} //if fech success...
                // success:true ===> will be used in the ProfileScreen.js 
                case USER_PROFILE_UPDATE_FAIL:
                        return {loading: false, error: action.payload} //if fech failed...
                
                case USER_PROFILE_UPDATE_RESET:
                        return {} //if we want to reset the user's data
        
        
                default:
                return state //pass the state as is.
        
}}
        