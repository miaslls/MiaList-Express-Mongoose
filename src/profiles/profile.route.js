import express from 'express';
const router = express.Router();

import * as controller from './profile.controller.js';

router.post('/', controller.createProfile);
router.get('/', controller.findAllProfilesByUser);

export default router;
