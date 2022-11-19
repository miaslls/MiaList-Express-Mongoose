import express from 'express';
const router = express.Router();

import * as controller from './list.controller.js';

router.post('/', controller.createList);
router.get('/', controller.findAllListsByUser);

export default router;
