const profile = require('express').Router();
const controller = require('./profile.controller');

const validate_id = require('../middleware/validate_id');
const { validateBody_post, validateBody_patch } = require('./profile.middleware');

const tagRoute = require('../tags/tag.route');
const listRoute = require('../lists/list.route');
const entryRoute = require('../entries/entry.route');

profile.post('/', validateBody_post, controller.createProfile);
profile.get('/', controller.findAllProfilesByUser);
profile.get('/:id', validate_id, controller.findProfileById);
profile.patch('/:id', validate_id, validateBody_patch, controller.updateProfile);
profile.delete('/:id', validate_id, controller.removeProfile);

profile.use('/:profileId/tag', tagRoute);
profile.use('/:profileId/list', listRoute);
profile.use('/:profileId/entry', entryRoute);

module.exports = profile;
