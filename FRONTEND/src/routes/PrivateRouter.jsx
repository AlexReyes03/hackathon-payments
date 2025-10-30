import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRouter({ allowedRoles }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role_id)) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />

}