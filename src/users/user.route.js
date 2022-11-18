import express from 'express';
const router = express.Router();

import * as controller from './user.controller.js';

import authorize from '../middleware/authorize.js';
import validate_id from '../middleware/validate_id.js';
import * as middleware from './user.middleware.js';

router.post('/', middleware.validateBody_post, controller.createUser);
router.get('/', authorize, controller.findAllUsers);
router.patch('/:id', authorize, validate_id, middleware.validateBody_patch, controller.updateUser);
router.delete('/:id', authorize, validate_id, controller.removeUser);

export default router;
