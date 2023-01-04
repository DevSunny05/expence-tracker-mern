const express = require("express");
const mongoose=require('mongoose')
const app = express();
const cors = require("cors");
const router = require("./routes/route");

// const db = require("./db/connection.js");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// middlewear
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false);

// mongodb connection
const con=require('./db/connection.js');
con.then(db=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port} `)
    })
    app.on("error",err=>console.log(`failed to connect with HTTP server: ${err}`))
}).catch(error=>{
    console.log(`connection filed....${error}`);
})



// routes
app.use("/", router);
