import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsListReducer, productCardReducer } from './reducers/productsReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer   } from './reducers/userReducers'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderUserHistoryReducer} from './reducers/orderReducers'


const reducer  = combineReducers({ //reducer is part of the store's inputs
    productsList: productsListReducer,
    productDetails: productCardReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderUserHistory: orderUserHistoryReducer
    
})

const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')) : []
const userInfoLocalStorage = localStorage.getItem('userInfo') ? JSON.parse( localStorage.getItem('userInfo')) : null
const shippingAddressLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse( localStorage.getItem('shippingAddress')) : {}
const paymentMethodLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse( localStorage.getItem('paymentMethod')) : ''


const initialState = {
    cart:{
        cartItems: cartLocalStorage,
        shippingAddress:shippingAddressLocalStorage,
        paymentMethod:paymentMethodLocalStorage

    },
    userLogin:{ userInfo: userInfoLocalStorage},
    
}
const middleWare = [thunk]
//store is being consumed all accross the app. see index.js
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store