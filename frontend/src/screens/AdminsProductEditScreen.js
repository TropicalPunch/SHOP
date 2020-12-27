import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from'../components/FormContainer'
import {detailsProduct,updateProductByAdmin} from '../actions/productsActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productsConstants'


const AdminsProductEditScreen = ({match, history}) => { //destructure match & history out of props
    
    const productId = match.params.id // get the product id from the url

    const [uploadingImage, setUploadingImage]=useState(false)
    const [name, setName] = useState('') //local state
    const [price, setPrice] = useState(500) //local state
    const [brand, setBrand] = useState('') //local state
    const [category, setCategory] = useState('') //local state
    const [description, setDescription] = useState('') //local state
    //const [reviews, setReviews] = useState('') //local state
    const [interfaceImage, setInterfaceImage] = useState('') //local state
    const [status, setStatus] = useState(false) //local state
    const [poster, setPoster] = useState('') //local state
    const [compatibility, setCompatibility] = useState('') //local state
    const [longDescription, setLongDescription] = useState('') //local state
    const [video1, setVideo1] = useState('') //local state
    const [features, setFeatures] = useState('1,2,3') //local state
    const [image, setImage] = useState('')  //local state
    const [heroPhrase, setHeroPhrase] = useState('')  //local state
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {userInfo} = userLogin //destructre

   
    const productDetails = useSelector(state=> state.productDetails) //from the store's state
    const {loading, error, product} = productDetails //destructre

    const productUpdateByAdmin = useSelector(state=> state.productUpdateByAdmin) //from the store's state
    const {loading: loadingUpdate, error: errorUpdate, success: successfulUpdate} = productUpdateByAdmin //destructre+rename
    
    
    useEffect(() => {
        if( !userInfo.isAdmin){//if a not admin user trying to get to this route we will redirect him!
            history.push('/login')  
        }else{
            if(successfulUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push('/admin/products') 
            }else{
                if(!productId){return}
                if(!product.name || product._id !== productId){
                    dispatch(detailsProduct(productId)) //we will get the most updated data.
                }else{
                    setName(product.name)
                    setImage(product.image) 
                    setHeroPhrase(product.heroPhrase)                  
                    setBrand(product.brand)
                    setCategory(product.category)
                    setDescription(product.description)
                    setPrice(product.price)
                // setReviews(product.reviews)
                    setInterfaceImage(product.interfaceImage)
                    setStatus(product.status)
                    setPoster(product.poster)
                    setCompatibility(product.compatibility)
                    setLongDescription(product.longDescription)
                    setVideo1(product.video1)
                    setFeatures(product.features.toString())     //kinda messy,but it's du to the features.split(',') on the productController.js
                }
            }
        }
          
    } , [dispatch, productId, history, userInfo, product, successfulUpdate])
    
    const submitHandler = (event)=>{
        event.preventDefault() //so the page wont be refreshed
         //passing to the action the user object with tha new data... will be updated in the DB
        
         dispatch(updateProductByAdmin({ 
             //we are setting up the product object which will be passed to the server's put request by the action!
            _id: productId , //this one is from the url params!
            //all the rest are local state variables which their value is from the form!
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
         }))

    }

    // will be used for the product.status boolean select.
    const strToBoolean = (value) => {
           return  value.toLowerCase() === "true" ?  true : false
     }
    //will be used for uploading "image"to server:
    const uploadImagehandler = async (event)=>{
        event.persist();
        //console.log(event.target.id)

        const file =  event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploadingImage(true)

        try{
            const config ={
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post ('/api/uploads', formData, config)
            
            setUploadingImage(false)

            switch( event.target.id ){
                case 'image-file':
                    return setImage(data) 
        
                case 'interfaceImage-file' :
                        return  setInterfaceImage(data)
                
                case 'poster-file':
                        return  setPoster(data)
                
                case 'compatibility-file':
                    return   setCompatibility(data)    
                
                default:
                    throw new Error('what are you tring to upload ?')
        
            }
            
        }catch (error){
            console.error(error)
            setUploadingImage(false) //or else infinit spinner.
        }
    }

   
    return (
        //let's render the login from
        <>
         <Link to='/admin/products' className='btn btn-light my-3'>Back to list</Link>
         <div style={{fontSize:'large',fontWeight: 'bold'}}> Edit Product  </div>
            <FormContainer>
                
             
                {loadingUpdate && <Loader/>}
                { errorUpdate && <Message>{errorUpdate}</Message>}  
   
                { loading ? <Loader/>/*if  loading the data ...  */ : 
                          error ? <Message>{error}</Message>/*if an error exists render a mesage */ : (
                           
                    <Form onSubmit = {submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}}> Product Current Name: {product.name}  </Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Change Product Name'
                                value={name}
                                onChange={(event)=> setName(event.target.value)}
                                /*whatever we typein will constantly be updated to the local state */
                                >
                            </Form.Control>
                        </Form.Group>

                            <Form.Group controlId='price'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Price </Form.Label>
                                <Form.Control
                                    type='number' 
                                    placeholder='Change Price'
                                    value={price}
                                    onChange={(event)=> setPrice(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>
                           
                            <Form.Group controlId='image'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Product Image - </Form.Label>
                            <Form.Label style={{fontSize:'medium'}} >&nbsp; image URL or upload a file.  </Form.Label>
                                <Form.Control
                                    //user may add photo by URL field or upload file to the server.
                                    type='text' 
                                    placeholder='Enter Image url'
                                    value={image}
                                    onChange={(event)=> setImage(event.target.value)}
                                    >

                                </Form.Control>
                                <Form.File id='image-file' label='Upload image file' custom onChange={uploadImagehandler} style={{fontSize:'medium',fontWeight: 'bold'}}>
                                </Form.File>
                                {uploadingImage && <Loader/>}
                            </Form.Group>

                            <Form.Group controlId='interfaceImage'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} >Product's Interface - </Form.Label>
                            <Form.Label style={{fontSize:'medium'}} >&nbsp; image URL or upload a file.  </Form.Label>
                                <Form.Control
                                    //image field will soon have an "upload button", for now it will be just a text field.
                                    type='text'
                                    placeholder="Enter Product's Interface Image url"
                                    value={interfaceImage}
                                    onChange={(event)=> setInterfaceImage(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                                <Form.File id='interfaceImage-file' label='Upload Image' custom onChange={uploadImagehandler} style={{fontSize:'medium',fontWeight: 'bold'}}>
                                </Form.File>
                                {uploadingImage && <Loader/>}
                            </Form.Group>
                           
                            <Form.Group controlId='poster'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} >Product's Poster - </Form.Label>
                            <Form.Label style={{fontSize:'medium'}} >&nbsp; image URL or upload a file.</Form.Label>
                                <Form.Control
                                    //image field will soon have an "upload button", for now it will be just a text field.
                                    type='text'
                                    placeholder="Enter Product's Poster Image url"
                                    value={poster}
                                    onChange={(event)=> setPoster(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                                <Form.File id='poster-file' label='Upload Image' custom onChange={uploadImagehandler} style={{fontSize:'medium',fontWeight: 'bold'}}>
                                </Form.File>
                                {uploadingImage && <Loader/>}
                            </Form.Group>

                            <Form.Group controlId='compatibility'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} >Product's compatibility - </Form.Label>
                            <Form.Label style={{fontSize:'medium'}} >&nbsp; image URL or upload a file.  </Form.Label>
                                <Form.Control
                                    //image field will soon have an "upload button", for now it will be just a text field.
                                    type='text'
                                    placeholder="Enter Product's compatibility Image url"
                                    value={compatibility}
                                    onChange={(event)=> setCompatibility(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                                <Form.File id='compatibility-file' label='Upload Image' custom onChange={uploadImagehandler} style={{fontSize:'medium',fontWeight: 'bold'}}>
                                    </Form.File>
                                {uploadingImage && <Loader/>}
                            </Form.Group>

                            <Form.Group controlId='video1'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} >Product's Video </Form.Label>
                                <Form.Control
                                    //image field will soon have an "upload button", for now it will be just a text field.
                                    type='text'
                                    placeholder="Enter Product's video url"
                                    value={video1}
                                    onChange={(event)=> setVideo1(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='brand'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Brand </Form.Label>
                                <Form.Control
                                    type='text' 
                                    placeholder="Enter Product's Brand Name"
                                    value={brand}
                                    onChange={(event)=> setBrand(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Category </Form.Label>
                                <Form.Control
                                    type='text' 
                                    placeholder="Enter Product's Category"
                                    value={category}
                                    onChange={(event)=> setCategory(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Description </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={2} 
                                    placeholder="Enter Product's description sentence"
                                    value={description}
                                    onChange={(event)=> setDescription(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='heroPhrase'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Product's Hero Phrase  </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={2} 
                                    placeholder="Enter Product's Hero Phrase"
                                    value={heroPhrase}
                                    onChange={(event)=> setHeroPhrase(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >
                                </Form.Control>
                            </Form.Group>
                        
                            <Form.Group controlId='LongDescription'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Long Description </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={5} 
                                    placeholder="Enter Product's Long Description"
                                    value={longDescription}
                                    onChange={(event)=> setLongDescription(event.target.value)}
                                    /*whatever we typein will constantly be updated to the local state */
                                    >

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='features'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Product's Main Features- </Form.Label>
                            <Form.Label style={{fontSize:'medium'}} >&nbsp;Feature 1, feature 2. </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={5} 
                                    placeholder="Enter Product's Features"
                                    value={features}
                                    /*whatever we typein will constantly be updated to the local state */
                                    onChange={(event)=> setFeatures(event.target.value)}
                                    >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='status'>
                            <Form.Label style={{fontSize:'large',fontWeight: 'bold'}} > Product Available ? </Form.Label>
                                <Form.Control
                                    value= {status}
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    onChange={(event)=> setStatus(strToBoolean(event.target.value))}
                                    >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Control>
                            </Form.Group>
                           

                            <Button type='submit' variant="warning" block>Update Product Data</Button>
                    </Form>

                )
                }
                  
                    
            
            
            </FormContainer>
            
        </>

  )
}

export default AdminsProductEditScreen
