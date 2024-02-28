const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

//import userController
const {registerController,loginController,currentController} = require("../controllers/userController");


//map route with userController
router.post("/register",registerController);
router.post("/login",loginController);
router.get("/current",validateToken, currentController);

module.exports = router;