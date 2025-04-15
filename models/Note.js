const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  pinned: { type: Boolean, default: false },
  history: [
    {
      content: String,
      updatedAt: Date
    }
  ],
  // Uncomment if notes are user-specific:
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
