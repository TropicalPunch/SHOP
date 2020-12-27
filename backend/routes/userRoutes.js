import express from 'express'

const router = express.Router()// api/users/


import {authUser,getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUserById ,getUserById, updateUserProfileByAdmin} from '../controllers/userControllers.js'
import {protect,adminProtect} from '../middleware/authMiddleware.js' //routes protecting middleware
//fetch users email and password from the DOM(body)

router.post('/login',authUser) // api/users/login

//routes protecting middleware will protect the /profile route by adding it to the get request as its first argument!
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile) // api/users/profile 

//register a new user route
//getAllUsers- is an admin only operation
router.route('/').post(registerUser).get(protect, adminProtect ,getAllUsers) // api/users/

// api/users/:id
//deleteUserById- is an admin only operation
router.route('/:id')
.delete(protect, adminProtect , deleteUserById)
.get(protect, adminProtect ,getUserById)
.put(protect, adminProtect ,updateUserProfileByAdmin)

export default router

