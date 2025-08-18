import React, { useEffect, useState } from 'react';
import { getReservasByOperador, ReservaEmpresa } from '../../api/reservas';
import { useAuth } from '../../context/AuthContext';

const ReservasRecibidasPage: React.FC = () => {
  const [reservas, setReservas] = useState<ReservaEmpresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchReservas() {
      setLoading(true);
      try {
        const data = await getReservasByOperador(user?.token);
        setReservas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReservas();
  }, [user]);

  return (
    <div className="container py-4">
      <h2>Reservas recibidas</h2>
      {loading && <div>Cargando...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && reservas.length === 0 && <div>No hay reservas recibidas.</div>}
      {!loading && reservas.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paquete</th>
              <th>Turista</th>
              <th>Cantidad</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.paquete_titulo || r.paquete_id}</td>
                <td>{r.turista_nombre} {r.turista_apellido}</td>
                <td>{r.numero_personas}</td>
                <td>{r.fecha_inicio}</td>
                <td>{r.fecha_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservasRecibidasPage;
