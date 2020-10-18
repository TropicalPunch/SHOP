import mongoose from 'mongoose';
import colors from 'colors';

const connectDB =  async ()=>{
    

    try{
        //must add in order to not get any error masseges:
        const conn = await mongoose.connect( process.env.MONGO_URI , {
           
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `.underline.blue)
    }catch(error){
       console.log
        console.error(`Error: ${error} `.underline.red.bold)
        process.exit(1) //passing 1 - will exit the proccess with error
    }


}

export default connectDB