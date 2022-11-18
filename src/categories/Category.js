import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    createdAt: { type: Date, required: true, default: new Date() },
  },
  { versionKey: false },
);

const Category = mongoose.model('Category', CategorySchema, 'categories');

export default Category;
