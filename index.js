// importing external libraries
const express = require("express");
const mongoose = require("mongoose");

// importing internal objects
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");

// declaring constants
const MONGODBURL = "mongodb://127.0.0.1:27017/dex";
const PORT = 3000;

// creating app object
const app = express();

//connect to mongoDB
connectMongoDB(MONGODBURL);

// external middlewares
app.use(express.json());

//custom middlewares

//routing
app.use("/user", userRouter);

// server listening
app.listen(PORT, () => {
    console.log("Server Started");
});
