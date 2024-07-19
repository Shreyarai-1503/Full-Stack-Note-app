import express from "express";
import { signup, login, getUser } from "./controllers/auth.js";
import { verifyToken } from "./util.js";
import { addNote, deleteNote, editNote, getAllNotes, searchNotes } from "./controllers/note.js";

const router = express.Router();

// auth routes
router.post("/signup", signup);
router.post("/login", login);

// Middleware
router.use(verifyToken);

router.get("/get-user", getUser);
// Note routes
router.post("/notes", addNote);
router.put("/notes/:id", editNote);
router.get("/notes", getAllNotes);
router.delete("/notes/:id", deleteNote);
router.get("/notes/search", searchNotes);

export default router;
