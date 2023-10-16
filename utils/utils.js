// importing external objects
const jwt = require("jsonwebtoken");
require("dotenv").config();

// functions
async function findUsernameLoggedIn(req) {
    try {
        const reqJWTToken = req.cookies.jwtToken;
        if (!reqJWTToken) {
            return null;
        }
        const decoded = await jwt.verify(
            reqJWTToken,
            process.env.JWT_SECRET_KEY
        );
        return decoded.username;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { findUsernameLoggedIn };
