import express from 'express';
import { allUsers, signup } from '../Controllers/user.controller.js';
import { login } from '../Controllers/user.controller.js';
import { logout } from '../Controllers/user.controller.js';
import SecureRoute from '../Middleware/SecureRoute.js'
const router = express.Router();
router.post('/signup',signup);
router.post("/login",login);
router.post("/logout",logout);
router.get('/allusers',SecureRoute,allUsers);
export default router;
