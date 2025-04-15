const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const notesController = require('../controllers/notesController');
const auth = require('../middlewares/auth');
const activityLogger = require('../middlewares/activityLogger');

// GET /api/notes
router.get('/', auth, notesController.getNotes);

// GET /api/notes/:id - Validate that id is a valid MongoDB ObjectID
router.get('/:id', auth, [ 
  param('id').isMongoId().withMessage('Invalid note id')
], (req, res, next) => {
  // Check for param validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, notesController.getNoteById);

// POST /api/notes
router.post(
  '/',
  auth,
  activityLogger,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  notesController.createNote
);

// PUT /api/notes/:id
router.put(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid note id'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  notesController.updateNote
);

// DELETE /api/notes/:id
router.delete(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid note id')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  notesController.deleteNote
);

// GET /api/notes/:id/export
router.get(
  '/:id/export',
  auth,
  [
    param('id').isMongoId().withMessage('Invalid note id')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  notesController.exportNote
);

module.exports = router;
