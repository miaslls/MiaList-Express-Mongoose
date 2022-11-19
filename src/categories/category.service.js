import Category from './Category.js';

export const create = (body) => Category.create(body);

export const findAllByUser = (userId) => Category.find({ user: userId }).populate('user').sort({ name: 'asc' });

export const findById = (id) => Category.findById(id);

export const findByName = (name, user) => Category.findOne({ name: name, user: user });

export const update = (id, body) => Category.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => Category.findByIdAndRemove(id);
