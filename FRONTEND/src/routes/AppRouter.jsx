import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRouter from './PublicRouter';
import AuthLayout from '../components/global/AuthLayout';
import PrivateRouter from './PrivateRouter';
import AppLayout from '../components/global/AppLayout';

import LoginForm from '../features/auth/LoginForm';
import RegisterForm from '../features/auth/RegisterForm'

import AdminDashboard from '../features/admin/UserDashboard';

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


                <Route element={<AppLayout />}>
                    <Route path='admin/dashboard' element={<AdminDashboard />} />
                </Route>
                
            </Route>

            {/* Private Routes 
            <Route element={<PrivateRouter allowedRoles={['ADMIN']} />}>
                <Route element={<AppLayout />}>
                    {/* Admin Routes
                    <Route path='admin/dashboard' element={<AdminDashboard />} />
                </Route>
            </Route>*/}
        </Routes>


    )
}