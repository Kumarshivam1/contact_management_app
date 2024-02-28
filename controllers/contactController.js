//import model - because we need to interact with DB
const Contact = require("../model/contactModel");

/**
 * we need to use async fuction because we have to interact with DB because we get promise
 * use await while perfore action on Schema
 */

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
exports.getAllContacts = async(req,res)=>{
try{
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json({
        contact
    });
}
catch(err){
    res.status(500).json({
        success:false,
        error:err.message,
        message:"Error while fetching Contacts"
    });
}}

//@desc create new Contacts
//@route POST /api/contacts
//@access private
exports.createContact = async(req,res)=>{
    try{
    const {name,email,phone} = req.body;
    //Validation of entry
    if(!name||!email||!phone){
        return res.status(401).json({
            success: false,
            message:"Something is Missing"
        })
    }

    const contact = await Contact.create({
        name,email,phone,
        user_id: req.user.id
    });

    res.status(200).json({
        success:true,
        response:contact,
        message:"Entry Created Successfully"
    });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Entry Creation UnSuccessfully"
        });
    }}


//@desc get Contact
//@route GET /api/contacts/:id
//@access private
exports.getContact = async(req,res)=>{
    try{
     const contact = await Contact.findById(req.params.id);
     if(!contact){
        return res.status(500).json({
            message:"No Contact Found"
        })
     }
     if(contact.user_id.toString()!== req.user.id){
        return res.status(500).json({
            message:"Unauthenticated Access, Denied!",
        })
    }
     res.status(200).json({
        success:true,
        response:contact,
     });
    }catch(err){
     res.status(500).json({
        message:"Error Occured",
        error:err.message,
     })
    }}

//@desc delete a Contacts
//@route DELETE /api/contacts/:id
//@access private
exports.deleteContact = async(req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact){
           return res.status(500).json({
               message:"No Contact Found"
           })
        }
        if(contact.user_id.toString()!== req.user.id){
            return res.status(500).json({
                message:"Unauthenticated Access, Denied!",
            })
        }
        const updatedContact = await Contact.findByIdAndDelete(
            req.params.id,
        );
        
        res.status(200).json({
           success:true,
           response:updatedContact,
        });
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            error:err.message,
        })
    }}

//@desc update a Contacts
//@route PUT /api/contacts/:id
//@access private
exports.updateContact = async(req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact){
           return res.status(500).json({
               message:"No Contact Found"
           })
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if(contact.user_id.toString()!== req.user.id){
            return res.status(500).json({
                message:"Unauthenticated Access, Denied!",
            })
        }
        res.status(200).json({
           success:true,
           response:updatedContact,
        });
    }catch(err){
        res.status(500).json({
            message:"Error Occured",
            error:err.message,
        })
    }}
