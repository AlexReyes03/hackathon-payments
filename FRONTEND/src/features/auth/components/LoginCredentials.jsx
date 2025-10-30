import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingInput from './FloatingInput';
import PasswordInput from './PasswordInput';

export default function LoginCredentials({ onSubmit, loading }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'El usuario es obligatorio';
        }
        if (!password.trim()) {
            newErrors.password = 'La contraseña es obligatoria';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        // Esperar un momento para que se vea la animación
        await new Promise(resolve => setTimeout(resolve, 400));

        try {
            await onSubmit({ username, password });
        } catch (err) {
            setErrors({ general: err.message || 'Error al iniciar sesion' });
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {!isSubmitting && (
                <motion.form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: -20,
                        transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    transition={{ duration: 0.5 }}
                >
            <FloatingInput
                id="username"
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
            />

            <PasswordInput
                id="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />

            <div className="text-end">
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-decoration-none"
                    style={{ color: '#ffffff', fontSize: '0.85rem' }}
                >
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {errors.general && (
                <div className="alert alert-danger mb-0" role="alert" style={{ fontSize: '0.9rem' }}>
                    {errors.general}
                </div>
            )}

            <Button
                type="submit"
                label="Ingresar"
                loading={loading}
                className="w-100"
                style={{
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#000000',
                }}
            />

            <div className="text-center">
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="btn btn-link text-decoration-none"
                    style={{ color: '#ffffff', fontSize: '0.9rem' }}
                >
                    Registrarse
                </button>
            </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}