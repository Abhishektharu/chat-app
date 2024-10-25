import express from 'express';
import {getMessage, sendMessage} from '../controllers/messageController.js'
import protectRoute from '../middlewares/protectRoute.js';
import { getUsersForSidebar } from '../controllers/getUserController.js';

const router = express.Router();

router.get('/:id', protectRoute,getMessage);
router.post('/send/:id', protectRoute, sendMessage);


export default router;