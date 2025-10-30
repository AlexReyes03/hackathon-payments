import { useMemo } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Navbar from './Navbar';
import Tabbar from './Tabbar';

export default function AppLayout() {
    const { user } = useAuth();

    const ROLE_NAME = useMemo(() => {
        if (!user) return [];

        switch (user.role_id) {
            case 'ADMIN':
                return 'Administrador';
        }

    }, [user]);

    return (
        <>

            <Navbar />

            <main className='app-main px-3 pt-2' style={{backgroundColor: '#181A1B'}}>
                <Outlet/>
            </main>

            <Tabbar />
        </>
    )
}
