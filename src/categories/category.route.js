import express from 'express';
const router = express.Router();

import * as controller from './category.controller.js';

import validate_id from '../middleware/validate_id.js';
import { validateBody } from './category.middleware.js';

router.post('/', validateBody, controller.createCategory);
router.get('/', controller.findAllCategoriesByUser);
router.patch('/:id', validate_id, validateBody, controller.updateCategory);
router.delete('/:id', controller.removeCategory);

export default router;
