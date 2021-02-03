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
         PRODUCT_CREATE_RESET,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
         PRODUCT_UPDATE_RESET,
         PRODUCT_ADD_REVIEW_REQUEST,
         PRODUCT_ADD_REVIEW_SUCCESS,
         PRODUCT_ADD_REVIEW_FAIL,
         PRODUCT_ADD_REVIEW_RESET,
         PRODUCT_TOP_REVIEWS_REQUEST,
         PRODUCT_TOP_REVIEWS_SUCCESS,
         PRODUCT_TOP_REVIEWS_FAIL,
        

        } from '../constants/productsConstants'


export const productsListReducer  = ( state = {products: []}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCTS_LIST_REQUEST:
            return {loading: true, products: [] } // fetching data ...

        case PRODUCTS_LIST_SUCCESS:
                return {loading: false, 
                    products: action.payload.products, 
                    pages: action.payload.pages, 
                    page: action.payload.page } //if fech success...
        //due to pagination we now have more data from the request
        case PRODUCTS_LIST_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 


export const productCardReducer  = ( state = {product: {reviews:[]}}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_CARD_REQUEST:
            return {...state,loading: true  } // fetching data ...

        case PRODUCT_CARD_SUCCESS:
                return {loading: false, product: action.payload} //if fech success...
        
        case PRODUCT_CARD_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 


export const productDeleteByAdminReducer  = ( state = {success: false}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true } // fetching data ...

        case PRODUCT_DELETE_SUCCESS:
                return {loading: false, success: true} //if fech success...
        
        case PRODUCT_DELETE_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 


export const productCreateByAdminReducer  = ( state = {}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_CREATE_REQUEST:
            return {loading: true } // fetching data ...

        case PRODUCT_CREATE_SUCCESS:
                return {loading: false, success: true, product: action.payload} //if fech success...
        
        case PRODUCT_CREATE_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        case PRODUCT_CREATE_RESET:
                return {} 

                default:
            return state //pass the state as is.

    }

} 

export const productUpdateByAdminReducer  = ( state = {product:{}}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true } // fetching data ...

        case PRODUCT_UPDATE_SUCCESS:
                return {loading: false, success: true, product: action.payload} //if fech success...
        
        case PRODUCT_UPDATE_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        case PRODUCT_UPDATE_RESET:
                return {product:{}} 

                default:
            return state //pass the state as is.

    }

} 

export const productAddReviewReducer  = ( state = { }, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_ADD_REVIEW_REQUEST:
            return {loading: true } // fetching data ...

        case PRODUCT_ADD_REVIEW_SUCCESS:
                return {loading: false, success: true} //if fech success...
        
        case PRODUCT_ADD_REVIEW_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        case PRODUCT_ADD_REVIEW_RESET:
                return { } 

                default:
            return state //pass the state as is.

    }

} 

export const productsTopReviewsReducer  = ( state = {products: []}, action ) => { //this is the reducer function we export it!

    switch( action.type ){
        case PRODUCT_TOP_REVIEWS_REQUEST:
            return {...state, loading: true, products: [] } // fetching data ...

        case PRODUCT_TOP_REVIEWS_SUCCESS:
                return {loading: false, products: action.payload} //if fech success...
        
        case PRODUCT_TOP_REVIEWS_FAIL:
                return {loading: false, error: action.payload} //if fech failed...
        
        default:
            return state //pass the state as is.

    }

} 