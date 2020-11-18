import React from 'react'
import {Alert}  from 'react-bootstrap'


const Message = ({variant, children}) => { //varient and children are set as props.
    return (
        <Alert variant={variant} className="d-flex justify-content-center" >
           <h3>{children}</h3> 
        </Alert>
    )
}
Message.defaultProps = { variant: 'danger'} //set default prop

export default Message
