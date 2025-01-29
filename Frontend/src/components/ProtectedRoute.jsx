import { Navigate } from "react-router-dom";
import { useEmail } from "../context/EmailContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useEmail();

  // Verifica si el usuario está autenticado y si existe un token válido
  if (isAuthenticated && token) {
    return children;
  }

  // Si no está autenticado, redirige al login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;