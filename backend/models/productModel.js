import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({ //a single review schema may also be in its own file ...
    user:{ //who created the review?
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //will create relations between the reviewModel and userModel (the one who added the review)

    },
    
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
},{ //mongoose built in time stamps for "createdAt"/ "updated at"
timestamps: true })

const productSchema = mongoose.Schema({

    user:{ //who created the product?
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //will create relations between the productModel and userModel (the one who added the product)

    },

    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        
    },
    heroPhrase:{
        type: String
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        default:0
    },
    reviews:[
        reviewSchema
    ],
    numReviews:{
        type: Number,
        required: true,
        default:0
    },
    price:{
        type: Number,
        required: true,
        default: 150.00
    },
    status:{ //may call it inStock
        type: Boolean,
        required: true,
        default: true
    },
    poster:{
        type: String,
       // required: true
    },
    interfaceImage:{
        type: String,
        //required: true
    },
    compatibility:{
        type: String,
       },
    longDescription:{
        type: String,
        //required: true,
    },
    video1:{
        type: String,
        //required: true,
    },
    features: {type: [String], required: true},
    
},{
    //mongoose built in time stamps for "created at"/ "updated at"
    timestamps: true
})

const Product = mongoose.model('Product', productSchema) //this variable will contain the structure for which a data from the DB will be presented.

export default Product