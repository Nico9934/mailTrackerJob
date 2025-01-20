import { Link } from "react-router-dom";
import { useEmail } from "../context/EmailContext";
import { useState } from "react";

const Login = () => {

    const { login } = useEmail();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        console.log(`Datos enviados desde login.jsx:`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("Desde handleSubmit en login.jsx")

        e.preventDefault();
        login({ email, password });
    };


    return (
        <div className="mx-auto shadow-lg rounded-lg p-6 w-full max-w-md h-auto bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />


                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                >
                    Iniciar sesión
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-700">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;





