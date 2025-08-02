const express=require("express");
const  router=express.Router();  

const{handleUserSignup,handleUserLogin,handleUserLogout}=require("../controllers/User.js");

router.post("/signup",handleUserSignup);
router.post("/login",handleUserLogin);
router.post("/logout",handleUserLogout);

module.exports=router;