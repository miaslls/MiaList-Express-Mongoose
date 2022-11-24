const Profile = require('./Profile');

const create = (body) => Profile.create(body);

const findAllByUser = (userId) => Profile.find({ user: userId }).populate('user').sort({ name: 'asc' });

const findById = (id) => Profile.findById(id).populate('user');

const findByName = (name, userId) => Profile.findOne({ name: name, user: userId });

const update = (id, body) => Profile.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => Profile.findByIdAndDelete(id);

module.exports = { create, findAllByUser, findById, findByName, update, remove };
