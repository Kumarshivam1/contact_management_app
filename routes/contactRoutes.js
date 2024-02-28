const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

//import Controllers
const {getAllContacts,createContact,deleteContact,updateContact,getContact} = require("../controllers/contactController");


//making all routes protected so that only authenticated user can access
router.use(validateToken);

//Define api routes and map with controller
router.get("/",getAllContacts);
router.get("/:id",getContact);
router.post("/",createContact);
router.put("/:id",updateContact);
router.delete("/:id",deleteContact);

module.exports = router;