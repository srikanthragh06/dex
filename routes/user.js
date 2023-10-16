// importing external objects
const { Router } = require("express");

// importing internal objects
const {
    handleSignup,
    handleLogin,
    handleGetAllUsers,
    handleLogout,
} = require("../controllers/user");

// creating router
const userRouter = Router();

// setting up routes
userRouter.route("/signup").post(handleSignup);

userRouter.route("/login").post(handleLogin);

userRouter.route("/auth").get((req, res) => {
    res.render("pages/auth", { loginMessage: null, signupMessage: null });
});

userRouter.route("/logout").post(handleLogout);

userRouter.route("/").get(handleGetAllUsers);

// exporting
module.exports = userRouter;
