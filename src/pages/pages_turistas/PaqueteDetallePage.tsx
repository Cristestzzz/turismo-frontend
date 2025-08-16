import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaqueteTuristicoById } from '../../api/paqueteTusitico';

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

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>{paquete.titulo}</h2>
      {paquete.imagenes && paquete.imagenes.length > 0 && (
        <img src={paquete.imagenes[0]} alt={paquete.titulo} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
      )}
      <p><strong>Tipo:</strong> {paquete.tipo_paquete}</p>
      <p><strong>Destino:</strong> {paquete.ciudad_destino}, {paquete.pais_destino}</p>
      <p><strong>Duración:</strong> {paquete.duracion_dias} días</p>
      <p><strong>Capacidad máxima:</strong> {paquete.capacidad_maxima}</p>
      <p><strong>Nivel de dificultad:</strong> {paquete.nivel_dificultad}</p>
      <p><strong>Precio por persona:</strong> S/ {paquete.precio_por_persona}</p>
      <p><strong>Descripción:</strong> {paquete.descripcion || 'Sin descripción'}</p>
      {/* Puedes agregar más campos si lo deseas */}
      <button style={{ marginTop: 24, background: '#1976d2', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: 6, fontSize: 18 }} onClick={() => navigate(`/reservar-paquete/${paquete.id}`)}>
        Reservar
      </button>
    </div>
  );
};

export default PaqueteDetallePage;
