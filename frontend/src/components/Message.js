import React from 'react'
import {Alert}  from 'react-bootstrap'


const Message = ({variant, children}) => { //varient and children are set as props.
    return (
        <Alert varient={variant}>
            {children}
        </Alert>
    )
}
Message.defaultProps = { variant: 'dark'} //set default prop

export default Message
