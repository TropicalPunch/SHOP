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
USER_COMPLETE_LIST_REQUEST,
USER_COMPLETE_LIST_SUCCESS,
USER_COMPLETE_LIST_FAIL,
USER_COMPLETE_LIST_RESET,
USER_DELETE_REQUEST,
USER_DELETE_SUCCESS,
USER_DELETE_FAIL,
USER_PROFILE_UPDATE_BY_ADMIN_REQUEST,
USER_PROFILE_UPDATE_BY_ADMIN_SUCCESS,
USER_PROFILE_UPDATE_BY_ADMIN_FAIL,
USER_PROFILE_UPDATE_BY_ADMIN_RESET,

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

export const usersCompleteListReducer  = ( state = {users:[]}, action ) => { //this is the reducer function we export it!

         
        switch( action.type ){
                case   USER_COMPLETE_LIST_REQUEST :
                return {loading: true } // fetching data ...
        
                case  USER_COMPLETE_LIST_SUCCESS:
                        return {loading: false ,users: action.payload} //if fech success...
       
                case USER_COMPLETE_LIST_FAIL:
                        return {loading: false, error: action.payload} //if fech failed...
                
                case USER_COMPLETE_LIST_RESET:
                        return {users:[]} //if we want to reset the user's data
                
        
                default:
                return state //pass the state as is.
        
}}

 export const userDeleteReducer  = ( state = {success: false}, action ) => { //this is the reducer function we export it!

         
        switch( action.type ){
                case   USER_DELETE_REQUEST :
                return {loading: true } // fetching data ...
        
                case   USER_DELETE_SUCCESS:
                        return {loading: false , success: true} //if fech success...
       
                case  USER_DELETE_FAIL :
                        return {loading: false, error: action.payload} //if fech failed...
                
        
                default:
                return state //pass the state as is.
        
}}


export const userUpdateByAdminReducer  = ( state = {user: {}}, action ) => { //this is the reducer function we export it!
        
        
        switch( action.type ){
                case   USER_PROFILE_UPDATE_BY_ADMIN_REQUEST :
                        return {loading: true } // fetching data ...
                        
                        case   USER_PROFILE_UPDATE_BY_ADMIN_SUCCESS:
                                return {loading: false , success:true} //if fech success...
                                
                        case  USER_PROFILE_UPDATE_BY_ADMIN_FAIL :
                                return {loading: false, error: action.payload} //if fech failed...
                                        
                        case  USER_PROFILE_UPDATE_BY_ADMIN_RESET :
                                return {user:{}} 
                                                
                        default:
                         return state //pass the state as is.
                                                        
}}
