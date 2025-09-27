import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/Logo.png';

const Header = () => {
    return (
        
        <header className="fixed top-0 left-0 w-full p-4 shadow-md flex items-center bg-white">
            
            <div className="flex items-center gap-4 max-w-6xl mx-auto w-full">
                
                <Link to="/" className="flex items-center gap-3">
                    <img className="w-16 h-auto" src={logo} alt="Logo codigo HTML" />
                    <h1 className="text-3xl text-orange-600 font-extrabold">
                        Joalisson <span className="text-gray-800">Lemos</span>
                    </h1>
                </Link>
                
                <nav className="ml-auto flex items-center space-x-6">
                    <Link to="/" className="text-lg text-gray-700 hover:text-orange-600 transition-colors font-semibold">
                        Home
                    </Link>
                    <Link to="/projetos" className="text-lg text-gray-700 hover:text-orange-600 transition-colors font-semibold">
                        Projetos
                    </Link>
                    <Link to="/contato" className="text-lg text-gray-700 hover:text-orange-600 transition-colors font-semibold">
                        Contato
                    </Link>
                    
                </nav>
            </div>
        </header>
    );
};

export default Header;