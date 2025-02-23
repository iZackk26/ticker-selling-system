import QRCode from 'qrcode';
import sharp from 'sharp';

async function createQRCodeComposite(
  hash: string,
  backgroundImagePath: string,
  outputImagePath: string
): Promise<void> {
  try {
    // Genera el código QR como buffer PNG con un ancho (y alto) de 250 píxeles.
    const qrBuffer = await QRCode.toBuffer(hash, {
      type: 'png',
      width: 700,
      color: {
        dark: '#8B0000',  // Color rojo vino para los módulos del QR.
        light: '#ffffff', // Color de fondo del QR.
      },
    });

    // Carga la imagen de fondo con Sharp.
    const background = sharp(backgroundImagePath);
    // Obtiene los metadatos para conocer las dimensiones de la imagen de fondo.
    const metadata = await background.metadata();
    const bgWidth = metadata.width || 0;
    const bgHeight = metadata.height || 0;

    // Asumimos que el código QR tiene 250x250 (puedes ajustar o leer sus dimensiones si lo requieres).
    const qrWidth = 700;
    const qrHeight = 700;

    // Calcula las coordenadas para centrar el QR en la imagen de fondo.
    const left = Math.floor((bgWidth - qrWidth) / 2);
    const top = Math.floor((bgHeight - qrHeight) / 2);

    // Componer el código QR sobre la imagen de fondo.
    await background
      .composite([{ input: qrBuffer, top, left }])
      .toFile(outputImagePath);

    console.log(`Imagen compuesta guardada en: ${outputImagePath}`);
  } catch (error) {
    console.error('Error al crear la imagen compuesta:', error);
  }
}

// Ejemplo de uso:
const hash = "66b030d4c688ace4db79efded3d2ef15f5f459051dd405abd12521c7bd08c855";
const backgroundImagePath = "./background.png"; // Ruta de la imagen de fondo
const outputImagePath = "./composite.png";        // Ruta donde se guardará la imagen resultante

createQRCodeComposite(hash, backgroundImagePath, outputImagePath);