import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsListReducer, productCardReducer } from './reducers/productsReducers'


const reducer  = combineReducers({ //reducer is part of the store's inputs
    productsList: productsListReducer,
    productDetails: productCardReducer
})

const initialState = {}
const middleWare = [thunk]
//store is being consumed all accross the app. see index.js
const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store