import { createRoot } from 'react-dom/client';
import PrimeReact from 'primereact/api';

import App from './App.jsx'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

// Styles
import './styles/animations.css';

PrimeReact.ripple = true;
PrimeReact.autoZIndex = true;
PrimeReact.zIndex['overlay'] = 1200;

createRoot(document.getElementById('root')).render(
    <App />
);
