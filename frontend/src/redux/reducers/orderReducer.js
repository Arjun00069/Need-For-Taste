import { createReducer } from "@reduxjs/toolkit";




export const orderReducer = createReducer({},{
    createOrderRequest:(state)=>{
        state.loading=true;
    },
    createOrderSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    createOrderFail:(state,action)=>{
        state.loading=true;
        state.error =action.payload
    },
    paymentVerificationRequest:(state)=>{
        state.loading=true;
    },
    paymentVerificationSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    paymentVerificationFail:(state,action)=>{
        state.loading=true;
        state.error =action.payload
    },
    clearMessage:(state)=>{
        state.message=null
    },
    clearError:(state)=>{
        state.error=null
    }
})
export const ordersReducer =createReducer({orders:[]},{
    getMyOrdersRequest:(state)=>{
        state.loading=true;
    },
    getMyOrdersSuccess:(state,action)=>{
        state.loading=false;
        state.orders=action.payload
    },
    getMyOrdersFail:(state,action)=>{
        state.loading=true;
        state.error=action.payload
    },
    getOrdersDetailsRequest:(state)=>{
        state.loading=true;
    },
    getOrdersDetailsSuccess:(state,action)=>{
        state.loading=false;
        state.order=action.payload
    },
    getOrdersDetailsFail:(state,action)=>{
        state.loading=true;
        state.error=action.payload
    },


})