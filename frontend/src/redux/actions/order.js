import axios from "axios"
import {server} from "../store";


export const createOrder =(
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
    )=> async(dispatch)=>{
      
    try {
        dispatch({
          type: "createOrderRequest",
        });
       
      const {data}=await axios.post(`${server}/createorder`, {
        shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  },{
            headers:{
                "Content-Type":"application/json",
                
            },
            withCredentials: true
        },
    );
    
        dispatch({
          type: "createOrderSuccess",
          payload:data.message
        });
      } catch (error) {
          console.log(error);
        dispatch({
          type: "createOrderFail",
          payload: error.response.data.message,
        });
      }
}


export const paymentVerification =(
    razerpay_order_id,
    razerpay_Paymetn_id,
    razerpay_signature,
  orderoptions
    )=> async(dispatch)=>{
      
    try {
        dispatch({
          type: "paymentVerificationRequest",
        });
       
      const {data}=await axios.post(`${server}/paymentverificaton`, {
        razerpay_order_id,
        razerpay_Paymetn_id,
        razerpay_signature,
      orderoptions},{
            headers:{
                "Content-Type":"application/json",
                withCredentials: true
            }
        },
    );
    
        dispatch({
          type: "paymentVerificationSuccess",
          payload:data.message
        });
      } catch (error) {
          console.log(error);
        dispatch({
          type: "paymentVerificationFail",
          payload: error.response.data.message,
        });
      }
}




export const getMyOrders =()=>async (dispatch)=>{
  try{
     dispatch({type:"getMyOrdersRequest"})
      const {data} = await axios.get(`${server}/myorder`,{
        withCredentials:true
      })
     dispatch({type:"getMyOrdersSuccess",
     payload:data.orders
    })
  }catch(error){
  
    dispatch({type:" getMyOrdersFail",
  payload:error})


  }

}
export const getOrderDetails =(id)=>async (dispatch)=>{
  try{
     dispatch({type:"getOrdersDetailsRequest"})
    //  console.log(id);
      const {data} = await axios.get(`${server}/order/${id}`,{
        withCredentials:true
      })
      console.log(data);
     dispatch({type:"getOrdersDetailsSuccess",
     payload:data.order
    })
  }catch(error){
  
    dispatch({type:"getOrdersDetailsFail",
  payload:error})


  }

}