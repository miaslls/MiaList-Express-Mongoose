import express from 'express';
const router = express.Router();

import * as controller from './user.controller.js';
import validate_id from '../middleware/validate_id.js';

router.post('/', controller.createUser);
router.get('/', controller.findAllUsers);
router.patch('/:id', validate_id, controller.updateUser);
router.delete('/:id', validate_id, controller.removeUser);

export default router;
