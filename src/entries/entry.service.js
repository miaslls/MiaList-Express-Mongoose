const Entry = require('./Entry');

const create = (body) => Entry.create(body);

const findAllByUser = (userId) => Entry.find({ user: userId }).populate('user').sort({ createdAt: 'desc' });

const findDuplicate = (list, text) => Entry.findOne({ list: list, text: text });

const findById = (id) => Entry.findById(id);

const update = (id, body) => Entry.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => Entry.findByIdAndRemove(id);

module.exports = { create, findAllByUser, findDuplicate, findById, update, remove };
