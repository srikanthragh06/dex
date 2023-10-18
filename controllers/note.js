// importing internal objects
const Note = require("../models/note");
const User = require("../models/user");
const {
    findUsernameLoggedIn,
    findUserIdFromUserName,
} = require("../utils/utils");

// handler functions
async function handleGetNote(req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "id is missing" });
        }
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({ message: "Note not found" });
        }
        return res
            .status(200)
            .json({ message: "request successful", note: note });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server problem" });
    }
}

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

        const loggedInUsername = await findUsernameLoggedIn(req);
        const loggedInUserId = await findUserIdFromUserName(loggedInUsername);

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
        if (!req.body._id) {
            return res.status(400).json({ message: "id is empty" });
        }
        if (!req.body.title || !req.body.note) {
            return res
                .status(400)
                .json({ message: "title or note cannot be empty" });
        }

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.body._id },
            { title: req.body.title, note: req.body.note },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(400).json({ message: "id not found" });
        }

        return res
            .status(200)
            .json({ message: "successful", updatedRecord: updatedNote });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server problem" });
    }
}

async function handleDeleteNote(req, res) {
    try {
        const result = await Note.deleteOne({ _id: req.body._id });
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: "deletion failed" });
        }
        return res.status(200).json({ message: "deletion successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Serverside problem" });
    }
}

// exporting
module.exports = {
    handleGetNote,
    handleGetAllNotes,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
};
