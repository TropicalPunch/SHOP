import User from '../models/userModel.js'
import generateToken from '../utills/generateToken.js'
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch

//this is a post request to route: api/users/login
const authUser = asyncErrorhandler(async (req,res)=>{
   const {email,password} = req.body //extract the email & password from the body!

   //res.send({email,password}) //we have access to inputs from the body
    const user = await User.findOne({email: email})
    //we need to use bcypt beacuse we store the passwords in the DB in an encrypted from
   //we also constructed a method for decrypting the password "matchPassword", you can it in userModel.js 
    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
           
        })

    }else{
        res.status(401)
        throw new Error('Invalid Email / Password')
    }


})

//this is a GET request to the protected route: api/users/profile
//return a specific user data.
const getUserProfile = asyncErrorhandler(async (req,res)=>{
  
    //in authMiddleware.js we store all user data that's passed the authentication and authorization proccess in req.user (excluding his password)
    const user = await User.findById(req.user._id)
   // res.send('good! call')
   if(user){
     res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
     })
   }else{
       res.status(404)
       throw new Error('user not found')
   }
 
 })


 //this is a PUT request to the protected route: api/users/profile
//enables edit the specific user's data.
const updateUserProfile = asyncErrorhandler(async (req,res)=>{
  
    //in authMiddleware.js we store all user data that's passed the authentication and authorization proccess in req.user (excluding his password)
    const user = await User.findById(req.user._id)
   
   if(user){

         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         if(req.body.password){
            user.password = req.body.password //will be encrypted automatically due to userModel.js encryption method (includs when password is updated)
         }
         const updatedUser = await user.save()
         
         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id) 
         })
  
   }else{
       res.status(404)
       throw new Error('user not found')
   }
 
 })



 //this is a post request to route: api/users
 //in order to create a new user in the DB, this is a public route!
const registerUser = asyncErrorhandler(async (req,res)=>{
    const {email,password, name} = req.body //extract the name email and password from the body!
 
    //if the email exists in the DB user wont be able to register to our system
     const userExists = await User.findOne({email: email})
    
     if(userExists){
         res.status(400)
         throw new Error('Cannot register, email exists in DB')
     }
     const user = await User.create({
         name,
         email,
         password //soon we will encripy it
     })

     if(user){
         res.status(201).json({ 
             //as user is created we immediatly send his data in a response including the token so he will be able to get authorization
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 

         })
     }else{
         res.status(400)
         throw new Error('User could not be created- invalid data')
     }
 
 })

export {authUser,getUserProfile, updateUserProfile  ,registerUser}