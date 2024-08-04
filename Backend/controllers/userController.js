const userModel=require("../models/userModel.js");
const jwt =require("jsonwebtoken");
const bycrpt =require("bcrypt");
const validator=require("validator");

//login user
const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const ismatch=await bycrpt.compare(password,user.password);

        if(!ismatch){
            return res.json({success:false,message:"Invalid Value"});
        }
        
        const token=createToken(user._id);
        res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"type error"})
    }
}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register User
const registerUser=async (req,res)=>{

    const {name,email,password}=req.body;
    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
    
    //validating email format & strong password
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"please enter a valid email"});
    }
    if(password.length<8){
        return res.json({success:false,message:"please enter a strong password"});
    }
    //hashing user password
    const salt=await bycrpt.genSalt(10)
    const hashedPassword=await bycrpt.hash(password,salt);
    const newUser= new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user=await newUser.save();
    const token=createToken(user._id)
    res.json({success:true,token})

    }
    catch(error){
console.log(error);
res.json({success:false,message:"error"})

    }
}

module.exports={loginUser,registerUser};