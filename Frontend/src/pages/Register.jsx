import { Link } from "react-router-dom";
import { useEmail } from "../context/EmailContext";
import { useState } from "react";

const Register = () => {

    const { register } = useEmail();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        console.log(`Datos enviados desde Register.jsx:`);
        console.log(`User: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("Desde handleSubmit en Register.jsx")

        e.preventDefault();
        register({ username, email, password });
    };



    return (
        <div className="mx-auto shadow-lg rounded-lg p-6 w-full max-w-md h-auto bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
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
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
                >
                    Registrarse
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-700">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
