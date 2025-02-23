import QRCode from 'qrcode';
import sharp from 'sharp';

async function createQRCodeComposite(
  id: string,
  hash: string,
  backgroundImagePath: string,
  outputImagePath: string,
  transport: boolean = false
): Promise<void> {
  try {
    // Tamaño deseado para el QR.
    const qrSize = 1000;
    const color = transport ? '#124e9e' : '#8B0000';

    // Genera el código QR en formato PNG con tamaño 100 y color rojo vino, utilizando el hash.
    const qrBuffer = await QRCode.toBuffer(hash, {
      type: 'png',
      width: qrSize,
      color: {
        dark: color,  // Color rojo vino para los módulos.
        light: '#ffffff', // Fondo blanco.
      },
    });

    // Carga la imagen de fondo con Sharp.
    const background = sharp(backgroundImagePath);
    const metadata = await background.metadata();
    const bgWidth = metadata.width || 0;
    const bgHeight = metadata.height || 0;

    // Calcula la posición para centrar el QR en la imagen de fondo.
    const left = Math.floor((bgWidth - qrSize) / 2);
    const top = Math.floor((bgHeight - qrSize) / 2);

    // Definir el tamaño del texto y del contenedor SVG.
    const fontSize = 52;
    const textHeight = 80; // Aumentado para que el texto se muestre completo.
    const margin = 10; // Margen entre el texto y el QR.

    // Crea un SVG para el texto del ID con font-size 52.
    const svgText = `
      <svg width="${qrSize}" height="${textHeight}">
        <style>
          .title { fill: #000; font-size: ${fontSize}px; font-family: Arial, sans-serif; }
        </style>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title">
          ${id}
        </text>
      </svg>
    `;
    const textBuffer = Buffer.from(svgText);

    // Calcula la posición para colocar el texto justo arriba del QR.
    const textTop = top - textHeight - margin;

    // Compone la imagen: coloca el QR y el texto sobre la imagen de fondo.
    await background
      .composite([
        { input: qrBuffer, top: top, left: left },
        { input: textBuffer, top: textTop > 0 ? textTop : 0, left: left },
      ])
      .toFile(outputImagePath);

    console.log(`Imagen compuesta guardada en: ${outputImagePath}`);
  } catch (error) {
    console.error('Error al crear la imagen compuesta:', error);
  }
}

// Ejemplo de uso:
const hash = "66b030d4c688ace4db79efded3d2ef15f5f459051dd405abd12521c7bd08c855";
const id = "9A8AEJ";
const backgroundImagePath = "./background.png"; // Ruta de la imagen de fondo
const outputImagePath = "./composite.png";        // Ruta de salida

createQRCodeComposite(id, hash, backgroundImagePath, outputImagePath, true);
