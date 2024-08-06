// // const userModel=require("../models/userModel.js");
// const userModel=require("../models/userModel")

// //add to cart
// const addToCart= async (req,res)=>{

//     try{
//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId]=1;
//         }
//         else{
//             cartData[req.body.itemId]+=1;
//            }
//            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//            res.json({success:true,message:"add to cart"})
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"add to cart error"})
//     }
// }



// //remove items

// const removeFromCart=async(req,res)=>{

//     try{
//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId]-=1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Remove From Cart"})
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }
// }


// //fetch user cart data

// const getCart=async (req,res)=>{

//     try{
//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         res.json({success:true,cartData})

//     }catch(error){
// console.log(error);
// res.json({success:false,message:"error"});

//     }
// }

// module.exports={addToCart,removeFromCart,getCart};
// // module.exports={addToCart};




const userModel = require("../models/userModel");
// const foodModel = require("../models/foodModel");
const foodModel=require("../models/foodModel");

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user and food item
        const userData = await userModel.findById(userId);
        const foodData = await foodModel.findById(itemId);

        if (!foodData) {
            return res.json({ success: false, message: "Item not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // Update user cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Update food stock
        if (foodData.stock > 0) {
            foodData.stock -= 1;
            await foodData.save();
            res.json({ success: true, message: "Added to cart" });
        } else {
            res.json({ success: false, message: "Out of stock" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Add to cart error" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user and food item
        const userData = await userModel.findById(userId);
        const foodData = await foodModel.findById(itemId);

        if (!foodData) {
            return res.json({ success: false, message: "Item not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            // Update user cart data
            await userModel.findByIdAndUpdate(userId, { cartData });

            // Update food stock
            foodData.stock += 1;
            await foodData.save();
            
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not in cart" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

module.exports = { addToCart, removeFromCart, getCart };
