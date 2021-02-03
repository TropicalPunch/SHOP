import Product from '../models/productModel.js'
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch

const getProducts = asyncErrorhandler(async (req,res)=>{ //req.query.searchKeyword ==> we set it in the app.js route
    //pagination:
    const pageSize = 8 //how many products per page
    const page = Number(req.query.pageNumber) || 1 //get page number from query string url. if no number there , it's page 1!
    
    const searchKeyword = req.query.searchKeyword ? {
        name: {
            $regex: req.query.searchKeyword, //use regex to make search match expressions like ==> harddisc to hard disc.
            $options: 'i', //case insensetive

        }}
        :
        {}
    console.log(searchKeyword)

    const count = await Product.countDocuments({...searchKeyword})//count products for pagination.
    const products = await Product.find({...searchKeyword}).limit(pageSize).skip(pageSize * (page - 1)) //get all products /or searched value
     //limit and skip are part of the pagination- they give us the right amount of products for each page! and the right products!
    // throw new Error('throw error at will for fun:)')
    res.json({products, page, pages: Math.ceil(count/pageSize) }) //.json will sent the data as a JSON format! sowhen fatching it we will nedd to JSON.parse() (it is an array of objects.)
   //after pagination is implement we must also send in the response the current page and the amount of total pages
})

const getProductById =  asyncErrorhandler( async (req, res) => {
    //now lets serve a specific product data by url param, user id!
    const product = await Product.findById(req.params.id) // matching the user in the DB to the one being asked in the url parameter.
    if(product){
        res.json(product) //.json will sent the data as a JSON format!
        
    }else{
       // res.status(404).json({message:'Ho no! Product not found'})
       res.status(404)
       throw new Error('Product not found in DB')
    }
})

//admin protected route for deleting a product from the DB.
// /api/products/:id
const deleteProductById =  asyncErrorhandler( async (req, res) => {
    //now lets serve a specific product data by url param, user id!
    const product = await Product.findById(req.params.id) // matching the user in the DB to the one being asked in the url parameter.
   //in case we want only admins who created the product to be able to delete them:
   //you will have to if req.user._id === product.user._id
   
   if(product){
       if(req.user._id == product.user._id || req.user._id == process.env.ADMIN_ID ){
           await product.remove()
           res.json({message: 'Product removed'})
        }else{
            
            res.status(403)
            throw new Error(`You don't have a permission to do that!`)
        }
    }else{
       // res.status(404).json({message:'Ho no! Product not found'})
       res.status(404)
       throw new Error('Product not found in DB')
    }
})

//admin protected route for creating a new product in the DB.
//POST /api/products
const createProductByAdmin =  asyncErrorhandler( async (req, res) => {
  //lets create the new product object with dummy data!
    const product = new Product({
    user: req.user._id,
    name: 'product Name',
    image:"/images/newproduct.jpg",
    brand:'Brand X',
    category:'plugin',
    description:'long string',
    rating: 0,
    reviews: [],
    numReviews:0,
    price: 500,
    status: false,
    poster:"/images/newproductPoster.png",
    heroPhrase:'YOU BETTER HAVE SOMTHING IMPORTANT TO SAY HERE!',
    interfaceImage:"/images/newproductInterface.png",
    compatibility: "/images/newProductCompatibility.png",
    longDescription:'long string',
    video1:
    "https://www.youtube.com/embed/Fwfl3bRmv8Y",
    features:['feature1','feature2'],
   })

   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})

//admin protected route for editing the new product we just created in DB.
//PUT /api/products/:id
const updateProductById =  asyncErrorhandler( async (req, res) => {
    /*one we created the new product / we want to updane an existing product, we will get access in the front end (body)
     to a form with all the relevant product data*/
    const {
        name,
        image,
        heroPhrase,
        brand,
        category,
        description,
        price,
        interfaceImage, 
        status, 
        poster,
        compatibility, 
        longDescription,
        video1,
        features
    } = req.body //destructure all data from the front end form the user filled.

    const product = await Product.findById(req.params.id)

    if(product){
        //lets overrite the current product data with the data the user filled in the front end.
        product.name = name;
        //
        product.image= image;
        product.poster = poster;
        product.interfaceImage = interfaceImage;
        product.compatibility = compatibility ;
        // 
        product.heroPhrase = heroPhrase;
        product.brand= brand;
        product.category = category;
        product.description = description;
        product.price = price;
        product.status = status;
        product.longDescription = longDescription ;
        product.video1 = video1 ;
        product.features = features.split(",");  
        /* in the form itself the features data comes as a string, we ask the user 
        to enter each feature sentence with // to devide them. see AdminsProductEditScreen.js.
        */
        const updateProduct = await product.save()
        res.status(201).json(updateProduct)
        console.log(updateProduct)

    }else{
        res.status(404)
        throw new Error('Product not found.')
    }
  
  })

// protected route for creating a review by logged in user.
//POST /api/products/:id/reviews
const addProductReview =  asyncErrorhandler( async (req, res) => {
    
    const {
       rating, comment, title
    } = req.body //destructure all data from the front end.

    const product = await Product.findById(req.params.id)

    if(product){
        //req.user._id is the currently logged user.
        //review.userId is the id of the user who created the review, see the newReview variable...
      const userCantPostAnotherReview = product.reviews.find(review => review.user.toString() === req.user._id.toString())
     
      if(userCantPostAnotherReview){
          res.status(400)
          throw new Error(`Sorry,you cannot submit another review `)
      }
      const newReview = {
          user: req.user._id,
          name: req.user.name,
          rating: Number(rating), //rating is going to come from the form at the frontend
          comment, //from the front end
          title
      }
      //push the new review to the reviwes array
      product.reviews.push(newReview)
      //length of the array is the number of reviews
      product.numReviews = product.reviews.length
      //in order to calculate the average rating with reduce method, we will need to iterate each review and add up the ratings.
      //,0 ==> means the initial value of the accumilator is 0!
      //at the end of the arre acc will be equal to the sum of ratings, then we will just calculat the meav vlue by deviding the sum with the number of reviews. 
      product.rating = product.reviews.reduce((acc,review)=> review.rating + acc, 0 )/ product.reviews.length
      await product.save()
      res.status(201).json({message: 'Review added!'})

    }else{
        res.status(404)
        throw new Error('Product not found.')
    }
  
  })


// GET top rated products.
//GET /api/products/top-products
const getTopReviewedProducts =  asyncErrorhandler( async (req, res) => {
   
    const products = await Product.find({}).sort({rating: -1}).limit(4)
    res.json(products)
   
  })

export {getTopReviewedProducts, getProductById, getProducts, deleteProductById, createProductByAdmin, updateProductById, addProductReview}
