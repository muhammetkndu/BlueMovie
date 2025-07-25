import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MovieProvider } from './context/movieContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </StrictMode>,
)
