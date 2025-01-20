import { Navigate } from 'react-router-dom';
import { useEmail } from '../context/EmailContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useEmail();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


