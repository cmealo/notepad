// api/notes.js
import express from "express";
import { getNotes, getNoteById, addNote } from "#db/notes";

const router = express.Router();

// GET /notes -- return full list of notes

router.get("/", (req, res) => {
  res.json(getNotes());
});

// Post /notes -- post new notes

router.post("/", (req, res) => {
  // When no body is sent (and no Content-Type), req.body will be undefined
  if (req.body === undefined) {
    return res.status(400).send("Request must have a body.");
  }

  const { text } = req.body;
  if (text === undefined) {
    return res.status(400).send("New note must have text.");
  }

  const created = addNote(text);
  return res.status(201).json(created);
});

// GET /notes/:id -- return specific note (or 404 if not found)

router.get("/:id", (req, res) => {
  const note = getNoteById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found.");
  }
  return res.json(note);
});

export default router;
