import app from "./app.js";
import {connectDB} from './config/database.js'
import Razorpay from 'razorpay'

connectDB();
app.get("/",(req,res,next)=>{
    res.send("<h1>Working</h1>")
})




export const  instance = new Razorpay({ 
    key_id: "rzp_test_i7mXdOMWLRlhWh", 
    key_secret:"05nonFgwKFJnrHRrq1mQjWaM"
})






app.listen(process.env.PORT,()=>{
    console.log(`Server is working PORT:${process.env.PORT}, In ${process.env.NODE_ENV} MODE`)
})
