import axios from 'axios'

import { 
     PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCT_CARD_REQUEST,
    PRODUCT_CARD_SUCCESS,
    PRODUCT_CARD_FAIL
 } from '../constants/productsConstants'

export const listProducts =  ()=>//this is an action creator function
     //we will do the fetch here! instead of the HomeScreen component (with axios)
     //because it's asynchronous we need redux thunk middleware:
      async (dispatch)=>{

        try{
            dispatch({type: PRODUCTS_LIST_REQUEST}) // only type will be sent to product reducer
            
            const { data } = await axios.get('/api/products') //here the actual data of products fron the DB will be.
            
            dispatch({type: PRODUCTS_LIST_SUCCESS, payload: data}) //the actual products data will be sent to reducer as payload, and a type will be included!
       
        }catch(error){  // if the fetch failed we need to catch  en error that was sent by the server's error handler moddleware we built!!
            // type will be sent to product reducer as well as a payload with the propper error message.
            dispatch({type: PRODUCTS_LIST_FAIL, 
                payload: 
                error.response && error.response.data.message 
                ?
                 error.response.data.message
                :
                error.message
                 })
        }
      }

      export const detailsProduct =  (id)=> async (dispatch)=>{
 
         try{
             dispatch({type: PRODUCT_CARD_REQUEST}) // only type will be sent to product reducer
             
             const { data } = await axios.get(`/api/products/${id}`) //here the actual data of products fron the DB will be.
             
             dispatch({type: PRODUCT_CARD_SUCCESS, payload: data}) //the actual products data will be sent to reducer as payload, and a type will be included!
        
         }catch(error){  // if the fetch failed we need to catch  en error that was sent by the server's error handler moddleware we built!!
             // type will be sent to product reducer as well as a payload with the propper error message.
             dispatch({type: PRODUCT_CARD_FAIL, 
                 payload: 
                 error.response && error.response.data.message 
                 ?
                  error.response.data.message
                 :
                 error.message
                  })
         }
       }
     
