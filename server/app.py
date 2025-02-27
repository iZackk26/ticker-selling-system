from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import qrcode
import cv2
import random
import string
from pyzbar import pyzbar
import os
import sqlite3
import hashlib
from PIL import Image, ImageDraw, ImageFont
import io
from fastapi.responses import StreamingResponse

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Insecure
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def conectar_db():
    conn = sqlite3.connect('evento.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS entradas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fake_id TEXT NOT NULL UNIQUE,
            hash TEXT NOT NULL UNIQUE,
            usado INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    return conn


def generar_hash(entrada_id):
    return hashlib.sha256(f"andamo_despechao_{entrada_id}".encode()).hexdigest()


def generar_fake_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


def generar_qr(color: str):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute('SELECT MAX(id) FROM entradas')
    max_id = cursor.fetchone()[0] or 0
    entrada_id = max_id + 1

    hash_entrada = generar_hash(entrada_id)
    fake_id = generar_fake_id()

    while True:
        cursor.execute('SELECT COUNT(*) FROM entradas WHERE fake_id = ?', (fake_id,))
        if cursor.fetchone()[0] == 0:
            break
        fake_id = generar_fake_id()

    cursor.execute('INSERT INTO entradas (fake_id, hash) VALUES (?, ?)', (fake_id, hash_entrada))
    conn.commit()
    entrada_id = cursor.lastrowid

    info = f"Fake ID: {fake_id}\nID: {entrada_id}\nEvento: andamo_despechao\nHash: {hash_entrada}"

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(info)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color=color, back_color="#fff").convert("RGBA")

    background = Image.open("fondo.png").convert("RGBA")
    qr_size = int(min(background.size) // 1.2)
    qr_img = qr_img.resize((qr_size, qr_size), Image.LANCZOS)

    temp_img = Image.new("RGBA", background.size, (255, 255, 255, 0))
    bg_w, bg_h = background.size
    qr_w, qr_h = qr_img.size
    position = ((bg_w - qr_w) // 2, (bg_h - qr_h) // 2)
    temp_img.paste(qr_img, position, qr_img)

    draw = ImageDraw.Draw(temp_img)
    font_path = "./Arial.ttf"
    font = ImageFont.truetype(font_path, 80)
    text_bbox = draw.textbbox((0, 0), fake_id, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    text_position = ((bg_w - text_w) // 2, position[1] - 100)
    draw.text(text_position, fake_id, fill="black", font=font)

    final_img = Image.alpha_composite(background, temp_img)

    if not os.path.exists('entradas_qr'):
        os.makedirs('entradas_qr')
    path = f'entradas_qr/{entrada_id}.png'
    final_img.save(path)
    conn.close()

    return path


@app.get("/generate_qr/")
async def generate_qr(tipo_entrada: str):
    if tipo_entrada not in ["1", "2"]:
        raise HTTPException(status_code=400, detail="Opción no válida.")

    color = "#a02828" if tipo_entrada == "1" else "#114e9e"
    path = generar_qr(color)

    return {"qr_image_path": path}


@app.get("/validate_qr/")
async def validate_qr():
    conn = conectar_db()
    cursor = conn.cursor()
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        decoded_objects = pyzbar.decode(frame)

        for obj in decoded_objects:
            data = obj.data.decode('utf-8')
            lines = data.split('\n')
            fake_id = lines[0].split(': ')[1]
            hash_entrada = lines[3].split(': ')[1]

            cursor.execute('SELECT usado FROM entradas WHERE fake_id = ? AND hash = ?', (fake_id, hash_entrada))
            resultado = cursor.fetchone()

            if resultado:
                usado = resultado[0]
                if usado == 0:
                    cap.release()
                    cv2.destroyAllWindows()
                    return {"status": "Entrada válida", "data": data}
                else:
                    cap.release()
                    cv2.destroyAllWindows()
                    return {"status": "Entrada ya usada", "data": data}
            else:
                cap.release()
                cv2.destroyAllWindows()
                return {"status": "Entrada no válida", "data": data}

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    conn.close()


@app.get("/validate_qr_web/")
async def validate_qr(fake_id: str, hash: str):
    conn = conectar_db()
    cursor = conn.cursor()

    # Verificar si el id y hash corresponden a una entrada válida
    cursor.execute('SELECT usado FROM entradas WHERE fake_id = ? AND hash = ?', (fake_id, hash))
    resultado = cursor.fetchone()

    print(resultado)

    if resultado:
        usado = resultado[0]
        if usado == 0:
            return {"status": "Entrada válida", "data": {"id": fake_id, "hash": hash}}
        else:
            return {"status": "Entrada ya usada", "data": {"id": fake_id, "hash": hash}}
    else:
        raise HTTPException(status_code=404, detail="Entrada no válida")

    conn.close()


@app.get("/mark_ticket_used/")
async def mark_ticket_used(fake_id: str, hash: str):
    conn = conectar_db()
    cursor = conn.cursor()

    # Verificar si la entrada existe y está en estado no usada (usado = 0)
    cursor.execute('SELECT usado FROM entradas WHERE fake_id = ? AND hash = ?', (fake_id, hash))
    resultado = cursor.fetchone()

    if resultado:
        usado = resultado[0]
        if usado == 0:
            # Marcar la entrada como usada
            cursor.execute('UPDATE entradas SET usado = 1 WHERE fake_id = ? AND hash = ?', (fake_id, hash))
            conn.commit()
            return {"status": "Entrada marcada como usada", "data": {"fake_id": fake_id, "hash": hash}}
        else:
            return {"status": "Entrada ya usada", "data": {"fake_id": fake_id, "hash": hash}}
    else:
        raise HTTPException(status_code=404, detail="Entrada no válida")

    conn.close()

