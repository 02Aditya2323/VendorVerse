const Group=require("../models/Groups.js")
const Product = require("../models/Product");
const User=require("../models/User");




const getGroupById=async(req,res)=>{
    try{
        const group=await Group.findById(req.params.id);  // since we have to fetch a single grp. we find it by _id of mongodb and return the single entry of that grp.
        if(!group){
            return res.json({message:"group not found"}).status(404);
        }
        return res.json(group).status(200);
    }
    catch(err){
        console.log("error in getting groups by respective Id")
        return res.status(500).json({message:"Internal server error"});
    }
}

// runnin g a cron jobs in services that deletes the group automatically when  expiry date exceeds
const getGroups=async(req,res)=>{  // frontend will fetch this data every 10 sec. so logic for that will be in frontend
    try{
        const groups = await Group.find({ status: "open" }); // querry for fetching all groups from the collection which are only open 
        if(!groups || groups.length === 0){
            return res.json({message:"No groups found"}).status(404);
        }
        return res.json(groups).status(200);
    }
    catch(err){
        console.log("Error in fetching all groups:", err);
        return res.json({message:"Internal server error"}).status(500);
    }
}

const createNewGroup=async(req,res)=>{ // this grp. will be created only if the user is verified vendor and he clicks on button and form to create newgroup from frontend
    try{
        const body=req.body;  // getting details from frontend via headers (post reques)
        const userId=req.user._id;
        if(!body.itemName||!body.expiryDate||!body.itemQuantity){
            return res.json({message:"insuffecient data given"}).status(400);
        }

         // checking if the grp. already exists by same username and of sameitem....if yes then....
         const existingGroup=await Group.findOne({createdBy:userId,itemName:body.itemName})
         if(existingGroup){
             return res.json({message:"Group already exists"}).status(400);
         }

         
        const expiryDate = new Date(body.expiryDate);  // getting the expirydate from request body and converting it into JS object 
        if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {  // if date is not valid or past date...
            return res.json({ message: "expiryDate must be a valid future date" }).status(400);
        }

        // after validation of new group and expirydate; creating the group of another item; 
        else{
        const group=await Group.create({
            createdBy:userId,
            itemName:body.itemName,
            expiryDate:body.expiryDate,
            itemQuantity:body.itemQuantity,
            members:[userId],   // cz. the creator will be the first member of the group
            status:"open"
        })
        return res.json({
            message:"Group created successfully",
            group:group,
        }).status(201);
        }
    }
    catch(err){
        console.log("Error in creating group:", err);
        return res.json({message:"Internal server error"}).status(500);
    }
}

// not implemened this function currently....rather logic like eg. restricUser to join only 1 group is usually written in servcies....so make note of that
// const restrictToParticularGroup=async(req,res)=>{
//     try{
//         const userId=req.user._id    // here we r manually
//         if(!userId){
//             return res.json({message:"UserId is required"})
//         }
//         const findUser=await User.findById(userId)
//         if(!findUser) return res.json ({message:"Invalid "})

//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({message:"Internal server error"});
//     }
// }


const joinGroup= async(req,res)=>{ // apply middleware for only allowing vendors to join group
    try{
        const groupId = req.params.id; // this is getting group _id from url
        const userId = req.user._id; // this is getting user _id from body

        if(!userId){  
            return res.json({message:"User not found"}).status(404);
        }

        const group=await Group.findById(groupId) 

        if(!group){ // checking if group exists or not ....... // tbh this isn't necessary cz. cron jobs delete the grp. which expires automatically
            return res.json({message:"Group doesn't exists"}).status(404);
        }
        if(group.status=="closed"){ // checking the status of group...
            return res.json({message:"Group is closed"}).status(400);
        }
        if(group.members.includes(userId)){ // checking if user is already in the group; this is js function .includes which checks inside array
            return res.json({message:"User is already in the group"}).status(400);
        }


        // if user is verified,unique in this grp. and group is present too; and group is open then....add the user
        const UpdatedGroup =await Group.findByIdAndUpdate(groupId,  
            { $push: { members: userId } },  // Use $push to ADD to array
            { new: true }  // Returns updated document cz. generally mongodb returns unupdated data hence this is necessary
        );
        return res.json({
            message:"Group joined successfully",
            group:UpdatedGroup
        }).status(200);

    }
    catch(err){
        console.log("Error in joining group:", err);
        return res.json({message:"Internal server error"}).status(500);
    }
}


const claimGroup=async(req,res)=>{ // middleware auth. first for this function to be accessible only by seller
    try{
        const groupId=req.params.id;
        const userId=req.user._id;

        if(!userId){
            return res.json({message:"User not found"}).status(404);
        }

        
        const group= await Group.findById(groupId) // here used(groupId) and not passed it in as object...cz. findById() is a mongoose method that finds id with the parameter provided and thus direct value is to be given
        if(!group){
            return res.json({message:"group doesn't exists"}).status(404);
        }else if(group.status=="closed"){
            return res.json({message:"Group is closed"}).status(400);
        } else if(group.claimedby!=null){
            return res.json({message:"Group is already claimed"}).status(400);
        }


        const claimGroup=await Group.findByIdAndUpdate(
            groupId,
            {
            $set:{
                claimedby:userId,
                status:"closed"
            }
        },
        {new:true}
        );

        return res.json({
            message:"Group claimed successfully",
            group:claimGroup
        }).status(200);

    }
    catch(err){
        console.log("error in claiming group",err);
        return res.json("Internal Seerver errror").status(500);
        
    }
    // he's still very much far ahead of me lol
}

const delteExistingGroup =async(req,res)=>{ // restricted to only the user who has created this grp.
    try{
        const groupId=req.params.id;
        const userId=req.user._id;

        if(!userId){
            return res.json({message:"User not found"}).status(404);
        }
        const group= await Group.findById(groupId) 
        if(!group){
            return res.json({message:"group doesn't exists"}).status(404);
        }
        if(group.createdBy!=userId){
            return res.json({message:"You are not authorized to delete this group"}).status(401);
        }
        if(group.claimedby!=null){
            return res.json({message:"Group can't be deleted now since it's already claimed"}).status(400);
        }

        const delteExistingGroup= await Group.findByIdAndDelete(groupId)  // wrong!!!!!
        return res.json({message:"Group Deleted successfully"}).status(200);
    }
    catch(err){
        console.log("error in deleting group",err);
        return res.json("Internal server errro").status(500);
        
    }

    }




module.exports={getGroups,createNewGroup,joinGroup,claimGroup,delteExistingGroup,getGroupById}

