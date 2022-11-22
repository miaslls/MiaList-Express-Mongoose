const list = require('express').Router();

import * as controller from './list.controller.js';

import validate_id from '../middleware/validate_id.js';
import { validateBody_post, validateBody_patch } from './list.middleware.js';

list.post('/', validateBody_post, controller.createList);
list.get('/', controller.findAllListsByUser);
list.patch('/:id', validate_id, validateBody_patch, controller.updateList);
list.delete('/:id', validate_id, controller.removeList);

module.exports = list;
