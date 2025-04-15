const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const foldersController = require('../controllers/foldersController');
const auth = require('../middlewares/auth');
const activityLogger = require('../middlewares/activityLogger');

// GET /api/folders
router.get('/', auth, foldersController.getFolders);

// GET /api/folders/:id
router.get('/:id', auth, [
  param('id').isMongoId().withMessage('Invalid folder id')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, foldersController.getFolderById);

// POST /api/folders
router.post(
  '/',
  auth,
  activityLogger,
  [ body('name').notEmpty().withMessage('Name is required') ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  foldersController.createFolder
);

// PUT /api/folders/:id
router.put(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid folder id'),
    body('name').notEmpty().withMessage('Name must not be empty')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  foldersController.updateFolder
);

// DELETE /api/folders/:id
router.delete(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid folder id')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  foldersController.deleteFolder
);

module.exports = router;
