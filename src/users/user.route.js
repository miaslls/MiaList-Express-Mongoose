import express from 'express';
const router = express.Router();

import * as controller from './user.controller.js';

router.post('/', controller.createUser);
router.get('/', controller.findAllUsers);

export default router;
