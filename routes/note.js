// importing external objects
const { Router } = require("express");

//importing internal objects
const {
    handleGetAllNotes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
} = require("../controllers/note");

// creating router
const noteRouter = Router();

// setting up routes
noteRouter.route("/").get(handleGetAllNotes);
noteRouter.route("/").post(handleAddNote);
noteRouter.route("/").patch(handleUpdateNote);
noteRouter.route("/").delete(handleDeleteNote);

//exporting
module.exports = noteRouter;
