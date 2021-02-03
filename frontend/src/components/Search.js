import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const Search = ({history}) => { //passed as props from Header.js
    const[searchKeyword, setSerchKeyword ] = useState('')

    const SubmitHandler = (event)=> {
        console.log(`searching ${searchKeyword}`)
        event.preventDefault()
        if(searchKeyword.trim()){ //trim takes out spaces and other special characters
            history.push(`/search/${searchKeyword}`) //we create a rout in app.js!
        }else{
            history.push('/')
        }
    }

    return (
        
        <Form onSubmit={SubmitHandler} inline>
            <Form.Control
             type='text'
             name='q'
             onChange={(event)=> setSerchKeyword(event.target.value)}
             className='ml-sm-5'
             >
            </Form.Control>
                <Button
                type='submit'className='p-2' variant='light'
                >
                <i className="fas fa-search" style={{color: '#ac19dd',fontSize:'medium'}}></i>
                </Button>
        </Form>
          
    )
}

export default Search



