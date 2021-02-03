import mongoose from 'mongoose';


const contactUsSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    ticketClosed:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    //mongoose built in time stamps for "created at"/ "updated at"
    timestamps: true
})

const ContactUs = mongoose.model('ContactUs', contactUsSchema) //this variable will contain the structure for which a data from the DB will be presented.

export default ContactUs