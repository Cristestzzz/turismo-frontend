import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMisPaquetesTuristicos, deletePaqueteTuristico } from '../../api/paqueteTusitico';
import DataTablas, { DataTablasColumn } from '../../components/comunes/DataTablas';

const MisPaquetesPage: React.FC = () => {
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaquetes() {
      try {
        const misPaquetes = await getMisPaquetesTuristicos();
        if (!Array.isArray(misPaquetes)) {
          throw new Error('La respuesta de la API no es una lista. Respuesta: ' + JSON.stringify(misPaquetes));
        }
        setPaquetes(misPaquetes);
      } catch (err: any) {
        setError(err?.message || 'Error desconocido: ' + JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    }
    fetchPaquetes();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este paquete turístico?')) return;
    try {
      await deletePaqueteTuristico(id);
      setPaquetes((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err?.message || 'Error al eliminar paquete turístico');
    }
  };

  const columns: DataTablasColumn[] = [
    { key: 'titulo', label: 'Título' },
    { key: 'tipo_paquete', label: 'Tipo' },
    { key: 'ciudad_destino', label: 'Ciudad' },
    { key: 'pais_destino', label: 'País' },
    { key: 'precio_por_persona', label: 'Precio por persona', render: (v) => `$${v}` },
    { key: 'capacidad_maxima', label: 'Capacidad' },
    { key: 'acciones', label: 'Acciones', render: (_v, row) => (
      <>
        <button style={{ marginRight: '0.5rem' }} onClick={() => navigate(`/empresa/editar-paquete/${row.id}`)}>
          Editar
        </button>
        <button style={{ color: 'white', background: 'red', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px' }} onClick={() => handleDelete(row.id)}>
          Eliminar
        </button>
      </>
    ) },
  ];

  // Agregar campo ficticio 'acciones' para cada paquete
  const paquetesConAcciones = paquetes.map(p => ({ ...p, acciones: '' }));

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mis paquetes turísticos</h2>
      {loading && <div>Cargando...</div>}
      {error && (
        <div style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
          <strong>Error al cargar/eliminar paquetes:</strong>
          <br />
          {error}
        </div>
      )}
      <DataTablas columns={columns} data={paquetesConAcciones} emptyText={(!loading && paquetes.length === 0) ? 'No tienes paquetes creados.' : undefined} />
    </div>
  );
};

export default MisPaquetesPage;
