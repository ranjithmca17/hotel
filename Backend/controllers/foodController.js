// const foodModel=require("../models/foodModel.js");
// const fs=require("fs");


// //add food item

// const addFood=async (req,res)=>{

//     let image_filename=`${req.file.filename}`;

//     const food=new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         stock:req.body.stock,
//         category:req.body.category,
//         image:image_filename
//     })
//     try{
//         await food.save()
//         res.json({sucess:true , message:"food Added"})
//     }
//     catch(error){
//         console.log("error" ,error);
//         res.json({sucess:false ,message:"error"})
//     }

// }


// // all food list

// const listFood = async (req,res)=>{
// try{
//     const foods = await foodModel.find({});
//     res.json({sucess:true,data:foods})
// }
// catch(error){
// console.log(error);
// res.json({sucess:false,message:"error"})

// }
// }


// //remove food item

// const removeFood= async (req,res)=>{
// try{
//     const food=await foodModel.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`,()=>{})
//     await foodModel.findByIdAndDelete(req.body.id);
//     res.json({sucess:true,message:"Food Removed"})

// }catch(error){
// console.log(error);
// res.json({sucess:false,message:"error"})
// }
// }


// module.exports={addFood ,listFood,removeFood}






const foodModel = require("../models/foodModel");
const fs = require("fs");
const path = require("path");

// Add food item
const addFood = async (req, res) => {
    const imageFilename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock, // Ensure this is an initial stock value
        category: req.body.category,
        image: imageFilename
    });

    try {
        await food.save();
        res.status(201).json({ success: true, message: "Food item added" });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete image file from server
        fs.unlink(path.join(__dirname, '../uploads', food.image), (err) => {
            if (err) console.error("Error removing image file:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food item removed" });
    } catch (error) {
        console.error("Error removing food item:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addFood, listFood, removeFood };

