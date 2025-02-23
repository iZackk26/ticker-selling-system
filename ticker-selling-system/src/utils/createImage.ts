import { createHash } from 'crypto';
import QRCode from 'qrcode';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Función para generar el hash usando SHA-256
function generateHash(entradaId: number): string {
  return createHash('sha256')
    .update(`andamodespechao${entradaId}`)
    .digest('hex');
}

async function generateQR(entradaId: number): Promise<void> {
  try {
    // Genera el hash para el ID de la entrada
    const hashEntrada = generateHash(entradaId);

    // Construye el string de información a incluir en el QR
    const info = `ID: ${entradaId}\nEvento: andamo_despechao\nHash: ${hashEntrada}`;

    // Genera el QR con las opciones deseadas (versión, corrección de error, colores, etc.)
    // Se usa un ancho inicial (por ejemplo, 500) para luego redimensionar según el fondo.
    const qrBuffer = await QRCode.toBuffer(info, {
      errorCorrectionLevel: 'H',
      type: 'png',
      width: 500,
      color: {
        dark: '#a02828',  // Color rojo vino para los módulos
        light: '#ffffff', // Fondo blanco
      },
    });

    // Carga la imagen de fondo (se asume que "fondo.png" se encuentra en el directorio actual)
    const backgroundPath = path.resolve('./background.png');
    const background = sharp(backgroundPath);
    const metadata = await background.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error('No se pudieron leer las dimensiones de la imagen de fondo.');
    }
    const bgWidth = metadata.width;
    const bgHeight = metadata.height;

    // Calcula el tamaño del QR para que sea grande en relación al fondo
    // Se toma el mínimo de ancho y alto del fondo y se divide por 1.2 para ajustar
    const qrSize = Math.floor(Math.min(bgWidth, bgHeight) / 1.2);

    // Redimensiona el QR al tamaño calculado
    const qrResizedBuffer = await sharp(qrBuffer)
      .resize(qrSize, qrSize)
      .toBuffer();

    // Calcula la posición para centrar el QR en la imagen de fondo
    const left = Math.floor((bgWidth - qrSize) / 2);
    const top = Math.floor((bgHeight - qrSize) / 2);

    // Compone el QR sobre la imagen de fondo
    const finalImageBuffer = await background
      .composite([{ input: qrResizedBuffer, top: top, left: left }])
      .png()
      .toBuffer();

    // Asegura que exista el directorio "entradas_qr"
    const outputDir = path.resolve('entradas_qr');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const outputPath = path.join(outputDir, `${entradaId}.png`);

    // Guarda la imagen compuesta en el directorio de salida
    await sharp(finalImageBuffer).toFile(outputPath);
    console.log(`Código QR generado y guardado en: ${outputPath}`);
  } catch (error) {
    console.error('Error al generar el código QR compuesto:', error);
  }
}

// Ejemplo de uso:
// Supón que obtienes el id de la siguiente forma (por ejemplo, de una consulta a base de datos)
const entradaId = 1; // Aquí deberías asignar el nuevo ID (max id + 1)
generateQR(entradaId).catch(console.error);
