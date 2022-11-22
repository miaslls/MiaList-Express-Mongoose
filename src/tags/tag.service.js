import Tag from './Tag.js';

export const create = (body) => Tag.create(body);

export const findAllByUser = (userId) => Tag.find({ user: userId }).populate('user').sort({ name: 'asc' });

export const findById = (id) => Tag.findById(id);

export const findByName = (name, user) => Tag.findOne({ name: name, user: user });

export const update = (id, body) => Tag.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => Tag.findByIdAndRemove(id);
