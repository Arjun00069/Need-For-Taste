import React from 'react'
import {motion} from "framer-motion"
import {Link} from "react-router-dom"
import {MdDashboard} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/user'
import Loader from '../layout/Loader'
const Profile = () => {
    const {loading,user} =useSelector(state=>state.auth)
    const dispatch=useDispatch();
   const logoutHandler=()=>{
    dispatch(logout())
   }
  return (
   <section className='profile'>
    {
        loading===false ?<main>
        <motion.img src={user.photo}  initial={{
        y:"-100vh"
        ,opacity:0
    }}
    animate={{
        y:0
        ,opacity:1
    }} alt="usr"/>
       <motion.h5  initial={{
        y:"-100vh",opacity:0
    }}
    animate={{
        y:0
        ,opacity:1
    }}transition={{delay:0.3}}
       >
       Arjun
       </motion.h5>
      {user.role==='admin'&&<motion.div  
       initial={{
        y:"-100vh",opacity:0
    }}
    animate={{
        y:0
        ,opacity:1
    }}
       
       transition={{delay:0.3}}>
        <Link to="/admin/dashboard" style={{borderRadius:0,
            backgroundColor:"rgb(40,40,40)"
            }}>  <MdDashboard/> Dashboard</Link>
       </motion.div>
}

       <motion.div  
       intial={{
        x:"-100%",
        opacity:0,
       }}
       animate={{
        x:0,
        opacity:1
       }}
       transition={{delay:0.5}}>
        <Link to="/myorders">Orders</Link>
       </motion.div>
        <motion.button
        intial={{
            x:"-100vh",
            opacity:0,
           }}
           animate={{
            x:0,
            opacity:1
           }}
           transition={{delay:0.3}}
           onClick={logoutHandler}
           >
       Logout
        </motion.button>
    </main>: <Loader/>
    }
   </section>
  )
}

export default Profile

