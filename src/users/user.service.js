const User = require('./User');

const create = (body) => User.create(body);

const findAll = () => User.find().sort({ username: 'asc' });

const findById = (id) => User.findById(id);

const findByUsername = (username) => User.findOne({ username: username });

const update = (id, body) => User.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => User.findByIdAndDelete(id).select('-password');

module.exports = { create, findAll, findById, findByUsername, update, remove };
