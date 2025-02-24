import express from 'express';
import {
    canjearEntrada,
    obtenerEntradas,
    asignarUsuarioAEntrada,
    asignarEntradaAUsuario
} from '../controllers/ticketController.js';

const router = express.Router();

router.put('/:numero_entrada/canjear', canjearEntrada);
router.put('/asignar', asignarUsuarioAEntrada);

router.get('/', obtenerEntradas);

router.put('/asignar', asignarUsuarioAEntrada);

export default router;
