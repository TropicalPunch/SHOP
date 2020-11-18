import express from 'express'

const router = express.Router()// api/users/


import {authUser,getUserProfile, registerUser, updateUserProfile} from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js' //routes protecting middleware
//fetch users email and password from the DOM(body)

router.post('/login',authUser) // api/users/login

//routes protecting middleware will protect the /profile route by adding it to the get request as its first argument!
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile) // api/users/profile 

//register a new user route
router.route('/').post(registerUser) // api/users/

export default router

