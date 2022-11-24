const List = require('./List');

const create = (body) => List.create(body);

const findAllByProfile = (profileId) =>
  List.find({ user: profileId }).populate('user').populate('tags').populate('entries').sort({ title: 'asc' });

const findById = (id) => List.findById(id);

const findByTitle = (title, user) => List.findOne({ title: title, user: user });

const update = (id, body) => List.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => List.findByIdAndRemove(id);

module.exports = { create, findAllByProfile, findById, findByTitle, update, remove };
