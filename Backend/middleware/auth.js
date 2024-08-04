const jwt =require("jsonwebtoken");

const authMiddleware= async (req,res,next)=>{

    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"not authorized login again"});
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

module.exports=authMiddleware;



// const jwt = require('jsonwebtoken');

// const authMiddleware = async (req, res, next) => {
//     // Extract token from Authorization header (format: "Bearer [token]")
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not authorized. Please log in again.' });
//     }

//     try {
//         // Verify the token
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decodedToken.id; // Attach user ID to the request object
//         next();
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         res.status(403).json({ success: false, message: 'Invalid or expired token.' });
//     }
// };

// module.exports = authMiddleware;
