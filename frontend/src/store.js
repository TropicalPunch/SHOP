import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    productsListReducer, 
    productCardReducer, 
    productDeleteByAdminReducer,
    productCreateByAdminReducer,
    productUpdateByAdminReducer,
    productAddReviewReducer,
    productsTopReviewsReducer  
} from './reducers/productsReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer, usersCompleteListReducer, userDeleteReducer,userUpdateByAdminReducer } from './reducers/userReducers'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderUserHistoryReducer,ordersListAllReducer,orderSetAsDeliverdReducer} from './reducers/orderReducers'
import {contactUsTicketReducer} from './reducers/contsctUsReducers'

const reducer  = combineReducers({ //reducer is part of the store's inputs
    productsList: productsListReducer,
    productDetails: productCardReducer,
    productDeleteByAdmin:productDeleteByAdminReducer,
    productCreateByAdmin:productCreateByAdminReducer,
    productUpdateByAdmin:productUpdateByAdminReducer,
    productAddReview:productAddReviewReducer,
    productsTopReviews: productsTopReviewsReducer,  
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersCompleteList:usersCompleteListReducer,
    userDelete:userDeleteReducer,
    userUpdateByAdmin: userUpdateByAdminReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderUserHistory: orderUserHistoryReducer,
    ordersListAll: ordersListAllReducer, 
    orderSetAsDeliverd:orderSetAsDeliverdReducer,
    contactUsTicket:contactUsTicketReducer
    
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