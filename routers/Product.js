const express=require("express");
const  router=express.Router();  
const {getProducts,getProductById,sellNewProduct,buyProduct,deleteProduct}=require("../controllers/Product");

router.get("/",getProducts); 
router.get("/:id",getProductById);
router.post("/",sellNewProduct); 
router.post("/buy/:id",buyProduct);
router.delete("/:id",deleteProduct);


module.exports=router;