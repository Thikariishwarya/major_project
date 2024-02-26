const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js")


//user signupform render route and signup

router.route("/signup")
.get(userController.renderSignupForm)
.post( wrapAsync(userController.signup));




//user loginform render route and login

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
wrapAsync(userController.login))


//user logout
router.get("/logout",userController.logout)
module.exports=router;