import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.mode.css';
import { useAuth } from '../../context/AuthContext';
import ConvertirseEmpresaModal from '../empresas/ConvertirseEmpresaModal';

function TurismoNavbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isOperador = user?.isOperador;
  const [showEmpresaModal, setShowEmpresaModal] = useState(false);
  const handleOpenEmpresaModal = () => setShowEmpresaModal(true);
  const handleCloseEmpresaModal = () => setShowEmpresaModal(false);

  return (
    <Navbar expand="lg" className="navbar-naturaleza" data-bs-theme="light">
      <Container>
  <Navbar.Brand as={Link} to="/">Kandamo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-turismo" />
        <Navbar.Collapse id="navbar-turismo">
          <Nav className="me-auto">
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
                <Nav.Link as={Link} to="/experiencias">🎈 Experiencias</Nav.Link>
                <Nav.Link as={Link} to="/servicios">🛎️ Servicios</Nav.Link>
              </>
            )}
            {/* Opciones para turistas logueados */}
            {isLoggedIn && !isOperador && (
              <>
                <NavDropdown title="Paquetes turísticos" id="paquetes-dropdown">
                  <NavDropdown.Item href="#aventura">Aventura</NavDropdown.Item>
                  <NavDropdown.Item href="#cultural">Cultural</NavDropdown.Item>
                  <NavDropdown.Item href="#gastronomico">Gastronómico</NavDropdown.Item>
                  <NavDropdown.Item href="#playa">Playa</NavDropdown.Item>
                  <NavDropdown.Item href="#montaña">Montaña</NavDropdown.Item>
                  <NavDropdown.Item href="#ciudad">Ciudad</NavDropdown.Item>
                  <NavDropdown.Item href="#ecoturismo">Ecoturismo</NavDropdown.Item>
                  <NavDropdown.Item href="#romantico">Romántico</NavDropdown.Item>
                  <NavDropdown.Item href="#familiar">Familiar</NavDropdown.Item>
                  <NavDropdown.Item href="#negocios">Negocios</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/mis-reservas">📅 Mis reservas</Nav.Link>
                <Nav.Link as={Link} to="/favoritos">⭐ Favoritos</Nav.Link>
                <Nav.Link as={Link} to="/reviews">📝 Reviews</Nav.Link>
              </>
            )}
            {/* Opciones para operadores logueados */}
            {isLoggedIn && isOperador && (
              <>
                <Nav.Link as={Link} to="/dashboard">📊 Dashboard empresa</Nav.Link>
                <Nav.Link as={Link} to="/mis-paquetes">🎒 Mis paquetes</Nav.Link>
                <Nav.Link as={Link} to="/reservas-recibidas">📅 Reservas recibidas</Nav.Link>
                <Nav.Link as={Link} to="/reviews-paquetes">📝 Reviews de mis paquetes</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ fontWeight: 400 }}>Registrarse</Nav.Link>
              </>
            ) : (
              <NavDropdown title={user?.nombre || user?.email || "Usuario"} id="usuario-dropdown" align="end">
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
