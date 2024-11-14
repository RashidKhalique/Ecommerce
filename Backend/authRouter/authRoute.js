import express from 'express';
import authController from '../Controllers/authController.js';

const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);



export default router;