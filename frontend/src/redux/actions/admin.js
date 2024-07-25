import axios from "axios";
import { server } from "../store";




export const getAdminStats =(id)=>async (dispatch)=>{
    try{
       dispatch({type:"getDashboardstatsRequest"})
      //  console.log(id);
        const {data} = await axios.get(`${server}/admin/status`,{
          withCredentials:true
        })
        // console.log(data);
       dispatch({type:"getDashboardstatsSuccess",
       payload:data
      })
    }catch(error){
    
      dispatch({type:"getDashboardstatsFail",
    payload:error})
  
  
    }
  
  }
  export const getAdminUsers =(id)=>async (dispatch)=>{
    try{
       dispatch({type:"getAdminUsersRequest"})
      //  console.log(id);
        const {data} = await axios.get(`${server}/admin/user`,{
          withCredentials:true
        })
        // console.log(data);
       dispatch({type:"getAdminUsersSuccess",
       payload:data.user
      })
    }catch(error){
    
      dispatch({type:"getAdminUsersFail",
    payload:error})
  
  
    }
  
  }
  export const getAdminOrders =(id)=>async (dispatch)=>{
    try{
        dispatch({type:"getAdminOrdersRequest"})
       //  console.log(id);
         const {data} = await axios.get(`${server}/admin/orders`,{
           withCredentials:true
         })
         // console.log(data);
        dispatch({type:"getAdminOrdersSuccess",
        payload:data.orders
       })
     }catch(error){
     
       dispatch({type:"getAdminOrdersFail",
     payload:error})
   
   
     }
  
  }


  export const processOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: "processOrderRequest" });
  
      const { data } = await axios.get(`${server}/admin/order/${id}`, {
        withCredentials: true,
      });
  
      dispatch({ type: "processOrderSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "processOrderFail",
        payload: error.response.data.message,
      });
    }
  };