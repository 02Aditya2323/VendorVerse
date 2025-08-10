const express=require("express");
const app =express();
require('dotenv').config();       // dotenv module require..... noly to be imported once and never to be called or used..
const path=require("path");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi=require("swagger-ui-express");
const swaggerSpecs=require("./swagger.js");
const{checkForAuthentication}=require("./middlewares/auth.js")
//dotenv:


// mongoDb connection:
const {connectMongodb}=require("./connection.js");  
connectMongodb(process.env.MONGO_LOCAL_URL)
.then(()=>console.log("MONGODB CONNECTED, YAY"))  
.catch((err)=>console.log("Database connection issue"));

// Swagger Api config:
// Configuration moved to swagger.js for better organization

const spec= swaggerSpecs;

//middlewares: 
app.use(express.urlencoded({extended:false}));  
app.use(express.json()); 
app.use(cookieParser());
app.use(cors());


// importing routes:
const UserRoute=require("./routers/User.js");
const GroupsRoute=require("./routers/Groups.js")
const ProductRoute=require("./routers/Product.js")


// routes:
app.use("/group",checkForAuthentication,GroupsRoute);
app.use("/product",checkForAuthentication,ProductRoute)
app.use("/user",UserRoute);

// swaggerUi route:
app.use("/api_doc",swaggerUi.serve,swaggerUi.setup(spec));

//cronservice:   rather use Scheduler
const CronJobService = require('./services/cronjobs.js');
CronJobService.initializeCronJobs();


//hosting server on loclahost
const PORT=process.env.PORT
app.listen(PORT,()=> console.log("server started"));
