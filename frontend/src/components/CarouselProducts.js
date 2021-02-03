import React,{useEffect ,useState} from 'react'
import{Link} from 'react-router-dom'
import {Carousel, Image,Button} from 'react-bootstrap'
import{useDispatch, useSelector} from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import {getProductsByReviews} from '../actions/productsActions'

const CarouselProducts = (props) => {
    const dispatch = useDispatch()

    const productsTopReviews = useSelector(state => state.productsTopReviews)
    const {loading, error, products} = productsTopReviews

    useEffect(() => {
        dispatch(getProductsByReviews())
        
        
    },[dispatch])

    // const buyNowHandler = (productId)=>{
    //     props.history.push(`/cart/${prodId}?quant=1`) //push of undefined
    //     console.log('product id :', productId )
  
    // }

    return loading ? (<Loader/>) : error ? ( <Message variant='danger'> {error} </Message> )
        :
        (

            <Carousel pasue= 'hover' className = 'bg-dark'>
                {products.map((product) =>(
                   
                    
                    <Carousel.Item key={product._id}>
                        <Link to={`/products/${product._id}`} >
                            <Image src={product.poster} alt={product.name} fluid></Image>
                            <Carousel.Caption className = 'carousel-caption' block>
                               
                                <h1> Only ${product.price} </h1>
                            </Carousel.Caption>
                        </Link>
                        <Carousel.Caption>
                            <Button className='buy-now-button'  variant='danger' type='button' ><Link className='buy-link' to={`/cart/${product._id}?quant=1`} > Buy now </Link> </Button> 
                        </Carousel.Caption>
                        
                    
                    </Carousel.Item>
                   
                ))}

            </Carousel>
       )
}

export default CarouselProducts
