import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const token = localStorage.getItem('token');
    console.log('ProtectedRoute Check - token:', token);

    if (!token) {
        console.log('Access denied (no token), redirecting to login...');
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
