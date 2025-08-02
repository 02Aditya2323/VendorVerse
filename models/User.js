const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true,
        },
        password:{
            type: String,
            required: true,
            
        },
        role:{
            type:String,
            enum:["vendor","seller"],
            required:true,
        }

        // ig adding payment details of each user; may be needed too...like
    },
{timestamps: true });
    

const User=mongoose.model("User",UserSchema);
module.exports=User;