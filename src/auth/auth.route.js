import express from 'express';
const router = express.Router();

import login from './auth.controller.js';

router.post('/', login);

export default router;
