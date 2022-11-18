import User from '../users/User.js';
import jwt from 'jsonwebtoken';

export const getUser = (username) => User.findOne({ username: username }).select('+password');

export const generateToken = (payload) => {
  return jwt.sign({ user: payload }, process.env.SECRET, { expiresIn: 86400 });
};
