import { CART_ADD_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'
import { CART_REMOVE_ITEM, CART_RESET } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [],shippingAddress:{}}, action) =>{ //the initial state object is going to have an empty array of items(products).

    switch(action.type){

        case CART_ADD_ITEM :
            const payloadProduct = action.payload
            //we will have the id of the product named==>productId in both the payload & in the state!
            const itemExists = state.cartItems.find(currentProduct => currentProduct.productId === payloadProduct.productId  )
            
            if(itemExists){
                //the tricky line: 
                return{...state, cartItems: state.cartItems.map(currentProduct => currentProduct.productId === payloadProduct.productId  ? payloadProduct : currentProduct )}
                
            }else{
                //when it does not exists, we will just push it to the state.
                return { ...state , cartItems: [...state.cartItems, payloadProduct] }
            }

        

        case CART_REMOVE_ITEM :
           // the payload contains only the product id !
            
            return{...state, cartItems: state.cartItems.filter(currentProduct => currentProduct.productId !== action.payload )}
            
        case CART_SAVE_SHIPPING_ADDRESS :
            // the payload contains only the address !
                
                return{...state, shippingAddress:action.payload,}

        case CART_SAVE_PAYMENT_METHOD :
            // the payload contains only the address !
                
                return{...state, paymentMethod:action.payload,}        
                    
        case CART_RESET :
                    // the payload contains only the address !
                        
                        return{cartItems: []}        
                                  
                

        default: 
        return state
    }

}