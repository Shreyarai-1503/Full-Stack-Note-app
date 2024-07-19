import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdOn: { type: Date, default: Date.now }
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
