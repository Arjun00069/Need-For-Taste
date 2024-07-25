import React from 'react'
import Menucard from './Menucard';
import k from "../../assets/burger1.webp"
import k1 from "../../assets/burger1.webp"
import k2 from "../../assets/burger1.webp"
import {useDispatch} from "react-redux"
import toast from "react-hot-toast"
export default function Menu() {
    const dispatch =  useDispatch();
    const addToCartHandler=(itemNum)=>{
      switch(itemNum){
        case 1:
        dispatch({
          type:"cheeseBurgerIncrement"
        
        });
        dispatch({type:"calculatePrice"})
        toast.success("Added to Cart");
        break;
        case 2:
          dispatch({type:"vegcheeseBurgerIncrement"})
          dispatch({type:"calculatePrice"})
          toast.success("Added to Cart");
          break;
          case 3:
            dispatch({type:"burgerwithFriesIncrement"})
            dispatch({type:"calculatePrice"})
            toast.success("Added to Cart");
            break;
            default:
              dispatch({
                type:"cheeseBurgerIncrement"
              
              });
              dispatch({type:"calculatePrice"})
              toast.success("Added to Cart");
              break;
      }
     
    }
  return (
  <section id="Menu">
    <h1>MENU</h1>
    <div>
        <Menucard itemNum={1}
         burgerSrc={k} 
        price={200}
        title ="Chose Burger"
        handler={addToCartHandler}
        delay={0.1}
        />
        <Menucard itemNum={2}
         burgerSrc={k1} 
        price={200}
        title ="BUrger with fries"
        handler={addToCartHandler}
        delay={0.5}
        />
        <Menucard itemNum={3}
         burgerSrc={k2} 
        price={200}
        title ="Cheese burger"
        handler={addToCartHandler}
        delay={0.8}
        />
    </div>
  </section>
  );
}
