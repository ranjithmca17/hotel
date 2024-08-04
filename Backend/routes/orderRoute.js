// const express=require("express");

// const authMiddleware=require("../middleware/auth");

// const placeOrder=require("../controllers/orderCondroller");

// const orderRouter=express.Router();

// orderRouter.post("/place",authMiddleware,placeOrder);

// module.exports=orderRouter;



const express = require("express");
const authMiddleware = require("../middleware/auth");
// const placeOrder = require("../controllers/orderController"); // Ensure correct path
const placeOrder=require("../controllers/orderCondroller")

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

module.exports = orderRouter;
