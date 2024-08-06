const mongoose =require("mongoose");

const foodSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true},
    category:{type:String,require:true},
    stock:{type:String,require:true},
})

const foodModel=mongoose.models.food || mongoose.model("food",foodSchema);

//if this model already there mongoose.models.food excecuted not there || mongoose.model("food",foodSchema); excecuted

module.exports=foodModel;