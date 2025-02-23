import React, { useState } from 'react'
import QrReader from 'modern-react-qr-reader'

export default function Check() {
  const [data, setData] = useState('')

  const handleScan = (result) => {
    if (result) {
      // Utilizamos una expresión regular para extraer el valor después de "Fake ID:"
      const match = result.match(/Fake ID:\s*([^\s]+)/)
      if (match && match[1]) {
        setData(match[1])
      }
    }
  }
  const handleError = (error) => {
    console.error(error)
  }

  const handleMarkAsUsed = () => {
    console.log('Mark as Used clicked')
  }

  const handleExit = () => {
    console.log('Exit clicked')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">QR Code Scanner</h1>
        <div className="mb-4 overflow-hidden rounded-lg">
          <QrReader
            onScan={handleScan} // Se utiliza onScan en lugar de onResult
            onError={handleError}
            constraints={{ facingMode: 'environment' }}
            containerStyle={{ width: '100%', border: 'none' }}
            videoStyle={{ border: 'none' }}
          />
        </div>
        {data && (
          <p className="mb-4 text-center">
            Scanned Data: <strong>{data}</strong>
          </p>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleMarkAsUsed}
            disabled={!data}
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
  )
}
