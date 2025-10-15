import React, { useState } from 'react';
import logo from '../assets/Logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full py-2 shadow-md bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">

        <a href="#home" className="flex items-center gap-3 shrink-0" onClick={() => setIsMenuOpen(false)}>
          <img className="w-16 h-auto" src={logo} alt="Joalisson Lemos - Home" />
          <h1 className="text-3xl text-orange-600 font-extrabold m-0">
            Joalisson <span className="text-gray-800">Lemos</span>
          </h1>
        </a>

        <div className="flex-1 flex justify-end items-center">
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-lg text-gray-700 hover:text-orange-600 font-semibold">Home</a>
            <a href="#projetos" className="text-lg text-gray-700 hover:text-orange-600 font-semibold">Projetos</a>
            <a href="#contato" className="text-lg text-gray-700 hover:text-orange-600 font-semibold">Contato</a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>

      </div>

      <nav className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <a href="#home" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold border-b">Home</a>
        <a href="#projetos" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold border-b">Projetos</a>
        <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold">Contato</a>
      </nav>
    </header>
  );
};

export default Header;
