import express from 'express';
const router = express.Router();

import * as controller from './list.controller.js';

import validate_id from '../middleware/validate_id.js';

router.post('/', controller.createList);
router.get('/', controller.findAllListsByUser);
router.patch('/:id', validate_id, controller.updateList);
router.delete('/:id', validate_id, controller.removeList);

export default router;
