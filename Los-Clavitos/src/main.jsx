import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ProductosProvider } from './context/ProductosContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
      <App />
    </ProductosProvider>
  </StrictMode>,
);