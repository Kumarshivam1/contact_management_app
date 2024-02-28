const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const contactSchema = mongoose.Schema({
    //user id of user who credated this contact so tht we can make sure that only valid user is seeing the contacts
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Contact",contactSchema);
