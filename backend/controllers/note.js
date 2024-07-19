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

//Search Notes 
export const searchNotes = async(req, res) => {
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error: true, message: "Search query is required"});
    }

    try {
        const matchingNotes = await Note.find({
            $or: [
                { title: { $regex: new RegExp(query, "i" )} },
                { content: { $regex: new RegExp(query, "i" )} }
            ]
        });
        console.log(matchingNotes);
        return res.json({error: false, notes: matchingNotes, message: "Notes matching the search query retrieved successfully"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}
