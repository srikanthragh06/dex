// importing external libraries
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
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
app.use(express.static(path.join(__dirname, "public")));

//routing
app.use("/user", userRouter);
app.use("/dex", checkReqJWTToken, dexRouter);
app.route("/").get((req, res) => {
    res.status(301).redirect("/dex");
});
// app.get("/profile", (req, res) => {
//     const reqJWTToken = req.cookies.jwtToken;
//     if (!reqJWTToken) {
//         return res.json({ message: "user not logged in" });
//     }
//     jwt.verify(reqJWTToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).redirect("/user/auth");
//         }
//         console.log(decoded);
//         return res.json({ user: decoded });
//     });
// });

// server listening
app.listen(PORT, () => {
    console.log("Server Started");
});
