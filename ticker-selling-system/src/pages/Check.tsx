import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';

export default function Check() {
  const [qrData, setQrData] = useState({ id: '', hash: '' });

  const handleScan = (result: string | null) => {
    if (result) {
      console.log("Resultado completo del QR:", result);
      
      // Intenta extraer el ID y el Hash
      const idMatch = result.match(/ID:\s*([^\s]+)/);
      const hashMatch = result.match(/Hash:\s*([0-9a-fA-F]+)/);
      
      console.log("Coincidencia ID:", idMatch);
      console.log("Coincidencia Hash:", hashMatch);
      
      const id = idMatch ? idMatch[1] : '';
      const hash = hashMatch ? hashMatch[1] : '';

      setQrData({ id, hash });
    }
  };

  const handleError = (error: any) => {
    console.error("Error del QR Reader:", error);
  };

  const handleMarkAsUsed = () => {
    console.log('Mark as Used clicked', qrData);
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
