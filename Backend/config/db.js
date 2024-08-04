const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://food:7806872931@cluster0.zrjn50v.mongodb.net/food-del');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
    }
};

module.exports = connectDB;
