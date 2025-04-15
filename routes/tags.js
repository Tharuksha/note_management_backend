const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const tagsController = require('../controllers/tagsController');
const auth = require('../middlewares/auth');
const activityLogger = require('../middlewares/activityLogger');

// GET /api/tags
router.get('/', auth, tagsController.getTags);

// GET /api/tags/:id
router.get('/:id', auth, [
  param('id').isMongoId().withMessage('Invalid tag id')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, tagsController.getTagById);

// POST /api/tags
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
  tagsController.createTag
);

// PUT /api/tags/:id
router.put(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid tag id'),
    body('name').notEmpty().withMessage('Name must not be empty')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  tagsController.updateTag
);

// DELETE /api/tags/:id
router.delete(
  '/:id',
  auth,
  activityLogger,
  [
    param('id').isMongoId().withMessage('Invalid tag id')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  tagsController.deleteTag
);

module.exports = router;
