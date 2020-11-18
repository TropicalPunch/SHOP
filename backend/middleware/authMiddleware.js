import jwt from 'jsonwebtoken'
import asyncErrorHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncErrorHandler(async(req, res,next) =>{ //we wrap the midleware with express async error handler
    let token

    //console.log(req.headers.authorization)  //the token passed through the headers- Bearer *space* tokenString.
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        //only if there is a token and it starts with Bearer we continue.
         try{
             //we need to extract from the headers only the token string excluding the space and 'Bearer' so we will split the string at the space between the token and Bearer.
             token = req.headers.authorization.split(' ')[1]

             const decoded = jwt.verify(token, process.env.JWT_SECRET)
             //console.log(decoded) //will log: { id: '5f91c9d117d7d01c129495', iat: 1604920454, exp: 1607512454 }
             //so we can gain access to this users id as it appears in the DB
             req.user = await  User.findById(decoded.id).select('-password') //.select('-password') so we will store all users data from the DB in this variable except for his password
             next()
            }catch(error){
                console.error(error)
                res.status(401)
                throw new Error('Not authrized, token faild verification')
         }   
    }
    if(!token){
        res.status(401)
        throw new Error('Not authrized, no token in headers')
    }

    
})
export{ protect }