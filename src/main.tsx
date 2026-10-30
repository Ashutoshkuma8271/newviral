import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'lenis/dist/lenis.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Gracefully dismiss initial HTML boot preloader with a smooth fade-out
const bootLoader = document.getElementById('app-boot-loader');
if (bootLoader) {
  requestAnimationFrame(() => {
    bootLoader.style.opacity = '0';
    bootLoader.style.pointerEvents = 'none';
    setTimeout(() => {
      bootLoader.remove();
    }, 450);
  });
}
