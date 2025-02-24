import pool from '../database/db.js';

export const canjearEntrada = async (req, res) => {
    const { numero_entrada } = req.params;

    try {
        const result = await pool.query(
            'UPDATE entrada SET canjeada = true WHERE numero_entrada = $1 RETURNING *',
            [numero_entrada]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        res.json({ message: 'Entrada canjeada exitosamente', entrada: result.rows[0] });
    } catch (error) {
        console.error('Error al canjear entrada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 2. Obtener todas las entradas
export const obtenerEntradas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entrada');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener las entradas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 3. Asignar un usuario a una entrada con su evento
export const asignarUsuarioAEntrada = async (req, res) => {
    const { entrada_id, user_id } = req.body;

    try {
        const entrada = await pool.query('SELECT * FROM entrada WHERE id = $1', [entrada_id]);
        if (entrada.rowCount === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        const usuario = await pool.query('SELECT * FROM "user" WHERE id = $1', [user_id]);
        if (usuario.rowCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const result = await pool.query(
            'UPDATE entrada SET user_id = $1 WHERE id = $2 RETURNING *',
            [user_id, entrada_id]
        );

        res.json({ message: 'Usuario asignado a la entrada', entrada: result.rows[0] });
    } catch (error) {
        console.error('Error al asignar usuario a la entrada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


export const asignarEntradaAUsuario = async (req, res) => {
    const { carnet, tipo } = req.body; // 📌 Recibe el carnet del usuario y el tipo de entrada

    try {
        const entradaDisponible = await pool.query(
            'SELECT id, numero_entrada FROM entrada WHERE user_id IS NULL AND tipo = $1 LIMIT 1',
            [tipo]
        );

        if (entradaDisponible.rowCount === 0) {
            return res.status(404).json({ message: `No hay entradas disponibles para el tipo: ${tipo}` });
        }

        const { id: entradaId, numero_entrada } = entradaDisponible.rows[0];

        const nuevoUsuario = await pool.query(
            'INSERT INTO "user" (carnet) VALUES ($1) RETURNING id',
            [carnet]
        );

        const userId = nuevoUsuario.rows[0].id;

        await pool.query(
            'UPDATE entrada SET user_id = $1 WHERE id = $2',
            [userId, entradaId]
        );

        res.json({
            message: 'Usuario registrado y entrada asignada',
            numero_entrada,
            tipo
        });

    } catch (error) {
        console.error('Error al asignar entrada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
