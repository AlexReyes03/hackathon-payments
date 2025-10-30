import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRouter() {
    const { user } = useAuth();

    if (user) {
        let redirectTo = '/';
        
        // CORREGIDO: usar role_id en lugar de role.name
        switch (user.role_id) {
            case 'ADMIN': 
                redirectTo = '/admin/dashboard'; 
                break;
            case 'USER':
                redirectTo = '/user/dashboard';
                break;
            default:
                redirectTo = '/';
        }
        
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}