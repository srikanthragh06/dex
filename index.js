// importing external libraries
const express = require("express");
const mongoose = require("mongoose");

// importing internal objects
const { connectMongoDB } = require("./connection");

const PORT = 8000;
const app = express();

//connect to mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/dex");

// server listening
app.listen(PORT, () => {
    console.log("Server Started");
});
