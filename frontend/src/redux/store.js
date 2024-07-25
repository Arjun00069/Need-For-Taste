import {configureStore} from "@reduxjs/toolkit"
import { orderReducer, ordersReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/userReducer";
import { adminReducer } from "./reducers/adminReducer";

const store= configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        order:orderReducer,
         orders:ordersReducer,
         admin:adminReducer
    }
})
export default store;


export const server = "http://localhost:4000/api/v1";