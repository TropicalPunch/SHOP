import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation= 'border' role='status' style={{width: '100px', margin: 'auto', height:'100px', display:'block' }}>
            <span className='sr-only'>Loading Products...</span>
        </Spinner>
    )
}

export default Loader


