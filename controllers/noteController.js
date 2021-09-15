const Note = require('../models/noteModel');

const createNote = async (req, res) => {
  const { title, content } = req.body;

  const newNote = new Note({
    title,
    content,
    user: req.user._id,
  });

  const createdNote = await newNote.save();
  return res.status(201).json(createdNote);
};

const getNotes = async (req, res) => {
  const notes = await Note.find({ user: _id }).sort({ createdAt: -1 });

  if (notes) {
    return res.status(200).json({
      message: 'Notes retrieved successfully',
      notes,
    });
  } else {
    res.status(404).json({
      message: 'Note not found',
    });
  }
};

const updateNote = async (req, res) => {
  const { title, body } = req.body;

  const note = await Note.findById(req.params.id);

  if (note) {
    note.title = title;
    note.body = body;

    const updatedNote = await note.save();
    return res.json({
      message: 'Note updated successfully',
      updatedNote,
    });
  } else {
    res.status(404).json({
      message: 'Note not found',
    });
  }
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.user._id);

  if (note) {
    await note.remove();
    return res.json({
      message: 'Note deleted successfully',
      note,
    });
  } else {
    res.status(404).json({
      message: 'Note not found',
    });
  }
};

const updateColor = async (req, res) => {
  const { color } = req.body;

  const note = await Note.findById(req.params.id);

  if (note) {
    note.color = color;

    await note.save();
    return res.json({
      message: 'Color updated',
      note,
    });
  } else {
    res.status(404).json({
      message: 'Error occurred',
    });
  }
};

const pinNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    note.pinned = !note.pinned;
    await note.save();
    return res.json({
      message: note.pinned ? 'Note pinned' : 'Note unpinned',
      note,
    });
  } else {
    res.status(404).json({
      message: 'Error occurred',
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  updateColor,
  pinNote,
};
