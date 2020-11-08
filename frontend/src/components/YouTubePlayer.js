import React from 'react'
import Draggable from 'react-draggable'
import { Resizable, ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

const YouTubePlayer = ({ videoLink }) => {
  return (
    <Draggable handle='.handle'>
      <div
        className='youtube-player'
        style={{ zIndex: 1, paddingBottom: '5%' }}
      >
        <ResizableBox width={300} height={200}>
        
          {/*snippit from youtube api*/}
          <iframe
            title='iframe'
            id='player'
            type='text/html'
            style={{
              width: '100%',
              height: '100%',
            }}
            src={videoLink}
            frameborder='0'
          > 
          </iframe>
          <div className='expand'>
               
              Size
            </div>

         
            <div className='handle'>
              <i className='fas fa-arrows-alt'></i>
              <h6>Drag</h6>
            </div>

             
         
          {/* <div className='expand'>
               <i className='fas fa-expand-alt'></i> 
              <h6>Size</h6>
            </div>  */}
        </ResizableBox>
      </div>
    </Draggable>
  )
}

export default YouTubePlayer
