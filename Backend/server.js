// const express =require("express");
// const cors=require("cors");
// const connectDB = require("./config/db");
// const  foodRouter = require("./routes/foodRoute");
// const { userRouter  } = require("./routes/userRoute");
// const cartRouter  = require("./routes/cartRoute");
// const orderRouter = require("./routes/orderRoute");
// // const { cartRouter } =  require("./routes/cartRoute");
// // const cartRouter =require("./routes/cartRoute.js")
// require("dotenv/config");
// // require("dotenv/config.js")
// //app config
// const app=express()

// const port=4000;

// //middleware

// app.use(express.json())
// app.use(cors());
// console.log(process.env.JWT_SECRET);


// // db connection
// connectDB();


// //api end points
// app.use('/api/food',foodRouter)
// app.use('/images',express.static('uploads'))
// app.use("/api/user",userRouter);
// // app.use("/api/cart",cartRouter)
// // app.use('/api/cart',cartRouter)
// app.use('/api/cart',cartRouter);
// app.use("/api/order",orderRouter)


// app.get('/',(req,res)=>{

//     res.send("Api working");
// })



// app.listen(port,()=>{
//     console.log("port running http://localhost:"+port);
// })



// //mongodb+srv://food:<password>@cluster0.zrjn50v.mongodb.net/?








const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const { userRouter } = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config(); // Load environment variables

// App configuration
const app = express();
const port = process.env.PORT || 4000; // Use environment variable or default to 4000

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Connect to the database
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads')); // Serve static files from 'uploads' directory
app.use("/api/user", userRouter);
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);

// Basic route for checking if the server is working
app.get('/', (req, res) => {
    res.send("API is working");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error details
    res.status(500).send('Something broke!'); // Send generic error message
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
