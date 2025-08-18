import React from 'react';
import EmpresaReviewsSection from '../../components/empresas/EmpresaReviewsSection';

const ReviewsPaquetesPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <h1>Reviews de mis paquetes</h1>
      <EmpresaReviewsSection />
    </div>
  );
};

export default ReviewsPaquetesPage;
