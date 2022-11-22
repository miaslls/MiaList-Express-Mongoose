const auth = require('express').Router();
const login = require('./auth.controller');

auth.post('/', login);

module.exports = auth;
