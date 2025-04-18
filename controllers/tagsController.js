const Tag = require('../models/Tag');

// GET /api/tags
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// GET /api/tags/:id
exports.getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

// POST /api/tags
exports.createTag = async (req, res, next) => {
  try {
    // Check if tag with the same name already exists
    const existingTag = await Tag.findOne({ name: req.body.name });
    if (existingTag) {
      return res.status(400).json({ message: 'Tag with this name already exists' });
    }

    // If not, create the new tag
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tags/:id
exports.updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tags/:id
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: 'Tag not found' });
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    next(error);
  }
};