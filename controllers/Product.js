const e = require("express");
const Product=require("../models/Product");
const User=require("../models/User");

const getProducts=async(req,res)=>{
    try{
        const userId=req.user._id;
        if(!userId){
            return res.json({message:"Invalid User"})
        }
        const products=await Product.find({status:"available"});
        if(!products){
            return res.json({message:"No products live"});
        }
        return res.json(products).status(200);

    }
    catch(err){
        return res.json ({message:" Server Error in getting all products"}).status(500);
    }
}

const getProductById=async(req,res)=>{
    try{
        const productId=req.params.id;
        const userId=req.user._id;
        
        if(!userId)return res.json({message:"Invalid User"})
        if(!productId) return res.json ({message:"Product is already sold or doesn't exists"}).status(400);

        const products=await Product.findById(productId)
        return res.json ({product:products,}).status(200);
    }
    catch(err){
        console.log("Error in getting requested product",err);
        return res.json({message:"Internal Server Error"}).status(500)
    }
}
const sellNewProduct=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {productType,productName,productPrice,expiryDate,productDescription,quantity}=req.body;

        // insuffecient data
        if(!productType||!productName||!productPrice||!productDescription||!quantity||!userId){
            return res.json({message:"Insuffecient data, fill all the fields"});
        }

        //productType validation (not needed tbh) but see the logic here:
        if(productType!="new" && productType!="waste") return res.json({message:"Invalid Product Type"}).status(400);

        // verifying existingProduct
        const existingProduct=await Product.findOne({createdBy:userId,productName:productName})
        if(existingProduct){
             return res.json({message:"Product is already listed"}).status(400);
        }

        //verifying expirydate
        const verifyexpiryDate = new Date(expiryDate); 
        if (isNaN(verifyexpiryDate.getTime()) || verifyexpiryDate <= new Date()) {  
            return res.json({ message: "expiryDate must be a valid future date" }).status(400);
        }

        // verifying whether each role is selling correct items so if ite's a seller he should only sell new items wheres vica versa for vendor
        const user=await User.findById(userId);
        if(user.role=="seller" && productType!="new") return res.json({message:"Seller can only sell new products"}).status(400);
        if(user.role=="vendor" && productType!="waste") return res.json({message:"Vendor can only sell waste products"}).status(400);


        const products=await Product.create({
            createdBy:userId,
            productName:productName,
            expiryDate:expiryDate,
            productPrice:productPrice,
            productDescription:productDescription,
            quantity:quantity,
            productType:productType,
        })

        return res.json({
            product:products,
            message:"Product listed Successfully"
        }).status(200);
    }
    catch(err){
        console.log("Error in getting listing the product",err);
        return res.json({message:"Internal Server Error"}).status(500)
    }
}

const buyProduct=async(req,res)=>{
    try{
        const userId=req.user._id;
        const productId=req.params.id;

        if(!productId) return res.json({message:"Product doesn't exists"}).status(400);
       
        const product=await Product.findById(productId); //t hsi is correct format fo rmongoose query ({key:value})
        if(!product) return res.json({message:"This product deosn't exists "});
        if(product.status !== "available") return res.status(400).json({ message: "Product is no longer available" });

        const buyProduct= await Product.findByIdAndUpdate(
            productId,
            {
            $set:{
                boughtBy:userId,
                status:"sold"
            }
        },
        {new:true}
        );

    return res.json ({message:"Product bought successfully",product:buyProduct}).status(200);
    }
    catch(err){
        console.log("Error in buying the product",err);
        return res.json({message:"Internal Server Error"}).status(500)
    }
}


const deleteProduct=async(req,res)=>{
    try{
        const userId=req.user._id;
        const productId=req.params.id;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product doesn't exists" });
        if(product.createdBy.toString()!=userId) return res.json({message:"You can't delte this product since it's isn't yours"}).status(401); // here we r comparing object  to a string so we should first stringify it


        const deletedProduct= await Product.findByIdAndDelete(productId);
        return res.json({message:"Product delted successfully",deleted:deletedProduct}).status(200);

    }
    catch(err){
        console.log("Error in code for deleting this product")
        console.log("Error in deleting the product",err);
        return res.json({message:"Internal Server Error"}).status(500)
    }
}



module.exports={getProducts,getProductById,sellNewProduct,buyProduct,deleteProduct};