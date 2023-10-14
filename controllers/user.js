// importing internal objects
const User = require("../models/user");

// handler functions
async function handleSignup(req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            return res
                .status(400)
                .json({ message: "Username and password are mandatory" });
        }

        const oldUsername = await User.findOne({ username: req.body.username });
        if (oldUsername) {
            return res.status(400).json({
                message: "user creation FAILED, username already exists",
            });
        }

        const userData = {
            username: req.body.username,
            password: req.body.password,
        };

        const newUser = new User(userData);
        newUser.hashPassword();

        await newUser.save();
        return res.status(201).json({
            message: `User ${newUser.username} registered successfully`,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Could not add new record to users collection",
            error: err.message,
        });
    }
}

async function handleLogin(req, res) {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: "Username or password is empty, login FAILED",
            });
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({
                message: "username not found, login FAILED",
            });
        }

        if (user.isPasswordCorrect(req.body.password)) {
            return res.status(200).json({ message: "login successful" });
        } else {
            return res
                .status(401)
                .json({ message: "Incorrect password, login FAILED" });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Could not Login",
            error: err.message,
        });
    }
}

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
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
};
