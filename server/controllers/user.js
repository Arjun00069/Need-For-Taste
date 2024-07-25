
// import orders from "razorpay/dist/types/orders.js"
import {asyncError} from "../middlewares/errorMiddleware.js"
import { User } from "../modles/User.js"
import { Order } from "../modles/order.js"


export const myprofile=(req,res,next)=>{

   res.status(200).json({
    success:true,
    user:req.user
   })
}


export const logout = asyncError((req,res,next)=>{
  
   req.session.destroy((err)=>{
     if(err) return next(err);
     res.clearCookie("connect.sid",{
      secure:process.env.NODE_ENV=== "development"?false:true,
      httpOnly:process.env.NODE_ENV=== "development"?false:true,
      sameSite:process.env.NODE_ENV=== "development"?false:"none",
     }
     )
     res.status(200).json({
      message:"Loggedout",
     })
   })
}
)
export const getAdminUsers = asyncError(async(req,res,next)=>{
   const user =await User.find({});
   res.status(200).json({
      success:true,
      user
   })
})
export const getAdminStats = asyncError(async(req,res,next)=>{



   const userCount =await User.countDocuments();

   const orders=await Order.find({})
   const preparingOrders =orders.filter((i)=>i.orderStatus==="Preparing")
   const shippedorders =orders.filter((i)=>i.orderStatus==="Shipped")
   const deliveredOrders =orders.filter((i)=>i.orderStatus==="Delivered")
   let totalIncome= 0;
   orders.forEach(i=>{
      totalIncome+=i.totalAmount;
   }) 

   res.status(200).json({
      success:true,
      userCount,
      ordersCount:{
         total:orders.length,
         preparing: preparingOrders.length,
         shipped:shippedorders.length,
         delivered:deliveredOrders.length
      },
      totalIncome,
   })
})