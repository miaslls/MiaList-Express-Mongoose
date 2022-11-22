const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    name: { type: String },
    email: { type: String, unique: true },
    CPF: { type: Number, unique: true },
  },
  { versionKey: false },
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
