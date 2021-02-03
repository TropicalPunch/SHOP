import React from 'react'
import {Route} from 'react-router-dom'
import{useDispatch, useSelector} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import mainLogo from './mainlogo.png'
import {logout} from '../actions/userActions'
import SearchField from './Search'

const Header = () => {

  const dispatch = useDispatch()
  const cart = useSelector(state=> state.cart) //gain access to the cartItems from the state.
  const {cartItems} = cart
  const userLogin =  useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const logoutHandler = ()=>{dispatch(logout())} //the log out action fired off and the user is logged out by removing the userinfo fron the local storage

  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top' collapseOnSelect>
        <Container className='mx-0' >
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={mainLogo}
                className='d-inline-block align-top'
                alt='Polyverse logo'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/*rendering the search field in the navBar */}
           
            <Nav className='ml-auto justify-content-end'>

              <LinkContainer to='/about' style={{display:'flex', alignItems:'center'}}>
                
                  <Nav.Link varient='dark' className='h4' >
                      About
                  </Nav.Link>
                
              </LinkContainer>
              
              
            
              {userInfo ? (
                <div style={{display:'flex', alignItems:'center'}}>
                  
               <NavDropdown title={userInfo.name} id='username' className='h4'>
                  <NavDropdown.Item className='navdrop' href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className='navdrop' onClick={logoutHandler}>Log Out</NavDropdown.Item>
               
               </NavDropdown>

                </div>
              ) : 

              <LinkContainer to='/login'>
                <Nav.Link varient='dark'>
                  <h4>
                    <i className='fas fa-user-astronaut p-3'></i> Sign In
                  </h4>
                </Nav.Link>
              </LinkContainer>
              }
              
              {userInfo && userInfo.isAdmin && ( //different dropdown if the user is admin
                <div style={{display:'flex', alignItems:'center'}}>
                  
                  <NavDropdown title="Admin Ops" id='adminmenu' className='h4'>
                  <NavDropdown.Item className='navdrop' href="/admin/users">Users List</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className='navdrop' href="/admin/products">Products List</NavDropdown.Item> 
                    <NavDropdown.Divider />
                    <NavDropdown.Item className='navdrop' href="/admin/orders">Orders List</NavDropdown.Item>              
                  </NavDropdown>
  
                 </div>
               
              )}
              <LinkContainer to='/cart'>
                <Nav.Link varient='dark'>
                  <h4>
                    { cartItems.length >= 1 ? <i className='fas fa-shopping-cart p-3' style={{ color: 'green'}}></i> : <i className='fas fa-shopping-cart p-3'></i> }
                  </h4>
                </Nav.Link>
              </LinkContainer>    

              <Route render={({history}) =>  <SearchField history={history} /> } />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
