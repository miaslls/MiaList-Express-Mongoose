import User from './User.js';

export const create = (body) => User.create(body);

export const findAll = () => User.find().sort({ username: 'asc' });

export const findById = (id) => User.findById(id);

export const findByUsername = (username) => User.findOne({ username: username });

export const update = (id, body) => User.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => User.findByIdAndDelete(id).select('-password');
