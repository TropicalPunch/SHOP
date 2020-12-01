import axios from 'axios'

import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'


//here we are using thunk...
//we also gonna save the entire cart in the browsers local storage.
//getSate will allow us to interact with the app state as written in the store 

export const addToCartAction = (id, quantity ) => async (dispatch,getState)=>{
    const {data} = await axios.get(`/api/products/${id}`) //we will destructure the data from the request.

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image:data.image,
            price: data.price,
            quantity //users input= action argument
        },
    })
    //lets save it in loca storage : we may save only strings therefore we need JSON.stringify
    ///once we take it out (in the store) well use JSON.parse()
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const removeFromCartAction = (id) => async (dispatch,getState)=>{
 
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id, //the paload is the ID that we got as an argument!!
    })
    //lets save it in loca storage : we may save only strings therefore we need JSON.stringify
    ///once we take it out (in the store) well use JSON.parse()
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const saveShippingAddress = (formData) => async (dispatch,getState)=>{
    //the action argument is the product ID!!
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: formData, //the paload is the from data that we got as an argument straigt from the frontend (by dispatch)!!
    })
    //lets save it in loca storage : we may save only strings therefore we need JSON.stringify
    ///once we take it out (in the store) well use JSON.parse()
    localStorage.setItem('shippingAddress',JSON.stringify(formData))

}


export const savePaymentMethod = (paymentMethod) => async (dispatch,getState)=>{
  
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod, //the payload is the payment methoduser choose that we got as an argument straigt from the frontend (by dispatch)!!
    })
    //lets save it in loca storage : we may save only strings therefore we need JSON.stringify
    ///once we take it out (in the store) well use JSON.parse()
    localStorage.setItem('paymentMethod',JSON.stringify(paymentMethod))

}