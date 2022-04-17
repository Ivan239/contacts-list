import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.sass';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
