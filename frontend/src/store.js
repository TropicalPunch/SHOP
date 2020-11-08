import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsListReducer, productCardReducer } from './reducers/productsReducers'
import {cartReducer} from './reducers/cartReducers'


const reducer  = combineReducers({ //reducer is part of the store's inputs
    productsList: productsListReducer,
    productDetails: productCardReducer,
    cart: cartReducer
})

const cartLocalStorage = localStorage.getItem('cartItems') ? JSON.parse( localStorage.getItem('cartItems')) : []

const initialState = {
    cart:{cartItems: cartLocalStorage}
}
const middleWare = [thunk]
//store is being consumed all accross the app. see index.js
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store