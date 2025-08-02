const mongoose = require("mongoose");

const GroupScehma=new mongoose.Schema({
        createdBy:{ // ✅ this references the _id of the user who created the group and you can use `.populate()` to get user details like name
            type: mongoose.Schema.Types.ObjectId,  // further research required; but this refers to the _id on other model created i.e. points to the _id of individual user in User module
            ref: "User",
            required:true,
                // and also delete the group when expirydate is reached but ig it's form backend logic
        },
        itemName:{
            type:String,
            required:true,
        },
        members:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required:true,
        },
        expiryDate:{
            type:Date,
            required:true,
        },
        itemQuantity:{
            type:Number,
            required:true,
        },
        claimedby:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default:null,
        },
        status:{
            type:String,
            enum:["open","closed"] // mandatory if only either of options are only required to be filled
        }
        

    },
{timestamps: true });
    

const Group=mongoose.model("Groups",GroupScehma);
module.exports=Group;