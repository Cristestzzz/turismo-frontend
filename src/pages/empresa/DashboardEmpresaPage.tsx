import React from 'react';
import EmpresaReviewsSection from '../../components/empresas/EmpresaReviewsSection';

const DashboardEmpresaPage: React.FC = () => {
	return (
		<div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
			<h1>Panel de Operador</h1>
			{/* Aquí puedes agregar más secciones del dashboard si lo deseas */}
			<EmpresaReviewsSection />
		</div>
	);
};

export default DashboardEmpresaPage;
