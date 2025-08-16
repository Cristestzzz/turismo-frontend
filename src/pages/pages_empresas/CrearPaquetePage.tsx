import React from 'react';
import CrearPaqueteForm from '../../components/empresas/CrearPaqueteForm';
import { useLocation } from 'react-router-dom';

const CrearPaquetePage: React.FC = () => {
  // Oculta el navbar en esta página
  const location = useLocation();
  React.useEffect(() => {
    const navbar = document.querySelector('.navbar-naturaleza') as HTMLElement | null;
    if (navbar) navbar.style.display = 'none';
    return () => {
      const navbar = document.querySelector('.navbar-naturaleza') as HTMLElement | null;
      if (navbar) navbar.style.display = '';
    };
  }, [location]);
  return (
    <div className="crear-paquete-full">
      <CrearPaqueteForm />
    </div>
  );
};

export default CrearPaquetePage;
