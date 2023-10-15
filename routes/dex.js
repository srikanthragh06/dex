// importing external objects
const { Router } = require("express");

// importing internal objects

// creating router
const dexRouter = Router();

// setting up routes
dexRouter.route("/").get((req, res) => {
    res.render("home");
});

// exporting
module.exports = dexRouter;
