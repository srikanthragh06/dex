// importing external objects
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware functions
function checkReqJWTToken(req, res, next) {
    const reqJWTToken = req.cookies.jwtToken;
    if (!reqJWTToken) {
        return res.status(401).redirect("/user/auth");
    }
    jwt.verify(reqJWTToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).redirect("/user/auth");
        }
        return next();
    });
}

//exporting
module.exports = { checkReqJWTToken };
