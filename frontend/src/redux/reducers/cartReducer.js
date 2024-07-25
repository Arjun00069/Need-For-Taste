import { createReducer } from "@reduxjs/toolkit";
const initialstate={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):{
        cheeseBurger:{
            quantity:0,
            price:200,
        },
        vegCheeseBurger:{
            quantity:0,
            price:500,
        }
        ,
        BurgerWithFries:{
            quantity:0,
            price:1800,
        }
    },
subTotal:localStorage.getItem("cartPrices")?JSON.parse(localStorage.getItem("cartPrices")).subTotal:0,
tax:localStorage.getItem("cartPrices")?JSON.parse(localStorage.getItem("cartPrices")).tax:0,
shippingCharges:localStorage.getItem("cartPrices")?JSON.parse(localStorage.getItem("cartPrices")).shippingCharges:0,
total:localStorage.getItem("cartPrices")?JSON.parse(localStorage.getItem("cartPrices")).total:0,
shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
};

export const cartReducer= createReducer(initialstate,{
    cheeseBurgerIncrement:(state)=>{
        state.cartItems.cheeseBurger.quantity+=1;
    },
    vegcheeseBurgerIncrement:(state)=>{
        state.cartItems.vegCheeseBurger.quantity+=1;
    }
    ,
    burgerwithFriesIncrement:(state)=>{
        state.cartItems.BurgerWithFries.quantity+=1;
    },

    cheeseBurgerDecrement:(state)=>{
        state.cartItems.cheeseBurger.quantity-=1;
    },
    vegcheeseBurgerDecrement:(state)=>{
        state.cartItems.vegCheeseBurger.quantity-=1;
    }
    ,
    burgerwithFriesDecrement:(state)=>{
        state.cartItems.BurgerWithFries.quantity-=1;
    }
,
    calculatePrice:(state)=>{
    state.subTotal =
    state.cartItems.cheeseBurger.price*state.cartItems.cheeseBurger.quantity+
    state.cartItems.vegCheeseBurger.price*state.cartItems.vegCheeseBurger.quantity+
    state.cartItems.BurgerWithFries.price*state.cartItems.BurgerWithFries.quantity;
    state.tax=state.subTotal*0.18;
    state.shippingCharges =state.subTotal>1000?0:200;
    state.total=state.subTotal+state.tax+state.shippingCharges
    },
   emptyState :(state)=>{
        state.cartItems={
                cheeseBurger:{
                    quantity:0,
                    price:200,
                },
                vegCheeseBurger:{
                    quantity:0,
                    price:500,
                }
                ,
                burgerWithFries:{
                    quantity:0,
                    price:1800,
                }
        }
        state.subTotal=0;
        state.tax=0;
      state.shippingCharges=0;
     state.total=0;


    },
    addShippingInfo:(state,action)=>{
        state.shippingInfo={
            hNo:action.payload.hNo,
            city:action.payload.city,
            state:action.payload.state,
            country:action.payload.country,
            phoneNo:action.payload.phoneNo,
            pinCode:action.payload.pinCode,

    }
    }
})

