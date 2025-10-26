import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, allowedUserType }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user || user.type !== allowedUserType) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;