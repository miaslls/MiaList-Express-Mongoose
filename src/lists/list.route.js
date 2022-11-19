import express from 'express';
const router = express.Router();

import * as controller from './list.controller.js';

router.get('/', controller.findAllListsByUser);

export default router;
