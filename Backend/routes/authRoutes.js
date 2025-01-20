import express from 'express';
import { registerUser, login, logout } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import colors from 'colors'


const router = express.Router();

console.log("Continuando desde authRoutes.js".blue)

router.post('/register', registerUser);
router.post('/login', login);
router.get('/logout', logout);
router.get('/board', verifyToken, (req, res) => {
    res.status(200).json({ message: `Welcome to the board, user ID: ${req.user.id}` });
  });


export default router;
