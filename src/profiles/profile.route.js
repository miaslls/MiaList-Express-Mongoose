const profile = require('express').Router();
const controller = require('./profile.controller');

profile.post('/', controller.createProfile);
profile.get('/', controller.findAllProfilesByUser);

module.exports = profile;
