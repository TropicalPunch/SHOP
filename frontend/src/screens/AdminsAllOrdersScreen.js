import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Button, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllordersByAdmin } from '../actions/orderActions'


const AdminsAllOrdersScreen = ({history}) => {
     
    const dispatch = useDispatch()

     const ordersList = useSelector(state=> state.ordersListAll)//from the store's state
     const {loading, error, orders} = ordersList//destructre
     
     const userLogin = useSelector(state=> state.userLogin) //from the store's state
     const {userInfo} = userLogin //destructre

     

     useEffect(() => {
        if(userInfo.isAdmin){

             dispatch(getAllordersByAdmin())
        }else{//if a not admin trying to get here we will redirect him!
            history.push('/login')
        }

         
     }, [dispatch, history,userInfo]) 

     

    return (
        <div>
            <div style={{ textAlign: "center"}}><h1>All Orders In DB </h1></div>
                {loading ? 
                 <Loader/> : 
                 error ? 
                 <Message variant='danger'>{error}</Message> :
                  (
                    <Table   hover responsive size='sm' >
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Date Created</th>
                                <th>Date Paid</th>
                                <th>Total</th>
                                <th>Delivered?</th>
                                <th>Manage</th>
                                
                            </tr>
                        </thead>
                        <tbody> 
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name }</td>
                                    <td><a href={`mailto:${order.user.email}`}>{order.user.email }</a></td>
                                    <td>{order.createdAt.substring(0,10) /*created automaticallyby mongo */ }</td>
                                    <td>{order.isPaid ? 
                                        order.paidAt.substring(0,10)
                                         :
                                        ( <i className="fas fa-exclamation-circle" style={{color: '#eda006'}}></i>)
                                        } 
                                    </td>
                                    <td>${order.totalOrderPrice}</td>
                                    <td>{order.isDelivered ? 
                                        order.deliveredAt.substring(0,10)
                                         :
                                        ( <i className="fas fa-exclamation-circle" style={{color: '#eda006'}}></i>)
                                        } 
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`} >
                                            <Button variant="light"> <i className="fas fa-edit" style={{color: '#061b73'}}></i></Button>
                                        </LinkContainer>
                                       
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

export default AdminsAllOrdersScreen
