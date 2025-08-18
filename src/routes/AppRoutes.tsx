import React from 'react';
import MisReservasPage from '../pages/pages_turistas/MisReservasPage';
import ReviewsPage from '../pages/pages_turistas/ReviewsPage';
import ReservasRecibidasPage from '../pages/pages_empresas/ReservasRecibidasPage';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage';
import DashboardEmpresaPage from '../pages/pages_empresas/DashboardEmpresaPage';
import ReviewsPaquetesPage from '../pages/pages_empresas/ReviewsPaquetesPage';
import CrearPaquetePage from '../pages/pages_empresas/CrearPaquetePage';
import MisPaquetesPage from '../pages/pages_empresas/MisPaquetesPage';
import EditarPaquetePage from '../pages/pages_empresas/EditarPaquetePage';
import ListadoPaquetes from '../components/features/ListadoPaquetes';
import PaqueteDetallePage from '../pages/pages_turistas/PaqueteDetallePage';
import ReservarPaquetePage from '../pages/pages_turistas/ReservarPaquetePage';

// Puedes importar más páginas aquí

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<ListadoPaquetes />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
  <Route path="/dashboard" element={<DashboardEmpresaPage />} />
  <Route path="/reviews-paquetes" element={<ReviewsPaquetesPage />} />
  <Route path="/empresa/crear-paquete" element={<CrearPaquetePage />} />
  <Route path="/mis-paquetes" element={<MisPaquetesPage />} />
  <Route path="/empresa/editar-paquete/:id" element={<EditarPaquetePage />} />
  <Route path="/paquete/:id" element={<PaqueteDetallePage />} />
  <Route path="/reservar-paquete/:id" element={<ReservarPaquetePage />} />
  <Route path="/mis-reservas" element={<MisReservasPage />} />
  <Route path="/reviews" element={<ReviewsPage />} />
  <Route path="/reservas-recibidas" element={<ReservasRecibidasPage />} />
  {/* Nueva ruta para paquetes por categoría */}
  <Route path="/paquetes/:categoria" element={<ListadoPaquetes />} />
    {/* Agrega más rutas aquí */}
  </Routes>
);

export default AppRoutes;
