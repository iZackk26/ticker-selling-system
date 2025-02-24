import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Conectando a la base de datos...');

app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()'); // Prueba la conexión
      res.send(`🟢 Servidor funcionando. Hora en PostgreSQL: ${result.rows[0].now}`);
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).send('Error en la base de datos');
    }
  });

app.get('/api/', (req, res) => {
    res.send('Bienvenido a la API de empleados');
});


// Iniciar el servidor
const port = process.env.PORT || 3000;
const host = 'localhost';

app.listen(port, () => {
    console.log(`Servidor escuchando en http://${host}:${port}`);
});