const list = require('express').Router({ mergeParams: true });
const controller = require('./list.controller');

const { validateBody_post, validateBody_patch } = require('./list.middleware');

list.post('/', validateBody_post, controller.createList);
list.get('/', controller.findAllListsByUser);
list.patch('/:listId', validateBody_patch, controller.updateList);
list.delete('/:listId', controller.removeList);

module.exports = list;
