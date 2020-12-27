import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux' //so we can access the redux app level state
import {Button, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listAllUsers,deleteUserById } from '../actions/userActions'


const AdminsAllUsersScreen = ({history}) => {
     const dispatch = useDispatch()
     const usersList = useSelector(state=> state.usersCompleteList)//from the store's state
     const {loading, error, users} = usersList//destructre
     
     const userLogin = useSelector(state=> state.userLogin) //from the store's state
     const {userInfo} = userLogin //destructre

     const userDelete = useSelector(state=> state.userDelete) //from the store's state
     const {success: successDelete} = userDelete //destructre + rename

     useEffect(() => {
         if(userInfo && userInfo.isAdmin){

             dispatch(listAllUsers())
         }else{//if a not admin trying to get to /admin/users route we will redirect him!
            history.push('/login')
         }

         
     }, [dispatch, history,userInfo, successDelete]) //successDelete is also here so once we delete a user the component will be re rendered and the user list will be updated!

     const deleteUserHandler = (userId,userName) =>{
         //adding a confirm prompt before deleting:
         if(window.confirm(`Are you sure you wand to delete user: ${userName}`)){

             dispatch(deleteUserById(userId))
         }
     }

    return (
        <div>
            <div style={{ textAlign: "center"}}><h1>All Users In DB </h1></div>
                {loading ? 
                 <Loader/> : 
                 error ? 
                 <Message variant='danger'>{error}</Message> :
                  (
                    <Table   hover responsive size='sm' >
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name }</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin ? 
                                        (<i className="fas fa-crown" style={{color: '#c2dd19'}}></i>) 
                                         :
                                        ( <i className="fas fa-user-astronaut" style={{color: '#ba19dd'}}></i>)
                                        } 
                                    </td>
                                    
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`} >
                                            <Button variant="light"> <i className="fas fa-edit" style={{color: '#061b73'}}></i></Button>
                                        </LinkContainer>
                                       
                                    </td>
                                    <td>
                                    <Button variant="light" onClick={()=>deleteUserHandler(user._id,user.name)}><i className="fas fa-user-times"  style={{color: '#730624'}}></i></Button>
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

export default AdminsAllUsersScreen
