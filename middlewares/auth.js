const User=require("../models/User")
const getUser=require("../services/auth")


const checkForAuthentication=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.json("Auth Failed").status(401);
      }
      
    const token=authHeader.split("Bearer ")[1];
    const user=getUser(token)

    if(!user) return res.status(401).json({message:"Unauthorized"}).redirect("/login")
    req.user=user;  // this line here is very imp. --->basically whenever request comes form frontend it first getsverified by middleware and then if verifies; we are storing the user(data)in req.user; and whenever in controller we have to use _id; we will use this stored and verified (by jwt) req.user and not the _id which comes form body data...
    
    next();
}

const restrictTo=(roles=[])=>{
    return (req,res,next)=>{
        if(!req.user) return res.json({message:"Unauthorized"}).status(401);
        if(!roles.includes(req.user.role)) return res.json({message:"Unauthorized"}).status(401);
        next();
    }
}

module.exports={checkForAuthentication,restrictTo};