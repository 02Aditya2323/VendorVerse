const mongoose = require("mongoose");

// this will be for both seller and vendor: here seller will sell new products and vendor will sell waste expired ones..
// for sellers:
const ProductScehma=new mongoose.Schema({
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,  // further research required; but this refers to the _id on other model created i.e. points to the _id of individual user in User module
            ref: "User",
            required:true,
        },
        productName:{
            type:String,
            required:true,
        },
        productType:{
            type:String,
            required:true,
            enum:["new","waste"],
        },
        expiryDate:{
            type:Date,
            required:true,
        },
        productPrice:{
            type:Number,
            required:true,
            min:0,      // for alloting minimum value to product
        },
        productDescription:{
            type:String,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            min:1,    // for confirming min. quantity
        },
        boughtBy:{  // restrict to only vendor=> will be done in middleware; but how can i implement it from here?
            type: mongoose.Schema.Types.ObjectId,  
            ref: "User",
            default:null,
        }, 
        status:{   // another cron job to chage the status to sold 
            type:String,
            enum:["available","sold"],
            default:"available",
        },
    },
{timestamps: true });
    

const Product=mongoose.model("Product",ProductScehma);
module.exports=Product;