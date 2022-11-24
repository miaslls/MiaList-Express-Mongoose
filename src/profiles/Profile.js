const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false },
);

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles');

module.exports = Profile;
