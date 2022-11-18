import List from './List.js';

export const create = (body) => List.create(body);

export const findAllByUser = (userId) => List.find({ user: userId }).sort({ createdAt: 'desc' });

export const findById = (id) => List.findById(id);

export const findByName = (title) => List.findOne({ title: title });

export const update = (id, body) => List.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => List.findByIdAndRemove(id);
