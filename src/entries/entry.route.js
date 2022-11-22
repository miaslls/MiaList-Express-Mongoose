const entry = require('express').Router();
const controller = require('./entry.controller');

import validate_id from '../middleware/validate_id.js';
import { validateBody_post, validateBody_patch } from './entry.middleware.js';

entry.post('/', validateBody_post, controller.createEntry);
entry.get('/', controller.findAllEntriesByUser);
entry.patch('/:id', validate_id, validateBody_patch, controller.updateEntry);
entry.delete('/:id', validate_id, controller.removeEntry);

module.exports = entry;
