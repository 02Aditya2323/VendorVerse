const mongoose=require("mongoose");  

const connectMongodb=async(url)=>{
    try{
    return mongoose.connect(url)
    }
    catch(err){
        console.log("mongoose connection error");
    }
};


module.exports = { connectMongodb };