import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './routes/ticketRoutes.js'; // Asegúrate de que el nombre es correcto

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/entradas', ticketRoutes); // Aquí estás configurando las rutas

app.get('/', (req, res) => {
    res.send('Servidor de la API de entradas');
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
