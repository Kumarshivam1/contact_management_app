const mongoose = require("mongoose");

require("dotenv").config();

//Its a promise
const connectWithDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Db connected successfully"))
    .catch((err)=>{
        console.log("Db facing issues");
        console.error(err);
        //exit with error or abnormal termination
        process.exit(1);
    })
};

module.exports = connectWithDb;