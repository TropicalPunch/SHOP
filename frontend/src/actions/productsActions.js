import axios from 'axios'

import { 
     PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCT_CARD_REQUEST,
    PRODUCT_CARD_SUCCESS,
    PRODUCT_CARD_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_ADD_REVIEW_REQUEST,
    PRODUCT_ADD_REVIEW_SUCCESS,
    PRODUCT_ADD_REVIEW_FAIL,
    PRODUCT_TOP_REVIEWS_REQUEST,
    PRODUCT_TOP_REVIEWS_SUCCESS,
    PRODUCT_TOP_REVIEWS_FAIL,
    

 } from '../constants/productsConstants'

export const listProducts =  (searchKeyword='', pageNumber = '')=>//this is an action creator function
     //we will do the fetch here! instead of the HomeScreen component (with axios)
     //because it's asynchronous we need redux thunk middleware:
     //pageNumber--> used for pagination! in url's quary string. 
     async (dispatch)=>{

        try{
            dispatch({type: PRODUCTS_LIST_REQUEST}) // only type will be sent to product reducer
            const { data } = await axios.get(`/api/products?searchKeyword=${searchKeyword}&pageNumber=${pageNumber}`) //here the actual data of products fron the DB will be.
            //`/api/products?searchKeyword=${searchKeyword}` --> passing a query string to the server ? -> means - "does it exists?"
            
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
             //console.log(data.reviews[0]._id)
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

//for admin: delete product by id.
export const deleteProductById = (productId) => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token.
    //this actions will get the product deleted from the DB.
 
    
    try{
       dispatch({
           type: PRODUCT_DELETE_REQUEST
       })

       const {userLogin:{userInfo}} = getState() //destructure userInfo from getstate (it's a second level destructure)
       //we use getState to access the userInfo which contains the token at--> userInfo.token .
    
       const config = {
           headers:{
               //'Content-type':'application/json',- no need in delete request.
               //for communicating with the server
               Authorization:`Bearer ${userInfo.token}`
               //for providing a Bearer token to the server (protected route)
           }
       }
       
       await axios.delete(`/api/products/${productId}`, config) //no need to store this data in a variable.
    //we are going to DELETE data from server, the route is /api/products/:id.
    
       dispatch({
   
        type: PRODUCT_DELETE_SUCCESS,
   
       })
      
   }catch (error){
       dispatch({type: PRODUCT_DELETE_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
   
   
    }
   
}
 

//for admin: create a new product 
export const createProductByAdmin = () => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token.
    /*This is a post request, we will provoke this route :`/api/products` with a post request 
    the controller function will immediately create a dummy data product! and post it to the Server!
    that's why this action doesn't need any arguments!
    */
 
    try{
       dispatch({
           type: PRODUCT_CREATE_REQUEST
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
       
      const {data} =  await axios.post(`/api/products`, {} ,config) 
    //we are going to post automatically dummy data to server, the route is /api/products.
    //that why the secont argument of the request is an empty object, the cotroller in the route will create the object and post it in the DB
       dispatch({
   
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
   
       })
      
   }catch (error){
       dispatch({type: PRODUCT_CREATE_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
   
   
    }
   
}


//for admin: update a product (put)
export const updateProductByAdmin = (product) => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token.
    /*we will pass the action function the new product's data,
     it will also contain the product's id in it which we will need for the server's route*/

 
    try{
       dispatch({
           type: PRODUCT_UPDATE_REQUEST
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
       
      const {data} =  await axios.put(`/api/products/${product._id}`, product ,config) 
    //we are going to put- update  data to server, the server route is /api/products/id
    //that why the second argument of the request is the new product's data.
       dispatch({
   
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
   
       })
      
   }catch (error){
       dispatch({type: PRODUCT_UPDATE_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
    }
}

//add a product review (post)
export const addProductReview = (productId, review) => async (dispatch, getState)=>{
    //here we also use the redux-thunk to make an asynchronous request.
    //we use getState because we can access the userInfo which contains the token.
    /*we will pass the action function the product's id, and the review object from the frontend form*/
    try{
       dispatch({
           type: PRODUCT_ADD_REVIEW_REQUEST
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
       
       await axios.post(`/api/products/${productId}/reviews`, review ,config) 
    //we are going to post- update  data to server, the server route is /api/products/id
    //that why the second argument of the request is the new product's data.
       dispatch({
        type: PRODUCT_ADD_REVIEW_SUCCESS,
       })
      
   }catch (error){
       dispatch({type: PRODUCT_ADD_REVIEW_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
    }
}

//get products sorted by rating from server(get)
export const getProductsByReviews = () => async (dispatch)=>{
    //here we also use the redux-thunk to make an asynchronous request.
   
    try{
       dispatch({
           type: PRODUCT_TOP_REVIEWS_REQUEST
       })

       
       const {data} = await axios.get(`/api/products/top-products`) 
    
       dispatch({
        type: PRODUCT_TOP_REVIEWS_SUCCESS,
        payload: data,
       })
      
   }catch (error){
       dispatch({type: PRODUCT_TOP_REVIEWS_FAIL, 
           payload: 
           error.response && error.response.data.message 
           ?
            error.response.data.message
           :
           error.message
            })
    }
}