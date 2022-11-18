import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema(
  {
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    text: { type: String, required: true },
    starred: { type: Boolean },
    completed: { type: Boolean },
    createdAt: { type: Date, required: true, default: new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false },
);

const Entry = mongoose.model('Entry', EntrySchema, 'entries');

export default Entry;
