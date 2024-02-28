const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateToken = async(req,res,next)=>{
    try{
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            console.log(token);
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    return res.status(401).json({
                        success:false,
                        response:err.message,
                        res:err,
                        error:"User is not authorized"
                    })
                }
                //extraction of info embedded in token and putting it inside req.body
                req.user = decoded.user;
                next();
            })
        }
        if(!token){
            return res.status(401).json({
                success:false,
                response:"Token not provided"
            })
        }
    }
    catch(err){
        res.status(401).json({
            success:false,
            response:err.message
        })
    }
};

module.exports = validateToken;