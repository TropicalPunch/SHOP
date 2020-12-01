import mongoose from 'mongoose';



const orderSchema = mongoose.Schema({

    user:{ //who created the product? //will create relations between the productModel and userModel (the one who buys the product)

        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },

    orderItems:[{ //it's an arry of items
        name:{type: String, required:true},
        quantity:{type: Number, required:true},
        image:{type: String, required:true},
        price:{type: Number, required:true},
        productId:{//will have relations with the product schema
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
        

    }],
    shippingAddress:{
        address:{ type: String, required:true },
        city:{ type: String, required:true },
        postalCode:{ type: String, required:true },
        country:{ type: String, required:true },
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    paymentResult:{ //will be recieved from paypal...see order controller
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},  
    },
    itemsTotalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },

    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalOrderPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt:{
        type: Date
    },
    
    
},{
    //mongoose built in time stamps for "created at"/ "updated at"
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order