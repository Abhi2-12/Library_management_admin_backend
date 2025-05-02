import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: String('1234'), // Explicitly convert to string
  host: 'localhost',
  database: 'library_management',
  port: 5432,
  ssl: false // Disable SSL for local development
});

// Add this to db.ts
pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Test connection on startup
(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

export const query = (text: string, params?: any[]) => pool.query(text, params);