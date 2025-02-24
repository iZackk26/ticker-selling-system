
create database andamo_despechado;

-- Tabla de Evento
CREATE TABLE evento (
    id SERIAL PRIMARY KEY,
    lugar VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);

-- Tabla de User (propietario de la entrada)
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    carnet VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de Entrada
CREATE TABLE entrada (
    id SERIAL PRIMARY KEY,
    numero_entrada VARCHAR(50) NOT NULL,  -- Número alfanumérico
    canjeada BOOLEAN NOT NULL DEFAULT false,
    tipo VARCHAR(50),                     -- Tipo de entrada (agregado)
    evento_id INTEGER NOT NULL,
    user_id INTEGER,                      -- Relación opcional con el usuario
    CONSTRAINT fk_evento FOREIGN KEY (evento_id) REFERENCES evento(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);


INSERT INTO entrada (numero_entrada, canjeada, tipo, evento_id, user_id) VALUES
('8c3e67f9d4b24a1ea34b3e8b7f9e4d50f6c8fbd9', false, 'Sin transporte', 1, NULL),
('5a2c9d8b1f304a7e947f2a6e6a1b3d79b5e4a9c7', false, 'Con transporte', 1, NULL),
('f3d6b4c9a8e7d2c1b5a4f8e3d7b6c2a9f4e5d1b8', false, 'Sin transporte', 1, NULL),
('9a8c6d4e3b7f2a1d5c8e9b4f6d7a3c2e5b1f8a9d', false, 'Con transporte', 1, NULL),
('7c5a9b8f4d2e3a1c6b7f5d9e8a3c2b4f6d1a9e7f', false, 'Sin transporte', 1, NULL),
('6a3d9f8c4b2e7a5c1b6d8f9e3a4c2b7f5d1e9a8c', false, 'Con transporte', 1, NULL),
('f9a7b6d4c2e3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Sin transporte', 1, NULL),
('8c7a5d9b4f2e3a1c6b8f7d9e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('5d9c8a7b4f2e3a1c6b8f9d7e3a4c2b5f6d1e9a8c', false, 'Sin transporte', 1, NULL),
('2a7d9c8b4f3e1a5c6b9f7d8e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('d9a7b6c4e2f3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Sin transporte', 1, NULL),
('7c9a5b8d4e2f3a1c6b8f9d7e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('6b9c8a7d4f2e3a1c5b8f9d7e3a4c2b5f6d1e9a8c', false, 'Sin transporte', 1, NULL),
('3a7d9c8b4f2e1a5c6b9f7d8e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('e9a7b6c4d2f3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Sin transporte', 1, NULL),
('f7a9b6d4c2e3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Con transporte', 1, NULL),
('9c7a5d8b4f2e3a1c6b8f7d9e3a4c2b5f6d1e9a8c', false, 'Sin transporte', 1, NULL),
('6d9c8a7b4f2e3a1c5b8f9d7e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('2a9d7c8b4f3e1a5c6b9f7d8e3a4c2b5f6d1e9a8c', false, 'Sin transporte', 1, NULL),
('e9b7a6c4d2f3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Con transporte', 1, NULL),
('f7c9a6b4d2e3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Sin transporte', 1, NULL),
('9d7a5c8b4f2e3a1c6b8f7d9e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('6c9d8a7b4f2e3a1c5b8f9d7e3a4c2b5f6d1e9a8c', false, 'Sin transporte', 1, NULL),
('2d9a7c8b4f3e1a5c6b9f7d8e3a4c2b5f6d1e9a8c', false, 'Con transporte', 1, NULL),
('e9c7a6b4d2f3a1c5b8f9d7e6a4c2b3f5d1e9a8c7', false, 'Sin transporte', 1, NULL);

INSERT INTO entrada (numero_entrada, canjeada, tipo, evento_id, user_id) VALUES
('a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8c9d0e1f2a3', false, 'Sin transporte', 1, NULL),
('b2c3d4e5f6a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0', false, 'Con transporte', 1, NULL),
('c3d4e5f6a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2', false, 'Sin transporte', 1, NULL),
('d4e5f6a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3', false, 'Con transporte', 1, NULL),
('e5f6a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4', false, 'Sin transporte', 1, NULL),
('f6a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5', false, 'Con transporte', 1, NULL),
('a7b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6', false, 'Sin transporte', 1, NULL),
('b8c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7', false, 'Con transporte', 1, NULL),
('c9d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8', false, 'Sin transporte', 1, NULL),
('d0e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8c9', false, 'Con transporte', 1, NULL),
('e1f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8c9d0', false, 'Sin transporte', 1, NULL),
('f2a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8c9d0e1', false, 'Con transporte', 1, NULL),
('a3a1f4d5b6c7e8f9a0b2c3d4e5f6a7b8c9d0e1f2', false, 'Sin transporte', 1, NULL),
('a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0', false, 'Con transporte', 1, NULL),
('b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9', false, 'Sin transporte', 1, NULL),
('c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9b8', false, 'Con transporte', 1, NULL),
('d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9b8c7', false, 'Sin transporte', 1, NULL),
('e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9b8c7d6', false, 'Con transporte', 1, NULL),
('f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9b8c7d6e5', false, 'Sin transporte', 1, NULL),
('a3b2c1d0e9f8a7b6c5d4e3f2a1b0a9b8c7d6e5f4', false, 'Con transporte', 1, NULL);
