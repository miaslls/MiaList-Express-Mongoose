import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  },
  { versionKey: false },
);

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles');

export default Profile;
