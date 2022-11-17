import User from './User.js';

// TODO: update
// export const update = (id, body) => User.findByIdAndUpdate(id, body);

export const create = (body) => User.create(body);

export const findAll = () => User.find();
