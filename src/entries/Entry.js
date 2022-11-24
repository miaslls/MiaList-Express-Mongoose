const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema(
  {
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    text: { type: String, required: true },
    starred: { type: Boolean },
    completed: { type: Boolean },
    createdAt: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  },
  { versionKey: false },
);

const Entry = mongoose.model('Entry', EntrySchema, 'entries');

module.exports = Entry;
