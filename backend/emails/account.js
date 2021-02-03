//this is the sendGrid email automatic responder setup
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
  // create reusable transporter object using the default SMTP transport
  //in order to use gmail you must turn on the "less secure app access" in google:
  //myaccount.google.com/lessscureapps

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.GMAIL_AU, // generated ethereal password
    },
  });

  // send mail with defined transport object


  
const onRegisterEmail = (email, name)=>{
      
    let mailOptions = {
        from: process.env.GMAIL, // sender address
        to: email, // list of receivers
        subject: `Thanks for joining us!`, // Subject line
        text: `Hi ${name}, great to have you with us!
        we have more products and exiting news comming soon.
        stay tuned.
        POLYVERSE`, // plain text body
        html: `<b>Hi ${name}, great to have you with us!
        we have more products and exiting news comming soon.
        stay tuned.</b>
        <h2> POLYVERSE.</h2>`, // html body
      };

      transporter.sendMail(mailOptions, function(err, data){
          if(err){
              console.log(err)
          }else{
              console.log('email sent')
          }
      })
}


  
const onContactUsEmail = (email, name)=>{
      
    let mailOptions = {
        from: process.env.GMAIL, // sender address
        to: email, // list of receivers
        subject: `Thanks for Contacting us!`, // Subject line
        text: `Hi ${name}, great to hear from you!
        oure support team is currently reviewing your message and will
        contact you as soon as possible.`, // plain text body
        html: `<b>
        Hi ${name}, great to hear from you!
        our support team is currently reviewing your message and will
        contact you as soon as possible.
        </b>
        <b> POLYVERSE.</b>`, // html body
      };

      transporter.sendMail(mailOptions, function(err, data){
          if(err){
              console.log(err)
          }else{
              console.log('email sent')
          }
      })
}

const notifySupportEmail = (email, name, title, message)=>{
      
    let mailOptions = {
        from: process.env.GMAIL, // sender address
        to: process.env.GMAIL, // list of receivers
        subject: title, // Subject line
        text: message, // plain text body
        html: `<b>${message}</b>
        <b> from ${email}, by: ${name}</b>`, // html body
      };

      transporter.sendMail(mailOptions, function(err, data){
          if(err){
              console.log(err)
          }else{
              console.log('email sent')
          }
      })
}

export{onContactUsEmail, onRegisterEmail, notifySupportEmail}