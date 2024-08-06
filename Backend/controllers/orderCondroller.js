// const orderModel=require("../models/orderModel");

// const userModel=require("../models/userModel")

// const Stripe=require("stripe");



// const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

// //placing user order for frontend

// const placeOrder=async (req,res)=>{

//     const frontend_url="http://localhost:5173"
//     try{
//         const newOrder= new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amounts,
//             address:req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items=req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity
//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })

//         const session=await stripe.checkout.sessions.create({
//             line_items,
//             mode:"payment",
//             success_url:`${frontend_url}/verrify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verrify?success=false&orderId=${newOrder._id}`,
//         })
//         res.json({success:true,session_url:session.url})

//     }
//     catch(error){
// console.log(error);
// res.json({success:false,message:"Error"})

//     }
// }

// module.exports=placeOrder;








const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount, // Fixed typo: 'amounts' to 'amount'
            address: req.body.address
        });
        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80 // Amount in paise (subunit of INR)
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80 // Amount in paise
            },
            quantity: 1
        });

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

module.exports = placeOrder;
