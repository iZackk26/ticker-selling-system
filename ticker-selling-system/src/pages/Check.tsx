import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';

export default function Check() {
  const [qrData, setQrData] = useState({ id: '', hash: '' });

  const handleScan = async (result: string | null) => {
    if (result) {
      console.log("Resultado completo del QR:", result);

      // Intenta extraer el ID y el Hash
      const idMatch = result.match(/ID:\s*([^\s]+)/);
      const hashMatch = result.match(/Hash:\s*([0-9a-fA-F]+)/);

      console.log("Coincidencia ID:", idMatch);
      console.log("Coincidencia Hash:", hashMatch);

      const id = idMatch ? idMatch[1] : '';
      const hash = hashMatch ? hashMatch[1] : '';

      // Establecer los datos del QR en el estado
      setQrData({ id, hash });

      // Realizar la solicitud al endpoint de validación
      try {
        console.log(`http://localhost:8000/validate_qr_web/?fake_id=${id}&hash=${hash}`)
        const response = await fetch(`http://localhost:8000/validate_qr_web/?fake_id=${id}&hash=${hash}`);
        console.log(response);
        const data = await response.json();

        if (response.ok) {
          // Mostrar la respuesta de validación si la entrada es válida
          console.log("Respuesta de validación:", data);
          alert(`Entrada válida: ${JSON.stringify(data)}`);
        } else {
          // Mostrar el error si la entrada no es válida
          alert(`Error: ${data.detail}`);
        }
      } catch (error) {
        console.error("Error al validar el QR:", error);
        alert("Hubo un problema al intentar validar la entrada.");
      }
    }
  };


  const handleError = (error: any) => {
    console.error("Error del QR Reader:", error);
  };

  const handleMarkAsUsed = async () => {
    if (!qrData || !qrData.id || !qrData.hash) {
      console.log('No QR data available');
      return;
    }

    console.log('Mark as Used clicked', qrData);

    // Hacer la solicitud al backend
    try {
      const response = await fetch(`http://localhost:8000/mark_ticket_used/?fake_id=${qrData.id}&hash=${qrData.hash}`);

      // Verificar la respuesta
      if (response.ok) {
        const data = await response.json();
        console.log('Entrada marcada como usada:', data);
        alert('Entrada marcada como usada');
      } else {
        const errorData = await response.json();
        console.error('Error al marcar la entrada:', errorData);
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error de conexión con el servidor:', error);
      alert('Hubo un problema al intentar marcar la entrada como usada');
    }
  };

  const handleExit = () => {
    console.log('Exit clicked');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">QR Code Scanner</h1>
        <div className="mb-4 overflow-hidden rounded-lg">
          <QrReader
            onScan={handleScan}
            onError={handleError}
            constraints={{ facingMode: 'environment' }}
            containerStyle={{ width: '100%', border: 'none' }}
            videoStyle={{ border: 'none' }}
          />
        </div>
        {(qrData.id || qrData.hash) && (
          <div className="mb-4 text-center">
            {qrData.id && (
              <p>
                ID: <strong>{qrData.id}</strong>
              </p>
            )}
            {qrData.hash && (
              <p>
                Hash: <strong>{qrData.hash}</strong>
              </p>
            )}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleMarkAsUsed}
            disabled={!qrData.id || !qrData.hash}
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            Mark as Used
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
