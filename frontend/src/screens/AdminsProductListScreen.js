import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import { Table, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts,deleteProductById, createProductByAdmin} from '../actions/productsActions'
import {PRODUCT_CREATE_RESET} from '../constants/productsConstants'


const AdminsProductListScreen = ({ history}) => { //destructure match & history out of props
    
    const dispatch = useDispatch()

    const productsList = useSelector(state=> state.productsList) //from the store's state
    const {loading, error, products } = productsList //destructre

    const productDelete = useSelector(state=> state.productDeleteByAdmin) //from the store's state
    const {loading: deleteProductLoading, error:deleteProductError, success:deleteProductSuccess } = productDelete //destructre + rename


    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {userInfo} = userLogin //destructre

    const productCreate = useSelector(state=> state.productCreateByAdmin) //from the store's state
    const {loading: createProductLoading, error:createProductError, success:createProductSuccess, product: createdProduct } = productCreate //destructre + rename
//product: will contain the product with the dummy data + it's id that was generated my mongo!!
  
    
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET} ) //as soon as the component mounts we will reset the new product data!
        
        if(!userInfo.isAdmin){
            history.push('/login')//if a not admin trying to get to /admin/users/id route we will redirect him!
        }
        if(createProductSuccess){ //if user created a new product will be re directed to edit the dummy data!
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts()) //get all products in the app
        }
        
    }, [dispatch, history,userInfo, deleteProductSuccess, createProductSuccess, createdProduct])
    
    const createProductHandler= ()=>{
        dispatch(createProductByAdmin())
    }
    
    const deleteUserHandler = (productId) =>{
        //adding a confirm prompt before deleting:
        if(window.confirm(`Are you sure you wand to delete product:`)){
            dispatch(deleteProductById(productId))   
        }
    }

    return (
        <div>
            <Row className='ailgn-items-center'>
                
                <Col className='text-right'>
                    <Button variant="info" className='my-3' onClick={createProductHandler}>
                      <i className="fas fa-plus" style={{color:'#d5ee2d', padding:'0.5rem'}}></i>
                      New Product
                    </Button>
                </Col>
            </Row>
            <div style={{ textAlign: "center"}}><h1>All Products In DB </h1></div>
                {createProductLoading &&
                 <Loader/> }
                  {createProductError && 
                  <Message variant='danger'>{createProductError}</Message> }
                 { createProductSuccess &&  <Message variant='success'>New Product Created </Message>  }
            
                {deleteProductLoading &&
                 <Loader/> }
                  {deleteProductError && 
                  <Message variant='danger'>{deleteProductError}</Message> }
                 { deleteProductSuccess &&  <Message variant='success'>Product Deleted </Message>  }
            
                {loading ? 
                 <Loader/> : 
                 error ? 
                 <Message variant='danger'>{error}</Message> :
                  (
                    <Table   hover responsive size='sm' >
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>No.Reviews</th>
                                <th>Name</th>
                                
                            </tr>
                        </thead>
                        <tbody> 
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.brand} </td>
                                    <td>${product.price}</td>
                                    <td>{product.numReviews} </td>
                                    <td>
                                      <LinkContainer to={`/products/${product._id}`} >
                                      <Button variant="secondary" block>{product.name}</Button>  
                                      </LinkContainer>
                                    </td>
                                    
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`} >
                                            <Button variant="light"> <i className="fas fa-edit" style={{color: '#061b73'}}></i></Button>
                                        </LinkContainer>
                                       
                                    </td>
                                    <td>
                                    <Button variant="light" onClick={()=>deleteUserHandler(product._id,product.name)}><i className="fas fa-times"  style={{color: '#730624'}}></i></Button>
                                    </td>
                                </tr>
                            ) )}

                        </tbody>
                    </Table>
                  )
                }
        </div>
    )
}

export default AdminsProductListScreen
