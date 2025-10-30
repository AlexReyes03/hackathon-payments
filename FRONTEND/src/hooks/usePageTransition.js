import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar transiciones de página
 * @param {number} delay - Tiempo de delay antes de mostrar el contenido (ms)
 * @returns {boolean} isReady - Indica si la página está lista para mostrarse
 */
export function usePageTransition(delay = 300) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return isReady;
}

export default usePageTransition;
