import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">Mi Aplicación</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/board" className="hover:text-gray-200">Tablero</Link>
                        </li>
                        <li>
                            <Link to="/sent" className="hover:text-gray-200">Enviados</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-gray-200">Configuración</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
