const List = require('./List');

const create = (body) => List.create(body);

const findAllByProfile = (profileId) =>
  List.find({ profile: profileId }).populate('user').populate('tags').populate('entries').sort({ title: 'asc' });

const findById = (id) => List.findById(id);

const findByTitle = (title, profileId) => List.findOne({ title: title, profile: profileId });

const update = (id, body) => List.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => List.findByIdAndRemove(id);

module.exports = { create, findAllByProfile, findById, findByTitle, update, remove };
