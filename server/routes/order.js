import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAdminorders, getMyorders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processorder} from "../controllers/order.js"
const router =express.Router();

router.post("/createorder",placeOrder);
router.post("/createorderonline",isAuthenticated,placeOrderOnline)
router.post("/paymentverification", isAuthenticated,paymentVerification)



router.get("/myorder",isAuthenticated,getMyorders)
router.get("/order/:id",isAuthenticated,getOrderDetails)
// Add admin middlare  to autharise admin
router.get("/admin/orders",isAuthenticated,authorizeAdmin,getAdminorders)

router.get("/admin/order/:id",isAuthenticated,authorizeAdmin,processorder)


export default router;