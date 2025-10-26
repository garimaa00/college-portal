import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
  const { user, role: userRole } = useSelector((state) => state);

  if (!user || (role && userRole !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;