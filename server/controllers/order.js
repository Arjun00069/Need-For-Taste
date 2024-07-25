import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../modles/order.js";
import { Payment } from "../modles/Payment.js";

import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import {createHmac} from "crypto"





export const placeOrder = asyncError(async (req,res,next)=>{
   
   const  {
  
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  
   } =req.body;
  
    const user=req.user._id; // for now it is converted to string
   const orderOptions={
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingCharges,
      totalAmount,
      user
   }
   await Order.create(orderOptions)
   res.status(201).json({
      success:true,
      message:"Order Place succefully via cash On Delivery"
   })
  })

  export const placeOrderOnline = asyncError(async (req,res,next)=>{
   
   const  {
  
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingCharges,
      totalAmount,
    
     } =req.body;
    
      const user=req.user._id; // for now it is converted to string
     const orderOptions={
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
     }
   
   var options = {
      amount: Number(totalAmount)*100,  
      currency: "INR",
    }
  const order=  await instance.orders.create(options)

     await Order.create(orderOptions)

   res.status(201).json({
      success:true,
      order,
      orderOptions 
   })
  })
    export const paymentVerification = asyncError(async(req,res,next)=>{
      const{
         razerpay_order_id,
        razerpay_Paymetn_id,
        razerpay_signature,
      orderoptions
   } = req.body

   const body = razerpay_order_id+ "|"+ razerpay_Paymetn_id;
   const expectedSignature = createHmac("sha256",process.env.RAZORPAY_API_SECRET)
   .update(body)
   .digest("hex");
   const isAuthentic = expectedSignature === razerpay_signature;
 
    if(isAuthentic){
      const payment = await Payment.create({
         razerpay_order_id,
        razerpay_Paymetn_id,
        razerpay_signature,
      //   createdAt
      });
       
  
      
    
      await Order.create({
         ...orderoptions,
     
         paidAt:new Date(Date.now()),
         paymentInfo: payment._id
      })
      
      res.status(201).json({
         success:true,
         message:`Order Placed Successfully. Payment Id: ${payment._id}`
      })
    }
    else{
      return next(new ErrorHandler("payment Failed",400))
    }


    })
  export const getMyorders = asyncError(async(req,res,next)=>{
   const orders = await Order.find({
      user:req.user._id
   }).populate("user","name")
   res.status(200).json({
      success:true,
       orders
   })
  })

  export const getOrderDetails =asyncError(async(req,res,next)=>{
   const order =await Order.findById(req.params.id).populate("user","name");
   if(!order) return(new ErrorHandler("Invalid order Id",404));
   res.status(200).json({
      success:true,
      order
   })
  })

  export const getAdminorders = asyncError(async(req,res,next)=>{
   const orders = await Order.find({
      user:req.user._id
   }).populate("user","name")
   res.status(200).json({
      success:true,
       orders
   })
  })
  export const processorder = asyncError(async(req,res,next)=>{
   const order =await Order.findById(req.params.id).populate("user","name");
   if(!order) return(new ErrorHandler("Invalid order Id",404));
   if(order.orderStatus==="Preparing") order.orderStatus= "Shipped"
   else if (order.orderStatus==="Shipped"){ order.orderStatus="Delivered"
   order.deliveredAt= new Date(Date.now());
}
else if(order.orderStatus==="Delivered") return next(new ErrorHandler("Food already delivered",400))
    await order.save();
   res.status(200).json({
      success:true,
       message:"Status update successfully", 
   })
  })


  