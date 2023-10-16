// importing internal objects
const Note = require("../models/note");
const User = require("../models/user");
const { findUsernameLoggedIn } = require("../utils/utils");

// handler functions
async function handleGetAllNotes(req, res) {
    try {
        const notes = await Note.find({});
        return res
            .status(200)
            .json({ message: "request successful", notes: notes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server problem" });
    }
}
async function handleAddNote(req, res) {
    try {
        if (!req.body.title || !req.body.note) {
            return res
                .status(400)
                .json({ message: "title or note cannot be empty" });
        }

        const loggedInUserId = (
            await User.findOne({
                username: await findUsernameLoggedIn(req),
            })
        )._id;

        const noteData = {
            title: req.body.title,
            note: req.body.note,
            user: loggedInUserId,
        };
        const newNote = new Note(noteData);
        await newNote.save();
        return res.status(201).json({
            message: "successful",
            note: newNote,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server problem" });
    }
}

async function handleUpdateNote(req, res) {
    try {
        return res.json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server problem" });
    }
}

async function handleDeleteNote(req, res) {
    try {
        const result = await Note.deleteOne({ _id: req.body._id });
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "note with id not found" });
        }
        return res.status(200).json({ message: "note deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server problem" });
    }
}

// exporting
module.exports = {
    handleGetAllNotes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
};
