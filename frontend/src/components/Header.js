import React from 'react'
import{useDispatch, useSelector} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import mainLogo from './mainlogo.png'
import {logout} from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()
  const userLogin =  useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const logoutHandler = ()=>{dispatch(logout())} //the log out action fired off and the user is logged out by removing the userinfo fron the local storage

  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top' collapseOnSelect>
        <Container >
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
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link varient='dark'>
                  <h4>
                    <i className='fas fa-shopping-cart p-3'></i> Cart
                  </h4>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
