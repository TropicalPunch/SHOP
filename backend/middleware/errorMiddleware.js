
import colors from 'colors'

// 404 error creator:
const notFoundError = (req, res, next)=>{ //no specified rout meaning all server requests will pass through this code! if the code above was not resolved
    console.log('404 middleware on') 
    const error = new Error(`Not Found ${req.originalUrl}`) //req.originalUrl=> is the url the user entered
    res.status(404)
    next(error)
    
    }
  
  
  //error handling middleware:
  const allErrorsHandler =(err, req, res, next)=>{ //no specified rout meaning all server requests will pass through this code!was not resolved
    //err- catches errors thrown from anyware in our server or errors from the DB
    console.log('error middleware on') 
    //sometimes even errors could have a statuscode of 200 so we need to change them to the 500 server error relm
    //if it's not 200 it will still have it's status code.
    const ststusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(ststusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, //the stack of the error object is it's explanation (we will show it only in dev)
    })
    next()
    
    }

    export{notFoundError, allErrorsHandler}