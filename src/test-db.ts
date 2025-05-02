import { query } from './config/db';

async function testConnection() {
  try {
    const res = await query('SELECT * FROM admin');
    console.log('Database connected! Admin data:', res.rows);
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

testConnection();