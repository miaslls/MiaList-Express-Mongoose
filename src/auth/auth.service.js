const User = require('../users/User');
const jwt = require('jsonwebtoken');

const getUser = (username) => User.findOne({ username: username }).select('+password');

const generateToken = (payload) => {
  return jwt.sign({ user: payload }, process.env.SECRET, { expiresIn: 86400 });
};

module.exports = { getUser, generateToken };
