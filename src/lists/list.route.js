import express from 'express';
const router = express.Router();

import * as controller from './list.controller.js';

import validate_id from '../middleware/validate_id.js';
import { validateBody_post, validateBody_patch } from './list.middleware.js';

router.post('/', validateBody_post, controller.createList);
router.get('/', controller.findAllListsByUser);
router.patch('/:id', validate_id, validateBody_patch, controller.updateList);
router.delete('/:id', validate_id, controller.removeList);

export default router;
