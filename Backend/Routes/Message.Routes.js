import express from 'express';
import { sendMessage } from '../Controllers/message.controller.js';
import { getMessage } from '../Controllers/getmessage.js';  // FIXED: getmessage not getmesage
import secureRoute from '../Middleware/SecureRoute.js';

const router = express.Router();

// Send message to a specific user
router.post('/send/:id', secureRoute, sendMessage);

// Get messages from a specific user
router.get('/get/:id', secureRoute, getMessage);

export default router;