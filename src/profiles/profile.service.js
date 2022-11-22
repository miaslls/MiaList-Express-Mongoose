import Profile from './Profile.js';

export const create = (body) => Profile.create(body);

export const findAllByUser = (userId) =>
  Profile.find({ user: userId }).populate('user').populate('tags').populate('lists').sort({ name: 'asc' });

export const findById = (id) => Profile.findById(id).populate('user').populate('tags').populate('lists');

export const findByName = (name, userId) => Profile.findOne({ name: name, user: userId });

export const update = (id, body) => Profile.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => Profile.findByIdAndDelete(id);
