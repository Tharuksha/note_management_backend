const Folder = require('../models/Folder');

// GET /api/folders
exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (error) {
    next(error);
  }
};

// GET /api/folders/:id
exports.getFolderById = async (req, res, next) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.json(folder);
  } catch (error) {
    next(error);
  }
};

// POST /api/folders
exports.createFolder = async (req, res, next) => {
  try {
    const folder = new Folder(req.body);
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    next(error);
  }
};

// PUT /api/folders/:id
exports.updateFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.json(folder);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/folders/:id
exports.deleteFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    next(error);
  }
};
