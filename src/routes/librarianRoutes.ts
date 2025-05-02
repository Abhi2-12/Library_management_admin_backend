import express from 'express';
import { verifyToken } from '../middleware/auth';
import { query } from '../config/db';

const router = express.Router();

// Protected route
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await query('SELECT * FROM librarians');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;