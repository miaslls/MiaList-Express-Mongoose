import Entry from './Entry.js';

export const create = (body) => Entry.create(body);

export const findAllByUser = (userId) => Entry.find({ user: userId }).populate('user').sort({ createdAt: 'desc' });

export const findById = (id) => Entry.findById(id);

export const update = (id, body) => Entry.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

export const remove = (id) => Entry.findByIdAndRemove(id);
