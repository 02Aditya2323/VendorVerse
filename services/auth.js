// service for verifying the jwt->getuser and setting/assigning the jwt during signup/login->setUser
const jwt=require("jsonwebtoken");
require('dotenv').config();   
const User=require("../models/User")
// stateless authentication
const secret=process.env.KEY;

const setUser=(user)=>{
    return jwt.sign({
        _id:user._id,   // question:is this correct; earlier we send _id:userid i.e the id which we get form user; but here we have to first berify the id and the actual _id will be sent to user; or maybe am worng cz. this is just a function to genrate jwt
        email:user.email,
        role:user.role,
    },secret,{expiresIn:"1h"});
};

const getUser=(token)=>{
    try{
        const user=jwt.verify(token,secret)
        return user; // here we don;t store req.usr=user...we do that in middleware
    }
    catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.redirect('/login?error=Session expired, please log in again');
          }
          return res.redirect('/login?error=Invalid token');
    }
    
}

module.exports={setUser,getUser};
