const tag = require('express').Router({ mergeParams: true });
const controller = require('./tag.controller');

const { validateBody } = require('./tag.middleware');

tag.post('/', validateBody, controller.createTag);
tag.get('/', controller.findAllTagsByUser);
tag.patch('/:tagId', validateBody, controller.updateTag);
tag.delete('/:tagId', controller.removeTag);

module.exports = tag;
