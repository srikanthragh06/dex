// importing external libraries
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// importing internal objects
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const dexRouter = require("./routes/dex");
const { checkReqJWTToken } = require("./middlewares/auth");

// declaring constants
const MONGODBURL = process.env.DB_URL;
const PORT = process.env.PORT;

// creating app object
const app = express();

//connect to mongoDB
connectMongoDB(MONGODBURL);

//Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routing
app.use("/user", userRouter);
app.use("/dex", checkReqJWTToken, dexRouter);

// server listening
app.listen(PORT, () => {
    console.log("Server Started");
});
