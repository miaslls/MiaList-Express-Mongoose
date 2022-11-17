import User from './User.js';

export const create = (body) => User.create(body);

export const findAll = () => User.find();

export const findById = (id) => User.findById(id);

export const update = (id, body) => User.findByIdAndUpdate(id, body).setOptions({ returnOriginal: false });
