// importing external objects
const { Router } = require("express");

//importing internal objects
const {
    handleGetNote,
    handleGetAllNotes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
} = require("../controllers/note");

// creating router
const noteRouter = Router();

// setting up routes
noteRouter.route("/:id").get(handleGetNote);
noteRouter
    .route("/")
    .get(handleGetAllNotes)
    .post(handleAddNote)
    .delete(handleDeleteNote);
noteRouter.route("/:id").patch(handleUpdateNote);

//exporting
module.exports = noteRouter;
