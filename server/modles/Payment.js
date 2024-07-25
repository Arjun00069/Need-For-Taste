import mongoose from "mongoose";

const schema =new mongoose.Schema({

    razerpay_order_id:{
        type:String,
        requird:true
    },
    razerpay_Paymetn_id:{
        type:String,
        requird:true
    },
    razerpay_signature:{
        type:String,
        requird:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Payment = mongoose.model("Payment",schema);