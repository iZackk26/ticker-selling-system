import React from 'react'

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Ticket Management System
          </h1>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full max-w-md">
            <a
              href="/check"
              className="block w-full text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Check Ticket
            </a>
            <a
              href="/sell"
              className="block w-full text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sell Ticket
            </a>
            <a
              href="/available"
              className="block w-full text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              View Available Tickets
            </a>
          </div>
        </div>
      )
}
