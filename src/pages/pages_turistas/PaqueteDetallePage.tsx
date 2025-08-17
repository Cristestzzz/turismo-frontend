import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaqueteTuristicoById } from '../../api/paqueteTusitico';
import ReservationCard from '../../components/turistas/ReservationCard'; // Importa el componente ReservationCard
import GallerySection from '../../components/turistas/GallerySection'; // Importa el componente GallerySection
import ReviewsSection from '../../components/turistas/ReviewsSection'; // Importa el componente ReviewsSection
import PackageDetails from '../../components/turistas/PackageDetails'; // Importa el componente PackageDetails
import { Button } from '../../components/ui/Button/Button'; // Importa el componente Button
import { LuPencilLine, LuHeart } from 'react-icons/lu'; // Importa los iconos

const PaqueteDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paquete, setPaquete] = useState<any>(null);
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
    if (id) fetchPaquete();
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
          <Button
            variant="outline"
            size="sm"
            className="button-revisar"
            onClick={handleOpenReviewPage}
          >
            <LuPencilLine size={16} />Revisar
          </Button>
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
      <ReviewsSection />
    </div>
  );
};

export default PaqueteDetallePage;
