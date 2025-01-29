import express from 'express';
import { registerUser, login, logout } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import colors from 'colors'


const router = express.Router();

console.log("Continuando desde authRoutes.js".blue)

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
// router.post('/requestPasswordReset', requestPasswordReset);
// router.post('/resetPassword', resetPassword);
// router.get('/board', verifyToken, (req, res) => {
router.get('/board', (req, res) => {
    res.status(200).json({ message: `Welcome to the board, user ID: ${req.user.id}` });
  });


export default router;
