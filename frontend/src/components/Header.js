import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import mainLogo from './mainlogo.png'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top' collapseOnSelect>
        <Container>
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
                    {' '}
                    <i className='fas fa-shopping-cart p-3'></i> Cart
                  </h4>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link varient='dark'>
                  <h4>
                    <i className='fas fa-user-astronaut p-3'></i> Sign In
                  </h4>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
