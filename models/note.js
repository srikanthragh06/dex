// importing internal objects
const { Schema, model } = require("mongoose");

// creating user schema
noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

// model creation
const Note = model("Note", noteSchema);

// exporting
module.exports = Note;
