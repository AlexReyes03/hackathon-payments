import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { motion, AnimatePresence } from 'framer-motion';

import Stellar from '../../../assets/img/Stellar.png';

export default function Splash({ onAccederClick }) {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const handleAccederClick = () => {
        setIsExiting(true);
        // Esperar a que termine la animación antes de ejecutar el callback
        setTimeout(() => {
            onAccederClick();
        }, 600);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="d-flex flex-column align-items-center gap-4"
                    exit={{
                        opacity: 0,
                        scale: 0.8,
                        y: -50,
                        transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                >
                    {/* Logo Stellar */}
                    <motion.div
                        className="text-center mb-4"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 15,
                            duration: 2
                        }}
                    >
                        <motion.div
                            className="d-flex align-items-center justify-content-center mb-3"
                            style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto',
                            }}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.img
                                src={Stellar}
                                alt="Stellar Logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.3 }
                                }}
                            />
                        </motion.div>
                        <motion.h3
                            className="mb-0"
                            style={{
                                color: '#ffffff',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                        </motion.h3>
                    </motion.div>

                    <motion.div
                        className="w-100"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="button"
                            label="Acceder"
                            onClick={handleAccederClick}
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
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <motion.button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="btn btn-link text-decoration-none"
                            style={{ color: '#ffffff', fontSize: '0.9rem' }}
                            whileHover={{
                                scale: 1.05,
                                textDecoration: 'underline'
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Registrarse
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
