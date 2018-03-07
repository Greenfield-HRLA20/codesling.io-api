import express from 'express';

import { msgController, fetchMessagesController } from './msgControllers';

const router = express.Router();

router.route('/').post(msgController);

router.route('/:sender_id').get(fetchMessagesController);

export default router;
