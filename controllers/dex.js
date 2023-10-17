// importing internal objects
const Note = require("../models/note");
const User = require("../models/user");
const {
    findUsernameLoggedIn,
    findUserIdFromUserName,
} = require("../utils/utils");

// handler functions
async function handleRenderHomePage(req, res) {
    try {
        const loggedInUsername = await findUsernameLoggedIn(req);
        const loggedInUserId = await findUserIdFromUserName(loggedInUsername);
        const notes = await Note.find({ user: loggedInUserId });
        res.render("pages/dex", {
            loggedInUsername: loggedInUsername,
            notes: notes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server side problem");
    }
}

// exporting
module.exports = { handleRenderHomePage };
