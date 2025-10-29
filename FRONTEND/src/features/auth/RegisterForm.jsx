import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import * as authService from '../../api/auth/authService';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import RegisterStep3 from './components/RegisterStep3';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        // Step 1
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        // Step 2
        correo: '',
        usuario: '',
        contrasena: '',
        confirmarContrasena: '',
        // Step 3
        pin: '',
        confirmarPin: '',
    });

    const parseDateString = (dateStr) => {
        // Expects DD/MM/YYYY format
        const parts = dateStr.split('/');
        if (parts.length !== 3) return null;

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const year = parseInt(parts[2], 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

        const date = new Date(year, month, day);

        // Validate the date
        if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
            return null;
        }

        return date;
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        }

        if (!formData.apellidoPaterno.trim()) {
            newErrors.apellidoPaterno = 'El apellido paterno es obligatorio';
        }

        if (!formData.fechaNacimiento.trim()) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
        } else {
            const birthDate = parseDateString(formData.fechaNacimiento);

            if (!birthDate) {
                newErrors.fechaNacimiento = 'Formato invalido. Usa DD/MM/YYYY';
            } else {
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (age < 18) {
                    newErrors.fechaNacimiento = 'Debes tener al menos 18 anos';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo electronico es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            newErrors.correo = 'Formato de correo invalido';
        }

        if (!formData.usuario.trim()) {
            newErrors.usuario = 'El usuario es obligatorio';
        } else if (formData.usuario.length < 4) {
            newErrors.usuario = 'El usuario debe tener al menos 4 caracteres';
        }

        if (!formData.contrasena) {
            newErrors.contrasena = 'La contrasena es obligatoria';
        } else if (formData.contrasena.length < 6) {
            newErrors.contrasena = 'La contrasena debe tener al menos 6 caracteres';
        }

        if (!formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Confirma tu contrasena';
        } else if (formData.contrasena !== formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contrasenas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};

        if (!formData.pin || formData.pin.length !== 6) {
            newErrors.pin = 'El PIN debe tener 6 digitos';
        }

        if (!formData.confirmarPin || formData.confirmarPin.length !== 6) {
            newErrors.confirmarPin = 'Confirma tu PIN';
        } else if (formData.pin !== formData.confirmarPin) {
            newErrors.confirmarPin = 'Los PIN no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStep1Continue = () => {
        if (validateStep1()) {
            setCurrentStep(2);
            setErrors({});
        }
    };

    const handleStep2Continue = () => {
        if (validateStep2()) {
            setCurrentStep(3);
            setErrors({});
        }
    };

    const handleStep3Submit = async () => {
        if (!validateStep3()) return;

        setLoading(true);
        try {
            // Parse date from DD/MM/YYYY to YYYY-MM-DD
            const birthDate = parseDateString(formData.fechaNacimiento);
            const year = birthDate.getFullYear();
            const month = String(birthDate.getMonth() + 1).padStart(2, '0');
            const day = String(birthDate.getDate()).padStart(2, '0');
            const fechaISO = `${year}-${month}-${day}`;

            const userData = {
                nombre: formData.nombre,
                apellidoPaterno: formData.apellidoPaterno,
                apellidoMaterno: formData.apellidoMaterno || null,
                fechaNacimiento: fechaISO,
                correo: formData.correo,
                usuario: formData.usuario,
                contrasena: formData.contrasena,
                pin: formData.pin,
            };

            await authService.register(userData);

            navigate('/', { state: { message: 'Registro exitoso. Por favor inicia sesion.' } });
        } catch (err) {
            setErrors({ general: err.message || 'Error al registrarse. Intenta nuevamente.' });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const progressValue = (currentStep / 3) * 100;

    return (
        <div className="d-flex flex-column gap-4">
            {/* Progress Bar */}
            <div className="mb-2">
                <ProgressBar
                    value={progressValue}
                    showValue={false}
                    style={{
                        height: '6px',
                        backgroundColor: '#444',
                    }}
                    color="#ffc107"
                />
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
                <RegisterStep1
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    onContinue={handleStep1Continue}
                />
            )}

            {currentStep === 2 && (
                <RegisterStep2
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    onBack={handleBack}
                    onContinue={handleStep2Continue}
                />
            )}

            {currentStep === 3 && (
                <RegisterStep3
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    onBack={handleBack}
                    onSubmit={handleStep3Submit}
                    loading={loading}
                />
            )}
        </div>
    );
}