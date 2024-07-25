import React from 'react'
import k from "../../assets/burger1.webp"
import k1 from "../../assets/burger1.webp"
import k2 from "../../assets/burger1.webp"
import {Link} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const CartItem =({value,title,img,increment,decrement})=>( // WHile making component here we have to use simple braces insted of curly braces
    <div className='cartItem'>
        <div>
            <h4>{title}</h4>
         <img src={img} alt="Item" />
         
        </div>
        <div>
            <button onClick={decrement}>-</button>
            <input type="number" readOnly value={value} />
            <button onClick={increment}>+</button>

        </div>
    </div>
);
const Cart = () => {
  // const cheeseBurgerr =cartItems.cheeseBurger.quantity  niche wala deserilization ka matlab
  const {cartItems:{
    cheeseBurger:{
      quantity:cheeseBurger
    },
    vegCheeseBurger:{ quantity:vegCheeseBurger},
    BurgerWithFries:{ quantity:BurgerWithFries}
  },subTotal,
  tax,
  shippingCharges,
  total,
} =useSelector(state=>state.cart)

const {cartItems:orderItems}=useSelector(state=>state.cart)
       const dispatch =useDispatch();
    const incrment =(item)=>{
    switch (item) {
      case 1:
        dispatch({type:"cheeseBurgerIncrement"})
        dispatch({type:"calculatePrice"})
        break;
      case 2:
        dispatch({type:"vegcheeseBurgerIncrement"})
        dispatch({type:"calculatePrice"})
        break;
        case 3:
        dispatch({type:"burgerwithFriesIncrement"})
        dispatch({type:"calculatePrice"})
        break;
    
      default:
        dispatch({type:"cheeseBurgerIncrement"})
        dispatch({type:"calculatePrice"})
        break;
    }
    };
    const decrement =(item)=>{
      switch (item) {
        case 1:
          if(cheeseBurger===0) break;
          dispatch({type:"cheeseBurgerDecrement"})
          dispatch({type:"calculatePrice"})
          break;
        case 2:
          if(vegCheeseBurger===0) break;
          dispatch({type:"vegcheeseBurgerDecrement"})
          dispatch({type:"calculatePrice"})
          break;
          case 3:
            if(BurgerWithFries===0) break;
          dispatch({type:"burgerwithFriesDecrement"})
          dispatch({type:"calculatePrice"})
          break;
      
        default:
          if(cheeseBurger===0) break;
          dispatch({type:"cheeseBurgerDecrement"})
          dispatch({type:"calculatePrice"})
          break;
      }
    };
    useEffect(()=>{
      localStorage.setItem("cartItems",JSON.stringify(orderItems))
      localStorage.setItem("cartPrices",JSON.stringify({
        subTotal,
        tax,
        shippingCharges,
        total}))

    },[orderItems, subTotal,
      tax,
      shippingCharges,
      total])
  return (
    <section className="cart">
     
        <main>
     <CartItem title={"Cheese Burger"} 
     img={k}
     value={cheeseBurger}
increment={()=>incrment(1)}
decrement={()=>decrement(1)}
     />
     <CartItem title={"Veg Cheese Burger"} 
     img={k1}
     value={vegCheeseBurger}
increment={()=>incrment(2)}
decrement={()=>decrement(2)}
     />
     <CartItem title={"Burger Fries"} 
     img={k2}
     value={BurgerWithFries}
increment={()=>incrment(3)}
decrement={()=>decrement(3)}
     />
      <article>
        <div>
            <h4>Sub Total</h4>
            <p>₹{subTotal}</p>
            </div>
            <div>
            <h4>Tax</h4>
            <p>{tax}</p>
            </div>
            <div>
            <h4>Shipping Charge</h4>
            <p>₹{shippingCharges}</p>
            </div>
            <div>
            <h4>Total</h4>
            <p>₹{total}</p>
            </div>
            <Link to="/shipping">Checkout</Link>
      
      </article>
        </main>
    </section>
  );
};

export default Cart
