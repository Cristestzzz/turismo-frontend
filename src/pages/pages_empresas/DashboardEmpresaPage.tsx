import React from 'react';
import { Link } from 'react-router-dom';

const DashboardEmpresaPage: React.FC = () => {
	return (
		<div className="dashboard-empresa-container">
			<h1>Dashboard Empresa</h1>
			<p>Bienvenido al panel de operador turístico. Aquí puedes gestionar tus paquetes y reservas.</p>
			<div className="dashboard-actions">
				<Link to="/empresa/crear-paquete" className="dashboard-btn">Crear paquete turístico</Link>
				<Link to="/mis-paquetes" className="dashboard-btn">Ver mis paquetes</Link>
				<Link to="/reservas-recibidas" className="dashboard-btn">Reservas recibidas</Link>
			</div>
			{/* Aquí puedes agregar estadísticas, resumen, etc. */}
		</div>
	);
};

export default DashboardEmpresaPage;
