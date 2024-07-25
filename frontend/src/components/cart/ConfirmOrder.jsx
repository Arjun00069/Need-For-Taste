import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { createOrder, paymentVerification } from '../../redux/actions/order';
import toast  from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store';

const ConfirmOrder = () => {
    const {
        cartItems,
        subTotal,
        tax,
        shippingCharges,
        total,
        shippingInfo

    } =useSelector(state=>state.cart)
    const {message,error}=useSelector(state=>state.order)
    const dispatch =useDispatch();
    const navigate =useNavigate();
    const [paymentMethod,setPaymentMethod] =useState("")
    const [disableBtn,setDisableBtn]=useState(false);


    const submitHandler = async (e)=>{
        e.preventDefault();
        setDisableBtn(true);
        if(paymentMethod==="COD"){
          dispatch(createOrder(shippingInfo,cartItems,paymentMethod,subTotal,tax,shippingCharges,total))
         
          
        }else{
            const {
                data: { order, orderOptions },
              } = await axios.post(
                `${server}/createorderonline`,
                {
                  shippingInfo,
                  orderItems: cartItems,
                  paymentMethod,
                  itemsPrice: subTotal,
                  taxPrice: tax,
                  shippingCharges,
                  totalAmount: total,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              );



          
var options = {
    Key:"rzp_test_i7mXdOMWLRlhWh" , // Enter the Key ID generated from the Dashboard
    amount:order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}= response
        dispatch(paymentVerification(razorpay_payment_id,razorpay_order_id,razorpay_signature,orderOptions))
    },
    
    theme: {
        color: "#9c003c"
    }
};
const  razorpay = new window.Razorpay(options);
     razorpay.open()

        }
    }
    useEffect(()=>{
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        dispatch({type:"emptyState"})
        navigate("/paymentsuccess")
      }
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
        setDisableBtn(false)
      }
    },[dispatch,message,navigate,error])
  return (
   <section className="confirmOrder">
    <main>
        <h1>Confirm Order</h1>
        <form onSubmit={submitHandler}>
            <div>
                <label>Cash On Delivery</label>
                <input type="radio" name="payment" onChange={()=>setPaymentMethod("COD")} required />
            </div>
            <div>
                <label>Online</label>
                <input  required type="radio" name="payment" onChange={()=>setPaymentMethod("Online")}/>
            </div>
            <button type='sbmit'>Place Order</button>
        </form>
    </main>


   </section>
  )
}

export default ConfirmOrder
