import React from "react";
import { FaTicketAlt, FaDollarSign, FaEye } from "react-icons/fa";
import DynamicBackground from "../background/Background";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Fondo animado */}
      <DynamicBackground />

      {/* Contenedor principal asegurando que el footer siempre esté visible */}
      <div className="flex flex-col flex-grow items-center justify-center text-center text-black z-10 px-4">
        <h1 className="text-6xl mb-6 text-black">
          <span style={{ fontFamily: "'Anton', sans-serif" }}>ANDAMO</span> <br />
          <span style={{ fontFamily: "'Great Vibes', cursive" }}>Despecha'o</span>
        </h1>

        {/* Botones de acción con una mejor paleta de colores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
          <a
            href="/check"
            className="flex items-center justify-center w-full text-white bg-red-600 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-lg px-6 py-3"
          >
            <FaTicketAlt className="mr-2" /> Check Ticket
          </a>
          <a
            href="/sell"
            className="flex items-center justify-center w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 font-medium rounded-full text-lg px-6 py-3"
          >
            <FaDollarSign className="mr-2" /> Sell Ticket
          </a>
          <a
            href="/available"
            className="flex items-center justify-center w-full text-white bg-red-600 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-6 py-3"
          >
            <FaEye className="mr-2" /> View Tickets
          </a>
        </div>


      </div>

      {/* Footer siempre abajo y visible */}
      <footer className="w-full text-center py-4 mt-auto text-black z-10 relative">
        <p>&copy; 2025 Andamo Despechao. All rights reserved.</p>
      </footer>

    </div>
  );
}
