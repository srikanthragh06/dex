// importing external objects
const jwt = require("jsonwebtoken");
require("dotenv").config();

// functions
function isUserLoggedIn(req) {
    const reqJWTToken = req.cookies.jwtToken;
    if (!reqJWTToken) {
        return false;
    }
    jwt.verify(reqJWTToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return false;
        }
        return true;
    });
}

module.exports = { isUserLoggedIn };
