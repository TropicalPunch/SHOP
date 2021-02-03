import React, {useEffect} from 'react'
import {useSelector} from 'react-redux' //so we can access the redux app level state
import { Link } from 'react-router-dom'
import { Card, Image, Button, Col, Row } from 'react-bootstrap'
import polyverseLogo from '../components/polyverse.JPG'
import YouTubePlayer from '../components/YouTubePlayer'

const LandingContainer = () => {
    const userLogin = useSelector(state=> state.userLogin) //from the store's state
    const {loading, error, userInfo} = userLogin //destructre
    
    useEffect(() => {
        
        if(userInfo){
           console.log('user is logged')
        }
    }, [userInfo ])

    

  return (
 <div className='callToAction' style={{marginTop:'1rem'}}>

  
        <Row style={{display:'flex', justifyContent:'center' ,opacity:'0.8'}} >
            <Col>
                <Card className='m-3 p-3  rounded'  style={{ minWidth:'20rem',textAlign:'center'}}>
                    <Card.Body >
                            <Card.Text style={{opacity:'1'}} >
                                <h1>We are <Image  src={polyverseLogo} variant='top' alt='company-name' fluid/></h1>
                                <p> We make mind blowing plugins ! </p>
                               <p> Join our community of more than 1500 artists and producers.</p>
                               <p>Don't forget to share your art and skills.</p>
                               <Link to= { userInfo ? `/`: '/register' }>
                                    <Button style={{color:'white',fontSize:'medium', background:'radial-gradient(circle, rgba(185,65,198,1) 87%, rgba(37,38,97,1) 100%)',border: 'none', width:'8rem' }}fluid>Join</Button>
                               </Link>
                            </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="videoColumn" >
                {/**style={{overflow:'scroll',overflowX:'hidden', height:'400px'}}*/}
              <YouTubePlayer width='500' videoLink={"https://www.youtube.com/embed/Qx30XXsrTXk" } />
              <YouTubePlayer width='500' videoLink={"https://www.youtube.com/embed/pkpGKAVbpAs"  } />
              <YouTubePlayer width='500' videoLink={"https://www.youtube.com/embed/-YI9UJsx0vo"  } />
            </Col>
        </Row>
    
  
</div>
    
  )
}
export default LandingContainer