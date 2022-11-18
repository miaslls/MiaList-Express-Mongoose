import Category from './Category.js';

export const create = (body) => Category.create(body);

export const findAllByUser = (userId) => Category.find({ user: userId }).sort({ ['name']: 1 });
