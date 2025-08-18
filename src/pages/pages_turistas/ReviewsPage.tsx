import React from 'react';
import MisReviewsSection from '../../components/turistas/MisReviewsSection';

const ReviewsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <h1>Mis reviews</h1>
      <MisReviewsSection />
    </div>
  );
};

export default ReviewsPage;
