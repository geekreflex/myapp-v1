const express = require('express');
const {
  createNote,
  getNotes,
  updateNote,
  updateColor,
  deleteNote,
  pinNote,
} = require('../controllers/noteController');

const router = express.Router();

const { protect } = require('../middlewares/authMiddlewares');

router.post('/', protect, createNote);
router.get('/', protect, getNotes);
router.put('/:id', protect, updateNote);
router.put('/:id/color', protect, updateColor);
router.put('/:id/pin', protect, pinNote);
router.delete('/:id', protect, deleteNote);

module.exports = router;
