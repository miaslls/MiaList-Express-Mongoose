const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    createdAt: { type: Date, required: true, default: new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  },
  { versionKey: false },
);

const Tag = mongoose.model('Tag', TagSchema, 'tags');

module.exports = Tag;
