import express from 'express';
const router = express.Router();

import * as controller from './tag.controller.js';

import validate_id from '../middleware/validate_id.js';
import { validateBody } from './tag.middleware.js';

router.post('/', validateBody, controller.createTag);
router.get('/', controller.findAllTagsByUser);
router.patch('/:id', validate_id, validateBody, controller.updateTag);
router.delete('/:id', controller.removeTag);

export default router;
