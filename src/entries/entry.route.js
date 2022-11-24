const entry = require('express').Router({ mergeParams: true });
const controller = require('./entry.controller');

const { validateBody_post, validateBody_patch } = require('./entry.middleware');

entry.post('/', validateBody_post, controller.createEntry);
entry.patch('/:entryId', validateBody_patch, controller.updateEntry);
entry.delete('/:entryId', controller.removeEntry);

module.exports = entry;
