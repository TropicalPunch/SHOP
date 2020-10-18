import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }


},{
    //mongoose built in time stamps for "created at"/ "updated at"
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User