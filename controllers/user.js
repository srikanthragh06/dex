// importing internal objects
const User = require("../models/user");

//importing external objects
const jwt = require("jsonwebtoken");
require("dotenv").config();

// handler functions
async function handleSignup(req, res) {
    try {
        if (
            !req.body.username ||
            !req.body.password ||
            !req.body.confirmPassword
        ) {
            return res.status(400).render("pages/auth", {
                loginMessage: null,
                signupMessage: "Username and password are mandatory",
            });
        }

        if (req.body.password != req.body.confirmPassword) {
            return res.status(400).render("pages/auth", {
                loginMessage: null,
                signupMessage: "password and confirm password do not match!",
            });
        }

        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).render("pages/auth", {
                loginMessage: null,
                signupMessage: "user creation FAILED, username already exists",
            });
        }

        const userData = {
            username: req.body.username,
            password: req.body.password,
        };

        const newUser = new User(userData);
        newUser.hashPassword();

        await newUser.save();
        return res.status(201).render("pages/auth", {
            loginMessage: null,
            signupMessage: `User ${newUser.username} registered successfully`,
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).render("pages/auth", {
            loginMessage: null,
            signupMessage: "Could not signup",
        });
    }
}

async function handleLogin(req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).render("pages/auth", {
                loginMessage: "Username or password is empty, login FAILED",
                signupMessage: null,
            });
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).render("pages/auth", {
                loginMessage: "username not found, login FAILED",
                signupMessage: null,
            });
        }

        if (user.isPasswordCorrect(req.body.password)) {
            const jwtToken = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
            res.cookie("jwtToken", jwtToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            return res.status(200).redirect("/dex");
        } else {
            return res.status(401).render("pages/auth", {
                loginMessage: "Incorrect password, login FAILED",
                signupMessage: null,
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).render("pages/auth", {
            loginMessage: "Could not Login",
            signupMessage: null,
        });
    }
}

async function handleLogout(req, res) {
    res.cookie("jwtToken", "", {
        maxAge: 1,
    });
    return res.status(200).redirect("/user/auth");
}

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Error fetching users", error: err });
    }
}

// exporting
module.exports = {
    handleSignup,
    handleLogin,
    handleGetAllUsers,
    handleLogout,
};
