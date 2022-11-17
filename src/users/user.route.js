import express from 'express';
const router = express.Router();

import * as controller from './user.controller.js';

router.get('/', controller.findAllUsers);

export default router;
