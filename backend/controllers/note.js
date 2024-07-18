import Note from "../models/note.model.js";

// Add a new note
export const addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const userId = req.user.id; // Assuming userId is extracted from the token

    try {
        const newNote = new Note({
            title,
            content,
            tags,
            userId
        });
        await newNote.save();

        res.status(201).json({newNote, message: "Note added successfully"});
    } catch (error) {
        res.status(500).json({ message: "Failed to add note" });
    }
};

// Edit a note
export const editNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, tags }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({updatedNote, message: "Note edited successfully"});
    } catch (error) {
        res.status(500).json({ message: "Failed to edit note" });
    }
};

// Get all notes for a user
export const getAllNotes = async (req, res) => {
    const userId = req.user.id; // Assuming userId is extracted from the token

    try {
        const notes = await Note.find({ userId });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes" });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete note" });
    }
};

// Pin or unpin a note
export const pinNote = async (req, res) => {
    const { id } = req.params;
    const { pinned } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { pinned }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Failed to pin/unpin note" });
    }
};
