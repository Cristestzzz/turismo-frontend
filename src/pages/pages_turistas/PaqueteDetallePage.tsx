import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaqueteTuristicoById } from '../../api/paqueteTusitico';
import ReservationCard from '../../components/turistas/ReservationCard'; // Importa el componente ReservationCard
import GallerySection from '../../components/turistas/GallerySection'; // Importa el componente GallerySection
import { getReviewsByPaquete } from '../../api/reviews';
import PackageDetails from '../../components/turistas/PackageDetails'; // Importa el componente PackageDetails
import { Button } from '../../components/ui/Button/Button'; // Importa el componente Button
import { LuPencilLine, LuHeart } from 'react-icons/lu'; // Importa los iconos
import CrearReviewPopup from '../../components/turistas/CrearReviewPopup';

const PaqueteDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paquete, setPaquete] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPaquete() {
      try {
        const data = await getPaqueteTuristicoById(id!);
        setPaquete(data);
      } catch (err: any) {
        setError(err?.message || 'Error al cargar el paquete');
      } finally {
        setLoading(false);
      }
    }
    async function fetchReviews() {
      try {
        const data = await getReviewsByPaquete(id!);
        setReviews(data);
      } catch {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }
    if (id) {
      fetchPaquete();
      fetchReviews();
    }
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!paquete) return <div>No se encontró el paquete.</div>;

  const handleOpenReviewPage = () => {
    // Lógica para abrir la página de revisión, por ahora solo un console.log
    console.log('Abrir página de revisión');
    // navigate('/review-page'); // Descomentar y ajustar si tienes una ruta de revisión
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{paquete.titulo}</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <CrearReviewPopup paqueteId={paquete.id} />
          <Button variant="outline" size="sm">
            <LuHeart size={16} />Guardar
          </Button>
        </div>
      </div>
      {paquete.imagenes && paquete.imagenes.length > 0 && (
        <GallerySection imagenes={paquete.imagenes} />
      )}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 2 }}>
          <PackageDetails paquete={paquete} />
        </div>
        <div style={{ flex: 1 }}>
          <ReservationCard
            precio={paquete.precio_por_persona}
            calificacion={4.7} // Valor hardcodeado, considera hacerlo dinámico si tienes los datos
            fechaDisponible="2025-09-09" // Valor hardcodeado, considera hacerlo dinámico si tienes los datos
            paqueteId={paquete.id} // Pasa el ID del paquete
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Reseñas del paquete</h3>
        {loadingReviews ? (
          <div>Cargando reseñas...</div>
        ) : reviews.length === 0 ? (
          <div>No hay reseñas para este paquete.</div>
        ) : (
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {reviews.map((review, idx) => (
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
    </div>
  );
};

export default PaqueteDetallePage;
