import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    pinned: { type: Boolean },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
    createdAt: { type: Date, required: true, default: new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  },
  { versionKey: false },
);

const List = mongoose.model('List', ListSchema, 'lists');

export default List;
