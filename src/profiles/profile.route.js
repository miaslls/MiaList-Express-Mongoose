const profile = require('express').Router();
const controller = require('./profile.controller');

const validate_id = require('../middleware/validate_id');

const tagRoute = require('../tags/tag.route');
const listRoute = require('../lists/list.route');
const entryRoute = require('../entries/entry.route');

profile.post('/', controller.createProfile);
profile.get('/', controller.findAllProfilesByUser);
profile.get('/:profileId', controller.findProfileById);

profile.use('/:profileName/tag', tagRoute);
profile.use('/:profileName/list', listRoute);
profile.use('/:profileName/entry', entryRoute);

module.exports = profile;
