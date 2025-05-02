import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required' });
    return;
  }

  try {
    const result = await query(
      'SELECT id, username FROM admins WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const admin = result.rows[0];
    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err: unknown) { // Properly typed catch
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Login error:', errorMessage);
    res.status(500).json({ 
      message: 'Authentication failed',
      ...(process.env.NODE_ENV === 'development' && { error: errorMessage })
    });
  }
};