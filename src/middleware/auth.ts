import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Add this type extension
declare global {
  namespace Express {
    interface Request {
      admin?: any; // Or use a specific interface for admin
    }
  }
}

// Key fix: Ensure the middleware returns void
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {  // Explicit void return type
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // Just return without returning the response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.admin = decoded;
    next(); // Proceed to the route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};