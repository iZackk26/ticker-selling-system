import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual (equivalente a __dirname en ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Usar una ruta local para la base de datos
const dbPath = path.resolve(__dirname, 'database.sqlite');

console.log('Intentando conectar a SQLite...');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conectado a SQLite');
  }
});

export default db;
