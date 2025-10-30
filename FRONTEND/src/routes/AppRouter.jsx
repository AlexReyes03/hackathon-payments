import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRouter from './PublicRouter';
import AuthLayout from '../components/global/AuthLayout';
import PrivateRouter from './PrivateRouter';
import AppLayout from '../components/global/AppLayout';

import LoginForm from '../features/auth/LoginForm';
import RegisterForm from '../features/auth/RegisterForm'

import AdminDashboard from '../features/admin/UserDashboard';
import Profile from '../features/admin/Profile';
import Movements from '../features/admin/Movements';
import TransferPage from '../features/admin/TransferPage';
import TransferStep2 from '../features/admin/TransferStep2';
import TransferStep3 from '../features/admin/TransferStep3';

export default function AppRouter() {
    return (
        <Routes> {/* Public Routes */}
            <Route element={<PublicRouter />}>
                <Route path='' element={
                    <AuthLayout title='Inicio de Sesión' subtitle='Accede a tu cuenta'>
                        <LoginForm />
                    </AuthLayout>
                }
                />
                <Route path='/register' element={
                    <AuthLayout title='Inicio de Sesión' subtitle='Ingresa tus credenciales'>
                        <RegisterForm />
                    </AuthLayout>
                }
                />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRouter allowedRoles={['ADMIN']} />}>
                <Route element={<AppLayout />}>
                    {/* Admin Routes */}
                    <Route path='admin/dashboard' element={<AdminDashboard />} />
                    <Route path='admin/movements' element={<Movements />} />
                    <Route path='admin/transfer' element={<TransferPage />} />
                    <Route path='admin/transfer3' element={<TransferStep3 />} />
                    <Route path='admin/transfer2' element={<TransferStep2 />} />
                    <Route path='admin/credits' element={<TransferPage />} />
                    <Route path='admin/profile' element={<Profile />} />
                </Route>
            </Route>
        </Routes>


    )
}