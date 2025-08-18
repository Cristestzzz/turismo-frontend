import React, { useEffect, useState } from 'react';
import { getMisPaquetesTuristicos } from '../../api/paqueteTusitico';
import { getReviewsByPaquete } from '../../api/reviews';
import { useAuth } from '../../context/AuthContext';

const EmpresaReviewsSection: React.FC = () => {
  const { user } = useAuth();
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const [reviewsPorPaquete, setReviewsPorPaquete] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaquetesYReviews() {
      setLoading(true);
      try {
        const paquetesData = await getMisPaquetesTuristicos(user?.token);
        setPaquetes(paquetesData);
        const reviewsMap: { [key: string]: any[] } = {};
        for (const paquete of paquetesData) {
          const reviews = await getReviewsByPaquete(paquete.id, user?.token);
          reviewsMap[paquete.id] = reviews;
        }
        setReviewsPorPaquete(reviewsMap);
      } catch {
        setPaquetes([]);
        setReviewsPorPaquete({});
      } finally {
        setLoading(false);
      }
    }
    if (user?.token) fetchPaquetesYReviews();
  }, [user]);

  if (loading) return <div>Cargando reseñas de tus paquetes...</div>;
  if (paquetes.length === 0) return <div>No tienes paquetes turísticos creados.</div>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Reseñas recibidas en tus paquetes</h2>
      {paquetes.map(paquete => (
        <div key={paquete.id} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>{paquete.titulo}</h3>
          {reviewsPorPaquete[paquete.id]?.length === 0 ? (
            <div style={{ color: '#888' }}>No hay reseñas para este paquete.</div>
          ) : (
            <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {reviewsPorPaquete[paquete.id].map((review: any, idx: number) => (
                <div key={review.id || idx} className="review-card" style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '1.2rem', display: 'flex', flexDirection: 'column', minHeight: '180px' }}>
                  <div className="review-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div className="review-avatar" style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 20, marginRight: 12 }}>
                      {review.autor_nombre?.charAt(0) || '?'}
                    </div>
                    <div className="review-author">
                      <h4 style={{ margin: 0 }}>{review.autor_nombre} {review.autor_apellido}</h4>
                      <span style={{ fontSize: 13, color: '#888' }}>{review.paquete_titulo}</span>
                    </div>
                  </div>
                  <div className="review-content" style={{ flex: 1 }}>
                    <div className="review-rating" style={{ fontSize: 18, color: '#f5b50a', marginBottom: 4 }}>
                      {'★'.repeat(review.calificacion)}{'☆'.repeat(5 - review.calificacion)}
                      <span className="review-date" style={{ fontSize: 12, color: '#888', marginLeft: 8 }}>· {review.fecha_review?.slice(0, 10)}</span>
                    </div>
                    <p className="review-text" style={{ margin: 0, fontSize: 15 }}>{review.comentario}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmpresaReviewsSection;
