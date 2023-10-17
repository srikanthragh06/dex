// importing external objects
const { Router } = require("express");

// importing internal objects
const { handleRenderHomePage } = require("../controllers/dex");

// creating router
const dexRouter = Router();

// setting up routes
dexRouter.route("/").get(handleRenderHomePage);

// exporting
module.exports = dexRouter;
