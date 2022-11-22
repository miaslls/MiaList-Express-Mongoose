const Tag = require('./Tag');

const create = (body) => Tag.create(body);

const findAllByProfile = (profileId) => Tag.find({ profile: profileId }).populate('user').sort({ name: 'asc' });

const findById = (id) => Tag.findById(id);

const findByName = (name, user, profile) => Tag.findOne({ name: name, user: user, profile: profile });

const update = (id, body) => Tag.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });

const remove = (id) => Tag.findByIdAndRemove(id);

module.exports = { create, findAllByProfile, findById, findByName, update, remove };
