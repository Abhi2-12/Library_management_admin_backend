import { Request, Response } from 'express';
import { query } from '../config/db';

export const addLibrarian = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ 
        success: false,
        message: 'Name, email and password are required' 
      });
      return;
    }

    const result = await query(
      `INSERT INTO librarians 
       (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email, role, created_at`,
      [name, email, password]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err: any) {
    console.error('Database error:', err);
    
    if (err.code === '23505') {
      res.status(400).json({
        success: false,
        message: 'This email is already registered'
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};


// UPDATE Librarian (PUT)
export const updateLibrarian = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    try {
      const result = await query(
        `UPDATE librarians 
         SET name = $1, email = $2, updated_at = NOW() 
         WHERE id = $3 
         RETURNING id, name, email, role, created_at, updated_at`,
        [name, email, id]
      );
  
      if (result.rowCount === 0) {
        res.status(404).json({ 
          success: false, 
          message: 'Librarian not found' 
        });
        return;
      }
  
      res.json({ 
        success: true, 
        data: result.rows[0] 
      });
    } catch (err: any) {
      console.error('Database error:', err);
      
      if (err.code === '23505') {
        res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        message: 'Failed to update librarian'
      });
    }
  };
  
  // DELETE Librarian
  export const deleteLibrarian = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const result = await query(
        'DELETE FROM librarians WHERE id = $1 RETURNING id',
        [id]
      );
  
      if (result.rowCount === 0) {
        res.status(404).json({ 
          success: false, 
          message: 'Librarian not found' 
        });
        return;
      }
  
      res.json({ 
        success: true, 
        message: 'Librarian deleted successfully' 
      });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to delete librarian'
      });
    }
  };

export const getLibrarians = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      'SELECT id, name, email, role, created_at FROM librarians'
    );
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch librarians'
    });
  }
};