import express from 'express';
import { loginAdmin } from '../controllers/authController';

const router = express.Router();

// Error should now disappear
router.post('/admin/login', loginAdmin);

export default router;