import {
         PRODUCTS_LIST_REQUEST,
         PRODUCTS_LIST_SUCCESS,
         PRODUCTS_LIST_FAIL,
         PRODUCT_CARD_REQUEST,
         PRODUCT_CARD_SUCCESS,
         PRODUCT_CARD_FAIL
        } from '../constants/productsConstants'


export const productsListReducer  = ( state = {products: []}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCTS_LIST_REQUEST:
            return {loading: true, products: [] } // fetching data ...

        case PRODUCTS_LIST_SUCCESS:
                return {loading: false, products: action.payload} //if fech success...
        
        case PRODUCTS_LIST_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 


export const productCardReducer  = ( state = {product: {reviews:[]}}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_CARD_REQUEST:
            return {loading: true, ...state } // fetching data ...

        case PRODUCT_CARD_SUCCESS:
                return {loading: false, product: action.payload} //if fech success...
        
        case PRODUCT_CARD_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 