import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from "./components/home/Home"
import Header from "./components/layout/Header"
import Footer from "./components/layout/foooter"
import Contact from "./components/contact/Contact"
import Cart from "./components/cart/Cart"
import Shipping from "./components/cart/Shipping"
import ConfirmOrder from "./components/cart/ConfirmOrder"
import PaymentSuccess from "./components/cart/PaymetnSuccess"
import Login from "./components/login/Login"
import Profile from "./components/profile/Profile"
import MyOrders from "./components/myOrders/MyOrders"
import OrderDetails from "./components/myOrders/OrderDetails"
import Dashboard from "./components/admin/Dashboard"
import Orders from "./components/admin/Order"
import About from "./components/about/About"
import NotFound from "./components/layout/Notfound"



import "./styles/app.scss"
import "./styles/header.scss"
import "./styles/home.scss"
import "./styles/founder.scss"
import "./styles/menu.scss"
import "./styles/footer.scss"
import "./styles/Contact.scss"
import "./styles/Cart.scss"
import "./styles/Shipping.scss"
import "./styles/confirmorder.scss"
import "./styles/PaymetnSuccess.scss"
import "./styles/login.scss"
import "./styles/profile.scss"
import "./styles/table.scss"
import "./styles/orderDetails.scss"
import "./styles/dashboard.scss"
import "./styles/about.scss"
import { useDispatch ,useSelector} from "react-redux"
import { useEffect } from "react"
import { loadUser } from "./redux/actions/user"
import {ProtectedRoute} from "protected-route-react"
import toast ,{Toaster} from "react-hot-toast"
import Users from "./components/admin/Users"










function App() {
  
  const dispatch =useDispatch()
  const {error ,message ,isAuthenticated,user}= useSelector((state)=>state.auth)
  useEffect(()=>{
   
     dispatch(loadUser())
  },[dispatch])


  useEffect(()=>{
    console.log('mounted2')
if(error){
  toast.error(error);
  dispatch({
    type:"clearError"
  })
}
if(message){
  toast.success(message);
  dispatch({
    type:"clearMessage"
  })
}
  },[dispatch,error,message])
  return(<Router>
    <Header isAuthenticated={isAuthenticated}/>
         <Routes>
    
         <Route path="/" element={<Home/>}/>
         <Route path="/contact" element={<Contact />}/>
         <Route path="/aboutus" element={<About />} />
         <Route path="/cart" element={<Cart />}/>
         <Route path="/paymentsuccess" element={<PaymentSuccess />}/>

         <Route path="/login" element={
         <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me" >
          <Login/>
         </ProtectedRoute>}/>

         <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
         <Route path="/me" element={<Profile/>}/>
         <Route path="/shipping" element={<Shipping />}/>
         <Route path="/confirmorder" element={<ConfirmOrder />}/>
         <Route path="/myorders" element={<MyOrders/>}/>
         <Route path="/order/:id" element={<OrderDetails/>}/>
       </Route>
      
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}
      redirectAdmin="/me"
      isAdmin={user&&user.role==='admin'}
      />}>
     
         <Route path="/admin/dashboard" element={<Dashboard />} />
         <Route path="/admin/users" element={<Users />} />

         
         <Route path="/admin/orders" element={<Orders />} />
     

      </Route>
        
         
      








         <Route path="*" element={<NotFound />} />

         </Routes>
     <Footer/>
    <Toaster/>
  </Router>);
}

export default App;
 