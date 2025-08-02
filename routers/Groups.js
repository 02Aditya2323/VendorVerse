const express=require("express");
const  router=express.Router(); 
const{restrictTo}=require("../middlewares/auth") 
const{getGroups,createNewGroup,joinGroup,claimGroup,delteExistingGroup,getGroupById}=require("../controllers/Groups");



router.get("/",getGroups);  // general homapage of website of loggdein user which will display the present groups actively
router.get("/:id",getGroupById);
router.post("/",restrictTo(["vendor"]),createNewGroup);   // for creating new group on user's requests and also generating a particular id for that grp. ; it can be mongo's _id too -> am thinking of adding extra layer of verification whether the user is genuinely a vendor or not later
router.post("/join/:id",restrictTo(["vendor"]),joinGroup);  // for other vendors to join present group 
router.post("/claim/:id",restrictTo(["seller"]),claimGroup);  // for the seller only to claim the group and sell his product --> add auth for sellerOnly to claim this; basically the frontend will have a button which will trigger this action
router.delete("/:id",restrictTo(["vendor"]),delteExistingGroup) // authorized only to vendor who has created  to delte the grp. 

module.exports=router;

// when user creates a group; the group gets it's own particular id from the mongodb default i.e. _id 
// when user crwates group; how the process that group created and his own group access will be shown(by frontend?); so like when a user logs in(vendor) his own created group shows above...(by frontednly betterright?) or will create /profile route for every user to get his own details abt. grps.