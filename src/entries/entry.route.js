import express from 'express';
const router = express.Router();

import * as controller from './entry.controller.js';

import validate_id from '../middleware/validate_id.js';

router.post('/', controller.createEntry);
router.get('/', controller.findAllEntriesByUser);
router.patch('/:id', validate_id, controller.updateEntry);

export default router;
