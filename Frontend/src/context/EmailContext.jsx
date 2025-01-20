import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const EmailContext = createContext();
export const useEmail = () => useContext(EmailContext);



const EmailProvider = ({ children }) => {
    // Estados relacionados con emails y procesos asociados
    const [recruiterMail, setRecruiterMail] = useState('');
    const [recruiterName, setRecruiterName] = useState('');
    const [positionName, setPositionName] = useState('');
    const [sendList, setSendList] = useState([]);
    const [expectativeSalary, setExpectativeSalary] = useState('');
    const [dollarSalary, setDollarSalary] = useState(false);

    // Estados relacionados con la autenticación y el usuario
    const [user, setUser] = useState(null); // Cambié a null para diferenciar un usuario no autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicializado como false
    const [token, setToken] = useState(localStorage.getItem("authToken")); // Recuperar el token del localStorage


    // Función para manejar errores
    const handleError = (error) => {
        console.error(error);
        if (error.response && error.response.data) {
            alert(error.response.data.error || "Error desconocido");
        } else {
            alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
        }
    };
    const navigate = useNavigate(); // Hook para redirección

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            // Opcional: Decodificar el token para obtener información del usuario
        }
    }, []);

    // Login
    const login = async (credentials) => {
        console.log(`Datos recibidos en el emailContext: ${JSON.stringify(credentials)}`);
        const { email, password } = credentials;
        console.log(email, password);

        try {
            console.log("Llamando al loginRequest");
            const res = await loginRequest(credentials);
            console.log("Esperando respuesta desde el loginRequest");
            console.log(`res.data: ${JSON.stringify(res.data)}`);
            const { token, user: userData } = res.data;
            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem("authToken", token); // Guardar token
            setToken(token);

            // Redirigir al dashboard
            navigate("/board");
        } catch (error) {
            handleError(error);
        }
    };

    const register = async (newUser) => {
        console.log(`Datos recibidos en emailContext en register: ${JSON.stringify(newUser)}`); // Convierte a string legible
        try {
            console.log("Llamando al registerRequest");
            const res = await registerRequest(newUser);
            console.log("Esperando respuesta desde el loginRequest");
            console.log(`res.data: ${JSON.stringify(res.data)}`); // Convierte la respuesta a string legible
            const { token, user: userData } = res.data; // Similar al login
            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem("authToken", token);
            setToken(token);
        } catch (error) {
            handleError(error);
        }
    };



    // Logout
    const logout = async () => {
        try {
            await logoutRequest(); // Asumo que no necesita parámetros
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("authToken"); // Limpiar el token
        } catch (error) {
            handleError(error);
        }
    };

    // Función para agregar a la lista de envío
    const handleAddToList = () => {
        if (recruiterMail && recruiterName && positionName) {
            setSendList((prevList) => [
                ...prevList,
                { recruiterMail, recruiterName, positionName },
            ]);
            setRecruiterMail('');
            setRecruiterName('');
            setPositionName('');
        } else {
            alert('Por favor, completa todos los campos antes de agregar.');
        }
    };

    // Función para enviar todos los correos
    const handleSendAll = () => {
        if (sendList.length > 0) {
            sendList.forEach((entry) => {
                console.log(
                    `Correo enviado a ${entry.recruiterName} (${entry.recruiterMail}) para el puesto ${entry.positionName}`
                );
            });
            alert('¡Todos los correos han sido enviados!');
            setSendList([]);
        } else {
            alert('No hay correos en la lista para enviar.');
        }
    };

    return (
        <EmailContext.Provider
            value={{
                recruiterMail, setRecruiterMail,
                recruiterName, setRecruiterName,
                positionName, setPositionName,
                sendList, setSendList,
                handleAddToList, handleSendAll,
                expectativeSalary, setExpectativeSalary,
                dollarSalary, setDollarSalary,
                register,
                login,
                logout,
                user, setUser,
                isAuthenticated, setIsAuthenticated,
                token, setToken
            }}
        >
            {children}
        </EmailContext.Provider>
    );
};

export default EmailProvider;
