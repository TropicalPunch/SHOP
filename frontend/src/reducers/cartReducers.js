import { CART_ADD_ITEM } from '../constants/cartConstants'
import { CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: []}, action) =>{ //the initial state object is going to have an empty array of items(products).

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
           // the payload containes only the product id !
            
            return{...state, cartItems: state.cartItems.filter(currentProduct => currentProduct.productId !== action.payload )}
                
           

        default: 
        return state
    }

}