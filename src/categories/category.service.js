import Category from './Category.js';

export const findAllByUser = (userId) => Category.find({ user: userId });
