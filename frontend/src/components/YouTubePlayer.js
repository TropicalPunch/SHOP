import React from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

const YouTubePlayer = ({ videoLink, width = 300 }) => {
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
            frameBorder='0'
          > 
          </iframe>
          {/* <div className='expand'>  
              Size
          </div>

            <div className='handle'>
              <i className='fas fa-arrows-alt'></i>
              <h6>Drag</h6>
            </div> */}
        </ResizableBox>
      </div>
    </Draggable>
  )
}

export default YouTubePlayer
