// importing external objects
const { Router } = require("express");

// importing internal objects
const {
    handleSignup,
    handleLogin,
    handleGetAllUsers,
} = require("../controllers/user");

// creating router
const userRouter = Router();

// setting up routes
userRouter.route("/signup").post(handleSignup);

userRouter.route("/login").post(handleLogin);

userRouter.route("/").get(handleGetAllUsers);

// exporting
module.exports = userRouter;
