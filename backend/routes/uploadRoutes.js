import path from 'path' // this is a node module
import express from 'express'
import multer from 'multer' //an npm pack for uploading files
//import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch

const router = express.Router()  //api/uploads/...

//according to the storage part in multer documentation:
//storage setup:
const storage = multer.diskStorage({
    //setup where we want to save the file:
    destination(req, file, cb){ // cb is callback
        cb(null,'uploads/')
    },
    //setup how we want to call the file when saved:
    filename(req,file,cb){
        //it will be=> filename-dateAdded.jpeg / .jpg / .png (depends on what file extesion the user uploaded!)
        //path.extname(file.originalname)- is a method on the path module-> it gets the file's extension in our case- .png .jpg .jpeg
        //file.originalname -> is the uploaded files original name!
        //first parameter we set as= null because it's an error related  
        //file.fieldname=> fieldname is the html id (controlId) name we gave the tag that receives the image upload in the frontend.
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }

})
function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
   
    //this extname is our own variable- in it we use the path's extname method.
    //test() method will give us a boolean result: true if the uploaded file extension equals to one of these: jpg|jpeg|png 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    
    //Each file has a MIME type-  is a two-part identifier for file formats and format contents transmitted on the Internet. 
    //in our case: image/jpeg, image/png, image/jpg
    const mimetype =  filetypes.test(file.mimetype)

    if(extname && mimetype){

        return cb(null, true)
    }else{
        cb('only jpg|jpeg|png files can be uploaded ')
    }
}

//will be used as a middleware in the route.
const upload = multer({
    storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file,cb)
        //console.log('this is the file data :'+JSON.stringify(file))
        //{"fieldname":"image","originalname":"logo2.JPG","encoding":"7bit","mimetype":"image/jpeg"}
    }
})

//post(route, middleware, controller )
//'image'==> we must remember to call the uploaded file 'image' in the frontend to suite this request!
//upload.single('image')-> used as a middleware for the file uploading. 
router.post('/', upload.single('image'), (req,res)=>{
       
    
    res.send(`/${req.file.path.replace(/\\/g,"/")}`)
  

})

export default router