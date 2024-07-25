import React from 'react'
import {Country,State} from "country-state-city"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
const Shipping = () => {

     
const {shippingInfo} =useSelector(state=>state.cart)




    const navigate =useNavigate()

   const [hNo,setHNO] =useState(shippingInfo.hNo)
   const [city,setCity] =useState(shippingInfo.city)
   const [country,setCountry] =useState(shippingInfo.contry)
   const [state,setState] =useState(shippingInfo.state)
   const [phoneNo,setPhoneNo] =useState(shippingInfo.phoneNo)
   const [pinCode,setPinCode] =useState(shippingInfo.pinCode)
   const dispatch =useDispatch();
const submitHandler =(e)=>{
    e.preventDefault();
    dispatch({
      type: "addShippingInfo",
      payload: {
        hNo,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      },
    });

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        hNo,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/confirmorder");
}


  return (
   <section className='shipping'>
    <main>
        <h1>Shipping Details</h1>
        <form onSubmit={submitHandler} >
             <div>
            <label >H.NO.</label>
            <input type="text" name="" id=""  placeholder='Enter House No.' value={hNo} onChange={(e)=>{setHNO(e.target.value)}}
            required/>
            </div>
            <div>
            <label >City</label>
            <input type="text" name="" id=""  placeholder='Enter City'
            value={city} onChange={(e)=>{setCity(e.target.value)}}
            required
            />
            </div>
            
            <div>
            <label >Country</label>
           
            <select 
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            required
            >
                <option value="">Country</option>
                {
                    Country && Country.getAllCountries().map(i=>(//in curly bracket we have to return so we use only paranthesis
                       <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                    ))
                }
            </select>
            </div>
             {country &&(  <div>
            <label >State</label>
        <select
             value={state}
             onChange={(e)=>setState(e.target.value)}
             required
            >
                <option value="">State</option>
                {
                    State && State.getStatesOfCountry(country).map(i=>(
                        <option value={i.isoCode} key={i.isoCode}>{i.name}</option>
                    ))
                }
            </select>
           
            </div>)}
            <div>
            <label >Pin Code</label>
            <input type="text" name="" id=""  placeholder='Enter Pincode'
            value={pinCode}
            onChange={(e)=>setPinCode(e.target.value)}
            required
            />
            </div>
            <div>
            <label >Phone No.</label>
            <input type="number" name="" id=""  placeholder='Enter Phone number' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
            </div>
           <button type='submit' > Confirm Order</button>
            </form>
    </main>
   </section>
  )
}

export default Shipping
