// const express=require("express");
// const {addFood} =require("../controllers/foodController.js");
// const multer=require("multer");

// const foodRouter=express.Router();

// // Image Storage Engine

// const storage=multer.diskStorage({
//     destination:'uploads',
//     filename:(req,res,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload=multer({storage:storage})


// foodRouter.post('/add',upload.single("image"),addFood)




// module.exports=foodRouter;


const express = require("express");
const multer = require("multer");
const { addFood, listFood,removeFood } = require("../controllers/foodController");

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get("/list",listFood)

foodRouter.post("/remove",removeFood);


module.exports = foodRouter;
