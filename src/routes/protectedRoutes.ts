// src/routes/protectedRoutes.ts
import express from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Protected route example
// In your route file
router.get('/profile', verifyToken as express.RequestHandler, (req, res) => {
    res.json({ 
      message: 'Protected data', 
      admin: req.admin 
    });
  });
export default router;