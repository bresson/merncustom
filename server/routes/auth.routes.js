import express from "express";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

/**
 * authenticate the user with email and password
 * 
 **/
 
router.route("/auth/signin")
    .post(authCtrl.signin);
  
/**
 * GET request to clear the cookie containing a JWT 
 * that was set on the response object after sign-in
 * 
 **/ 
router.route("/auth/signout")
    .post(authCtrl.signout);
    
    
export default router;
