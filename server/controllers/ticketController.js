import db from '../database/db.js';

export const canjearEntrada = async (req, res) => {
    const { numero_entrada } = req.params;

    try {
        const result = await new Promise((resolve, reject) => {
            db.run(
                'UPDATE entrada SET canjeada = true WHERE numero_entrada = ?',
                [numero_entrada],
                function (err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        const entrada = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM entrada WHERE numero_entrada = ?', [numero_entrada], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        res.json({ message: 'Entrada canjeada exitosamente', entrada });
    } catch (error) {
        console.error('Error al canjear entrada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 2. Obtener todas las entradas
export const obtenerEntradas = async (req, res) => {
    try {
        const entradas = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM entrada', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        res.json(entradas);
    } catch (error) {
        console.error('Error al obtener las entradas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 3. Asignar un usuario a una entrada con su evento
export const asignarUsuarioAEntrada = async (req, res) => {
    const { entrada_id, user_id } = req.body;

    try {
        const entrada = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM entrada WHERE id = ?', [entrada_id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!entrada) {
            return res.status(404).json({ message: 'Entrada no encontrada' });
        }

        const usuario = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM "user" WHERE id = ?', [user_id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const result = await new Promise((resolve, reject) => {
            db.run(
                'UPDATE entrada SET user_id = ? WHERE id = ?',
                [user_id, entrada_id],
                function (err) {
                    if (err) reject(err);
                    resolve(this.changes);
                }
            );
        });

        res.json({ message: 'Usuario asignado a la entrada', entrada });
    } catch (error) {
        console.error('Error al asignar usuario a la entrada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


export const asignarEntradaAUsuario = async (req, res) => {
    const { carnet, tipo } = req.body;

    try {
        const entradaDisponible = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, numero_entrada FROM entrada WHERE user_id IS NULL AND tipo = ? LIMIT 1',
                [tipo],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });

        if (!entradaDisponible) {
            return res.status(404).json({ message: `No hay entradas disponibles para el tipo: ${tipo}` });
        }

        const { id: entradaId, numero_entrada } = entradaDisponible;

        const nuevoUsuario = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO "user" (carnet) VALUES (?)',
                [carnet],
                function (err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });

        const userId = nuevoUsuario;

        await new Promise((resolve, reject) => {
            db.run(
                'UPDATE entrada SET user_id = ? WHERE id = ?',
                [userId, entradaId],
                function (err) {
                    if (err) reject(err);
                    resolve();
                }
            );
        });

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