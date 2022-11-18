import express from 'express';
const router = express.Router();

import * as controller from './category.controller.js';

import validate_id from '../middleware/validate_id.js';

router.post('/', controller.createCategory);
router.get('/', controller.findAllCategoriesByUser);
router.patch('/:id', validate_id, controller.updateCategory);

export default router;
