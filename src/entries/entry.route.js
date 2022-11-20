import express from 'express';
const router = express.Router();

import * as controller from './entry.controller.js';

import validate_id from '../middleware/validate_id.js';
import { validateBody_post, validateBody_patch } from './entry.middleware.js';

router.post('/', validateBody_post, controller.createEntry);
router.get('/', controller.findAllEntriesByUser);
router.patch('/:id', validate_id, validateBody_patch, controller.updateEntry);
router.delete('/:id', validate_id, controller.removeEntry);

export default router;
