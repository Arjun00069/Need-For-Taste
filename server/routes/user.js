import express, { Router } from "express";
import passport from "passport";
import { logout, myprofile ,getAdminUsers, getAdminStats} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { placeOrder } from "../controllers/order.js";

const router= express.Router();


router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: 'http://localhost:3000',
  })
);
  router.get("/me", isAuthenticated,myprofile)

  router.get("/logout",logout);

  //Admin route

  router.get("/admin/user",isAuthenticated,authorizeAdmin,getAdminUsers)
  router.get("/admin/status",isAuthenticated,authorizeAdmin,getAdminStats)



export default router;