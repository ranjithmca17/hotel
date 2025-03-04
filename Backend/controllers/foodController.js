const foodModel=require("../models/foodModel.js");
const fs=require("fs");

//add food item

const addFood=async (req,res)=>{

    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        stock:req.body.stock,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save()
        res.json({sucess:true , message:"food Added"})
    }
    catch(error){
        console.log("error" ,error);
        res.json({sucess:false ,message:"error"})
    }

}

// all food list
const listFood = async (req,res)=>{
try{
    const foods = await foodModel.find({});
    res.json({sucess:true,data:foods})
}
catch(error){
console.log(error);
res.json({sucess:false,message:"error"})

}
}

//remove food item
const removeFood= async (req,res)=>{
try{
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({sucess:true,message:"Food Removed"})

}catch(error){
console.log(error);
res.json({sucess:false,message:"error"})
}
}


module.exports={addFood ,listFood,removeFood}