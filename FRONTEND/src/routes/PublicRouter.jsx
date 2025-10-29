import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRouter() {
    const { user } = useAuth();

    if (user) {
        let redirectTo = '/';
        switch (user.role.name) {
            case 'ADMIN': redirectTo = '/admin/dashboard'; break;
        }
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}