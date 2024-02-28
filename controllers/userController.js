//import Schema
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//@desc Register a user
//@router POST /api/user/register
//@access public
exports.registerController = async(req,res)=>{
    try{
        const {username, email , password} = req.body;
        if(!username||!email||!password){
            return res.status(500).json({
                success:false,
                message:"Something is Missing",
            })
        }
        //check email is already present or not
        const emailFound =await User.findOne({email});
        if(emailFound){
            return res.status(500).json({
                success:false,
                message:"Email already present",
            })
        }
        //Before inserting user into DB , we have to encrpyt password because we cannot store raw password in our DB
        //we use lib called as bcrypt
        //Create a Hash password
        //bcrypt also provides promise
        //10 is no of rounds
        const hashedPassword = await bcrypt.hash(password, 10);
        //creation of new User and saving in DB
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            success:true,
            response:newUser,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            response:err.message,
        })
    }
}

//@desc login a user
//@router POST /api/user/login
//@access public
exports.loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(500).json({
                success:false,
                message:"Something is Missing",
            })
        }
        //check email is already present or not
        const user =await User.findOne({email});
        //compare password with hashed pasword
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken = jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id,
                }
            },process.env.JWT_SECRET,
            {expiresIn: "15m"}
            );
            res.status(200).json({
                success:true,
                response:accessToken,
            })
        }
        else{
            res.status(400).json({
                success:false,
                response:"Problem either with mail or password didnt matched",
            })
        }

    }
    catch(err){
        res.status(400).json({
            success:false,
            response:err.message,
        })
    }
}

//@desc show current user
//@router GET /api/user/current
//@access private
//Why private -> only a logged in user can get current user info
exports.currentController = async(req,res)=>{
    const user = req.user;
    try{
       return res.status(200).json({user});
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

//other way to export is module.exports = {currentController};