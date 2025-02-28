"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 md:p-6 bg-[#f7f1eb] text-black">
      {/* Logo */}
      <h1 className="text-xl font-bold">mirastep.</h1>

      {/* Lokalita + čas */}
      <div className="hidden md:flex space-x-6 text-gray-500 text-sm">
        <span>based in czech republic</span>
        <span>|</span>
        <span>local time gmt+1</span>
      </div>

      {/* Přepínač jazyka + menu */}
      <div className="flex items-center space-x-4">
        <button className="border border-black px-3 py-1 rounded-lg text-xs font-semibold">
          CZ / EN
        </button>
        {/* Ručně vytvořená ikona menu */}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
