
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
