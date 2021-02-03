import React from 'react'

import {Link} from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import FaceBk from '../components/facebook-icon.png'
// import Youtu from '../components/youtubeicon.png'
// import PopupContactus from './PopupContactus'

const Footer = () => {
  // const[openPopup, setOpenPopup] = React.useState(false)


  return (
    <footer>
              {/* {openPopup && 
             
                <PopupContactus className='contact-popup'/>
              
              } */}
      <Container>
        <Row>
          <Col className='text-center py-3 '>
            <Row className='justify-content-center my-2'>
              Copyright &copy; Polyverse 

            </Row>
            <Row className='justify-content-center' >

            <Link className='btn btn-success p-1' to='/about'>
              Contact Us
          </Link>
              {/* <Button variant="success" onClick={()=>setOpenPopup(!openPopup)} >Contact Us</Button> */}

            </Row>
              
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
