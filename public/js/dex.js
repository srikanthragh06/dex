const bodyNoteEditor = document.querySelector(".body__note-editor");
const titleInput = document.querySelector(".title-input");
const noteInput = document.querySelector(".note-input");
const noteIdP = document.querySelector(".note-id");

const deleteBtns = document.querySelectorAll(".delete-note-btn");
const editBtns = document.querySelectorAll(".edit-note-btn");
const addBtn = document.querySelector(".add-note-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");

deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", async function () {
        try {
            const noteId = notes[i]._id;
            const res = await fetch("/note", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: noteId }),
            });
            if (res.status === 200) {
                location.reload();
            } else {
                console.log("Failed to delte Note");
            }
        } catch (err) {
            console.log(err);
        }
    });
});

editBtns.forEach((btn, i) => {
    btn.addEventListener("click", async function () {
        try {
            const noteId = notes[i]._id;
            bodyNoteEditor.style.display = "flex";
            const res = await fetch(`/note/${noteId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const noteData = (await res.json()).note;
                noteIdP.textContent = noteData._id;
                titleInput.value = noteData.title;
                noteInput.value = noteData.note;
            } else {
                console.log("Network response was not ok");
            }
        } catch (err) {
            console.log(err);
        }
    });
});

addBtn.addEventListener("click", function () {
    bodyNoteEditor.style.display = "flex";
    noteIdP.textContent = "";
    titleInput.value = "";
    noteInput.value = "";
});

cancelBtn.addEventListener("click", function () {
    bodyNoteEditor.style.display = "none";
});

saveBtn.addEventListener("click", async function () {
    try {
        const noteId = noteIdP.textContent;
        const title = titleInput.value;
        const note = noteInput.value;

        if (!noteId) {
            const res = await fetch(`/note`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title, note: note }),
            });
            if (res.ok) {
                location.reload();
            } else {
                console.log("Failed to add new note");
            }
        } else if (noteId) {
            const res = await fetch(`/note/${noteId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title, note: note }),
            });
            if (res.ok) {
                location.reload();
            } else {
                console.log("Failed to update the note");
            }
        }
    } catch (err) {
        console.log(err);
    }
});
