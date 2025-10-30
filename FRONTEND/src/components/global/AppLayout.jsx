import { useMemo } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Navbar from './Navbar';
import Tabbar from './Tabbar';

export default function AppLayout() {
    const { user } = useAuth();

    const ROLE_NAME = useMemo(() => {
        if (!user) return [];

        switch (user.role.name) {
            case 'ADMIN':
                return 'Administrador';
        }

    }, [user]);

    return (
        <>

            <Navbar />

            <Tabbar />

            <main className='app-main'>
                <Outlet />
            </main>
        </>
    )
}
