import { Link } from 'react-router-dom';
import { useEmail } from '../context/EmailContext'; // Asegúrate de que la ruta sea correcta

const HeaderNav = () => {
    const { logout, isAuthenticated } = useEmail(); // Importamos `logout` del contexto

    const handleLogout = () => {
        logout(); // Llamamos a la función logout del contexto
        sessionStorage.clear(); // Limpiamos el sessionStorage
    };

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
                        {isAuthenticated && ( // Mostrar el botón de logout solo si el usuario está autenticado
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-gray-200 focus:outline-none"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderNav;
