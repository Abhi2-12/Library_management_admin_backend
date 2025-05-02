import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);

// In src/app.ts, ensure you have:
import profileRoutes from './routes/protectedRoutes'; // Your protected routes
app.use('/api', profileRoutes); // Matches http://localhost:3000/api/profile

// Export the configured Express app
export default app;  // <-- This is the critical line that was missing