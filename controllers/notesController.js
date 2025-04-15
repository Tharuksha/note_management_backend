const Note = require('../models/Note');

// GET /api/notes
exports.getNotes = async (req, res, next) => {
  try {
    const filter = {};
    // If using user authentication, limit notes to the owner:
    filter.owner = req.user._id;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    const notes = await Note.find(filter).populate('tags folder');
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id }).populate('tags folder');
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const note = new Note(req.body);
    note.owner = req.user._id;
    await note.save();
    // Emit socket event for real-time update
    req.app.get('io') && req.app.get('io').emit('noteEvent', { event: 'created', data: note });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    let note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    // Save previous version if content is being updated
    if (req.body.content && note.content !== req.body.content) {
      note.history.push({ content: note.content, updatedAt: new Date() });
    }
    Object.assign(note, req.body);
    await note.save();
    req.app.get('io') && req.app.get('io').emit('noteEvent', { event: 'updated', data: note });
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    req.app.get('io') && req.app.get('io').emit('noteEvent', { event: 'deleted', data: note });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// GET /api/notes/:id/export
exports.exportNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    const format = req.query.format || 'markdown';
    if (format === 'markdown') {
      res.setHeader('Content-Disposition', `attachment; filename="${note.title}.md"`);
      res.type('text/markdown');
      res.send(`# ${note.title}\n\n${note.content}`);
    } else if (format === 'pdf') {
      // PDF export stub – integrate a PDF generation library (e.g., PDFKit) if needed.
      res.status(501).json({ message: 'PDF export not implemented yet' });
    } else {
      res.status(400).json({ message: 'Invalid export format' });
    }
  } catch (error) {
    next(error);
  }
};
