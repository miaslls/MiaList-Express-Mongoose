import express from 'express';
const router = express.Router();

import * as controller from './entry.controller.js';

router.get('/', controller.findAllEntriesByUser);

export default router;
