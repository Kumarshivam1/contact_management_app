//Creation of server
const express = require("express");
const app = express();

//load config from .env file , basically feeding .env info to process object
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse or retrive data from request body
app.use(express.json());

//mount the Contact API routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
app.use('/api/contacts',contactRoutes);
app.use('/api/users',userRoutes);
 

//connecting to DB
const connectDb = require("./config/dbConnection");
connectDb();

//Activating server on port
app.listen(PORT,()=>{
    console.log("Server active");
});