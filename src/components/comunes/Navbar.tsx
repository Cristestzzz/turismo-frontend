import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.mode.css';
import { useAuth } from '../../context/AuthContext';
import ConvertirseEmpresaModal from '../empresas/ConvertirseEmpresaModal';

// Importa los iconos de Lucide que necesitas
import {
  LuBriefcase,
  LuCalendar,
  LuStar,
  LuPencil,
  LuLayoutDashboard,
  LuList,
  LuBellRing,
  LuUser
} from 'react-icons/lu';

function TurismoNavbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isOperador = user?.isOperador;
  const [showEmpresaModal, setShowEmpresaModal] = useState(false);
  const handleOpenEmpresaModal = () => setShowEmpresaModal(true);
  const handleCloseEmpresaModal = () => setShowEmpresaModal(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className={`navbar-glassmorphism ${scrolled ? 'scrolled' : ''}`} data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Kandamo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-turismo" />
        <Navbar.Collapse id="navbar-turismo">
          {/* Menú de navegación en el centro */}
          <Nav className="mx-auto">
            {/* Opciones para usuarios no logueados */}
            {!isLoggedIn && (
              <>
                <NavDropdown title="Paquetes turísticos" id="paquetes-dropdown">
                  <NavDropdown.Item as={Link} to="/paquetes/aventura">Aventura</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/cultural">Cultural</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/gastronomico">Gastronómico</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/playa">Playa</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/montaña">Montaña</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/ciudad">Ciudad</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/ecoturismo">Ecoturismo</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/romantico">Romántico</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/familiar">Familiar</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/negocios">Negocios</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/experiencias">Experiencias</Nav.Link>
                <Nav.Link as={Link} to="/servicios">Servicios</Nav.Link>
              </>
            )}
            {/* Opciones para turistas logueados */}
            {isLoggedIn && !isOperador && (
              <>
                <NavDropdown title="Paquetes turísticos" id="paquetes-dropdown">
                  <NavDropdown.Item as={Link} to="/paquetes/aventura">Aventura</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/cultural">Cultural</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/gastronomico">Gastronómico</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/playa">Playa</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/montaña">Montaña</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/ciudad">Ciudad</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/ecoturismo">Ecoturismo</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/romantico">Romántico</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/familiar">Familiar</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/paquetes/negocios">Negocios</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/mis-reservas"><LuCalendar size={18} style={{ marginRight: '0.5rem' }} /> Mis reservas</Nav.Link>
                <Nav.Link as={Link} to="/favoritos"><LuStar size={18} style={{ marginRight: '0.5rem' }} /> Favoritos</Nav.Link>
                <Nav.Link as={Link} to="/reviews"><LuPencil size={18} style={{ marginRight: '0.5rem' }} /> Reviews</Nav.Link>
              </>
            )}
            {/* Opciones para operadores logueados */}
            {isLoggedIn && isOperador && (
              <>
                <Nav.Link as={Link} to="/dashboard"><LuLayoutDashboard size={18} style={{ marginRight: '0.5rem' }} /> Dashboard empresa</Nav.Link>
                <Nav.Link as={Link} to="/mis-paquetes"><LuBriefcase size={18} style={{ marginRight: '0.5rem' }} /> Mis paquetes</Nav.Link>
                <Nav.Link as={Link} to="/reservas-recibidas"><LuList size={18} style={{ marginRight: '0.5rem' }} /> Reservas recibidas</Nav.Link>
                <Nav.Link as={Link} to="/reviews-paquetes"><LuBellRing size={18} style={{ marginRight: '0.5rem' }} /> Reviews de mis paquetes</Nav.Link>
              </>
            )}
          </Nav>

          {/* Sección de usuario a la derecha */}
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ fontWeight: 400 }}>Registrarse</Nav.Link>
              </>
            ) : (
              <NavDropdown title={<><LuUser size={18} style={{ marginRight: '0.5rem' }} /> {user?.nombre || user?.email || "Usuario"}</>} id="usuario-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/perfil">Perfil</NavDropdown.Item>
                {!isOperador && (
                  <NavDropdown.Item onClick={handleOpenEmpresaModal}>Conviértete en Empresa</NavDropdown.Item>
                )}
                {isOperador && (
                  <NavDropdown.Item as={Link} to="/perfil-empresa">Perfil empresa</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ConvertirseEmpresaModal show={showEmpresaModal} onHide={handleCloseEmpresaModal} />
    </Navbar>
  );
}

export default TurismoNavbar;