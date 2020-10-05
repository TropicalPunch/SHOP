import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import mainLogo from './mainlogo.png'

const Header = () => {
  return (
    <header>
      <Navbar bg='light' expand='lg' fixed='top' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={mainLogo}
              className='d-inline-block align-top'
              alt='Polyverse logo'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart' varient='dark'>
                <h4>
                  {' '}
                  <i className='fas fa-shopping-cart'></i> Cart
                </h4>
              </Nav.Link>
              <Nav.Link href='/login' varient='dark'>
                <h4>
                  <i className='fas fa-user-astronaut'></i> Sign In
                </h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
