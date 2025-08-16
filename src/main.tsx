import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ReactDOM from 'react-dom/client';
import TurismoNavbar from './components/comunes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  // Oculta el Navbar en las rutas de registro y login
  const hideNavbar = location.pathname === '/register' || location.pathname === '/login';
  return (
    <>
      {!hideNavbar && <TurismoNavbar />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
