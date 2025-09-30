import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/Logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpem] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpem (!isMenuOpen);
    };
    return (
        
        <header className="fixed top-0 left-0 w-full p-4 shadow-md bg-white">
            
            <div className="flex items-center justify-between max-w-6xl mx-auto px-4">
                
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img className="w-16 h-auto" src={logo} alt="Joalisson Lemos - Home" />
                    <h1 className="text-3xl text-orange-600 font-extrabold">
                        Joalisson <span className="text-gray-800">Lemos</span>
                    </h1>
                </Link>
                <button onClick={toggleMenu} className="md:hidden text-gray-700 text-2xl p-2 focus:outline-none"
                aria-label= {isMenuOpen ? "Fechar menu" : "Abrir menu"}>
                    {isMenuOpen ? '✖' : '☰' }
                </button>
                <nav className={`
                        absolute top-full left-0 w-full bg-white shadow-lg p-4 
                        transition-all duration-300 ease-in-out 
                        md:static md:w-auto md:bg-transparent md:shadow-none md:p-0 
                        md:flex md:items-center md:space-x-6
                        
                        ${isMenuOpen ? 'flex flex-col' : 'hidden'} // <-- Exibir ou esconder no Mobile
                    `}>
                        <Link to="/" onClick={toggleMenu} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold border-b md:border-none">
                        Home
                    </Link>
                    <Link to="/projetos" onClick={toggleMenu} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold border-b md:border-none">
                        Projetos
                    </Link>
                    <Link to="/contato" onClick={toggleMenu} className="block py-2 text-lg text-gray-700 hover:text-orange-600 font-semibold">
                        Contato
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;