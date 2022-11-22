const tag = require('express').Router();
const controller = require('./tag.controller');

import validate_id from '../middleware/validate_id.js';
import { validateBody } from './tag.middleware.js';

tag.post('/', validateBody, controller.createTag);
tag.get('/', controller.findAllTagsByUser);
tag.patch('/:id', validate_id, validateBody, controller.updateTag);
tag.delete('/:id', controller.removeTag);

module.exports = tag;
