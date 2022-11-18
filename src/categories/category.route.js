import express from 'express';
const router = express.Router();

import * as controller from './category.controller.js';

router.get('/', controller.findAllCategoriesByUser);

export default router;
