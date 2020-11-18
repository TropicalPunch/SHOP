import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

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

userSchema.methods.matchPassword = async function(enteredPassword){ //we assign a method manualy to the user schema
 return await bcrypt.compare(enteredPassword, this.password)
}//we will use this method "matchPassword" in the userController

userSchema.pre('save', async function(next){ //password hashing middleware- for hashing when a new user is creatd/ password is updated by user.

    if(!this.isModified('password')){ // this part of the code is a preparation to edit user profile.
        next()
    }

    const salt = await bcrypt.genSalt(10) //we use await cuz it return a promise
    this.password = await bcrypt.hash(this.password, salt) 
    //this refers to the user we are just creating! meaning we store in the password key a new password value, which is the hashed one !

})

const User = mongoose.model('User', userSchema)

export default User