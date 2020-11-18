import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormContainer = ({children}) => { //we destructure from props the children object
    return (
        <Container>
            <Row clasName='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
