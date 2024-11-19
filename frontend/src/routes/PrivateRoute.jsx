import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('token');

  // Simple authentication check
  const isAuthenticated = token !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
