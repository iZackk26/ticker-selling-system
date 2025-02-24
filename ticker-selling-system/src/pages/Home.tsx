import React from "react";
import { FaTicketAlt, FaDollarSign, FaEye } from "react-icons/fa";
import DynamicBackground from "../background/Background";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Fondo animado */}
      <DynamicBackground />

      {/* Contenedor principal centrado */}
      <div className="flex flex-1 flex-col items-center justify-center text-center z-10 px-4">
        <h1 className="text-6xl font-bold mb-6">Andamo Despechao</h1>

        {/* Botones de acción usando GRID para evitar sobreposición */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <a
            href="/check"
            className="flex items-center justify-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-6 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <FaTicketAlt className="mr-2" /> Check Ticket
          </a>
          <a
            href="/sell"
            className="flex items-center justify-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-6 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <FaDollarSign className="mr-2" /> Sell Ticket
          </a>
          <a
            href="/available"
            className="flex items-center justify-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-6 py-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <FaEye className="mr-2" /> View Tickets
          </a>
        </div>
      </div>

      {/* Footer siempre abajo y bien centrado */}
      <footer className="w-full text-center py-4">
        <p className="text-white">&copy; 2025 Andamo Despechao. All rights reserved.</p>
      </footer>
    </div>
  );
}
