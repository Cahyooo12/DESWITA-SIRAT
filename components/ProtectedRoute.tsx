import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const isAdmin = localStorage.getItem('isAdmin');
    console.log('ProtectedRoute Check - isAdmin:', isAdmin);

    if (isAdmin !== 'true') {
        console.log('Access denied, redirecting to login...');
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
