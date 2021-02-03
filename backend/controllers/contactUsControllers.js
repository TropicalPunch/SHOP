import ContactUs from '../models/contactUsModel.js'//you need to do contact model
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch
import {onContactUsEmail, notifySupportEmail} from '../emails/account.js' 
//upload a contact us ticket to the DB
const createContactUsRecord =  asyncErrorhandler( async (req, res) => {
    //lets create the new product object with dummy data!
    const {
        email, 
        name, 
        title, 
        message
    } = req.body 

    const contactTicket = new ContactUs({
        ticketClosed:false,
        email, 
        name, 
        title, 
        message
      })
  
     const contactTicketCreated = await contactTicket.save()
     //now handle the email automatic response
     notifySupportEmail(contactTicketCreated.email, contactTicketCreated.name,contactTicketCreated.title, contactTicketCreated.message)
     onContactUsEmail(contactTicketCreated.email, contactTicketCreated.name)
     res.status(201).json(contactTicketCreated)
  })
  
//get all connact us - to admin screen!
const getAllContactUsRecords = asyncErrorhandler(async (req,res)=>{
 
    const allContactUsRecords = await ContactUs.find({}) //get all contactUs tickets 
     //limit and skip are part of the pagination- they give us the right amount of products for each page! and the right products!
    // throw new Error('throw error at will for fun:)')
    res.json({allContactUsRecords}) //.json will sent the data as a JSON format! sowhen fatching it we will nedd to JSON.parse() (it is an array of objects.)
   //after pagination is implement we must also send in the response the current page and the amount of total pages
})


//get contact us by id

//delete contact us record-admin

//update contact us record-admin


export {createContactUsRecord, getAllContactUsRecords}