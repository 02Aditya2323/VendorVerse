const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt') 
const User=require ("../models/User.js");
const setUser=require("../services/auth.js");

// the token that we give is stored in localstorage
//localstorage=> it stays in storage until manually cleared
//sessionStorage => It stays for session(until tab is closed)     so when jwt expires in 1h means; jwt itself expires; not the localstorage or cookes etc.

const handleUserLogin=async(req,res)=>{ 
  try{
    const{email,password}=req.body;
    if(!email||!password) return res.json({message:"All details required"});

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    
    const passCheck=await bcrypt.compare(password,user.password);
    if(!passCheck) return res.json ({message:"Invalid Password, please enter correct pasword"}).status(400);

    const token=setUser(user);

    return res.status(200).json({ token: token, message: "Login Successful Yay Bitches" });
  
  }
  catch(err){
    console.log("Error in UserLogin",err);
    return res.json({message:"Internal Server Error: UserLogin"}).status(500)
  }
}



const handleUserSignup=async(req,res)=>{ // option of signing in as vendor/ seller
  try{
  const{name,email,password,role}=req.body;
  if(!name||!email||!password) return res.json({message:"All details required"}).status(400);

  if(!role||role!="vendor" && role!="seller") return res.json({message:"Invalid role"}).status(400);

  const hashedPassword=await bcrypt.hash(password,10);

    await User.create({
      name:name,
      email:email,
      password:hashedPassword,
      role:role
    })

    return res.status(200).json({message:"Signup Successfull, account is created; now Login"}).redirect("/login")
  }
catch(err){
  console.log("Error in Generating user",err);
  return res.json({message:"Internal Server Error: UserSignup"}).status(500)
}
}



const handleUserLogout=(req,res)=>{
      // logout will be from frontend side=>   localStorage.removeItem('token');
  // or
  sessionStorage.removeItem('token');
  // then redirect to login page
  window.location = '/login';

    return res.json({ message: "Logout successful. Please remove the token on the client." });
    // logout will be from frontend side=>   localStorage.removeItem('token'); or sessionStorage.removeItem('token');  then redirect to login page window.location = '/login';
        
}

module.exports={handleUserLogin,handleUserSignup,handleUserLogout};