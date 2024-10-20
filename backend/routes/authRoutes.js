import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';  // Import the controller functions

const router = express.Router();

// Define routes for login and signup
router.post('/login', login);    // POST /api/auth/login
router.post('/signup', signup);  // POST /api/auth/signup
router.get('/logout', logout)

export default router;
