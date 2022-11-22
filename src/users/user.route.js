const user = require('express').Router();
const controller = require('./user.controller');

const authorize = require('../middleware/authorize');
const validate_id = require('../middleware/validate_id');
const { validateBody_post, validateBody_patch } = require('./user.middleware');

user.post('/', validateBody_post, controller.createUser);
user.get('/', authorize, controller.findAllUsers);
user.patch('/:id', authorize, validate_id, validateBody_patch, controller.updateUser);
user.delete('/:id', authorize, validate_id, controller.removeUser);

module.exports = user;
