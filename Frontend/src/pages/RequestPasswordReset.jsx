import { useState } from "react";
import { useEmail } from "../context/EmailContext";

const RequestPasswordReset = () => {
    const { initPasswordReset } = useEmail(); // Función para enviar el correo desde el contexto
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await initPasswordReset(email);
            setSuccessMessage(
                "¡Correo enviado! Revisa tu bandeja de entrada para continuar."
            );
            setErrorMessage("");
            setEmail(""); // Limpiar el campo de email
        } catch (error) {
            console.log(error)
            setErrorMessage("Hubo un error. Verifica el email ingresado.");

            setSuccessMessage("");
        }
    };

    return (
        <div className="mx-auto shadow-lg rounded-lg p-6 w-full max-w-md h-auto bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Recuperar Contraseña
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                >
                    Enviar correo
                </button>
            </form>
            {successMessage && (
                <div className="text-green-500 mt-4 text-center">{successMessage}</div>
            )}
            {errorMessage && (
                <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
            )}
            <div className="text-center mt-4">
                <p className="text-gray-700">
                    ¿Recordaste tu contraseña?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Iniciar sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RequestPasswordReset;
