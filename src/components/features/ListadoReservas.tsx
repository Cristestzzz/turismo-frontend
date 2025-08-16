import React, { useEffect, useState } from 'react';
import { getMisReservas } from '../../api/reservas';

const ListadoReservas: React.FC = () => {
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const misReservas = await getMisReservas();
        setReservas(misReservas);
      } catch (err: any) {
        setError(err?.message || 'Error al cargar reservas');
      } finally {
        setLoading(false);
      }
    }
    fetchReservas();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mis reservas</h2>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {reservas.length === 0 && !loading && <div>No tienes reservas.</div>}
      <ul>
        {reservas.map((r) => (
          <li key={r.id}>
            <strong>{r.propiedad_titulo}</strong> - {r.fecha_inicio} a {r.fecha_fin} - Estado: {r.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListadoReservas;