const Tag = require('./Tag');

const create = (body) => Tag.create(body);

const findAllByUser = (userId) => Tag.find({ user: userId }).populate('user').sort({ name: 'asc' });

const findById = (id) => Tag.findById(id);

const findByName = (name, user) => Tag.findOne({ name: name, user: user });

const update = (id, body) => Tag.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => Tag.findByIdAndRemove(id);

module.exports = { create, findAllByUser, findById, findByName, update, remove };
