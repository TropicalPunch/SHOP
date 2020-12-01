import React from 'react'
import{Nav, ProgressBar, Row} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'

const CheckoutProgressBar = ({step1,step2,step3,step4}) => { 
//the steps and progress values will be passed as props in this manner:
// <CheckoutProgressBar step1 step2 step3 />



return (
  
    <Nav classname='justify-content-center mb-4'>
           
           <Nav.Item>
          {step1? (
              <LinkContainer to='/cart'>
           <Nav.Link><h4 className='activeProg'>Cart</h4></Nav.Link>
          </LinkContainer>
          ):(<Nav.Link disabled><h4>Cart</h4></Nav.Link>)}  
          </Nav.Item>

          <Nav.Item>
          {step2? (
              <LinkContainer to='/shipping'>
           <Nav.Link><h4 className='activeProg'>Shipping</h4></Nav.Link>
          </LinkContainer>
          ):(<Nav.Link disabled><h4>Shipping</h4></Nav.Link>)}  
          </Nav.Item>

          <Nav.Item>
          {step3? (
              <LinkContainer to='/payment'>
           <Nav.Link><h4 className='activeProg'>Payment</h4></Nav.Link>
          </LinkContainer>
          ):(<Nav.Link disabled><h4>Payment</h4></Nav.Link>)}  
          </Nav.Item> 

          <Nav.Item>
          {step4? (
              <LinkContainer to='/placeorder'>
           <Nav.Link><h4 className='activeProg'>Place Order</h4></Nav.Link>
          </LinkContainer>
          ):(<Nav.Link disabled><h4>Place Order</h4></Nav.Link>)}  
          </Nav.Item> 
             
          
        </Nav>
       
    )
}

export default CheckoutProgressBar
