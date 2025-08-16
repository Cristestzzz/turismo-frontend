import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { crearReserva, ReservaPayload } from '../../api/reservas';
import ReservaPaqueteForm from '../../components/turistas/ReservaPaqueteForm';
import { getPaqueteTuristicoById } from '../../api/paqueteTusitico';

const ReservarPaquetePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [precioPorPersona, setPrecioPorPersona] = useState<number>(0);
  const [precioNiños, setPrecioNiños] = useState<number>(0);
  const [loadingPaquete, setLoadingPaquete] = useState(true);
  const [errorPaquete, setErrorPaquete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPaquete() {
      if (!id) return;
      try {
        const paquete = await getPaqueteTuristicoById(id);
        setPrecioPorPersona(paquete.precio_por_persona || 0);
        setPrecioNiños(paquete.precio_niño || 0);
      } catch (err: any) {
        setErrorPaquete(err?.message || 'Error al obtener paquete');
      } finally {
        setLoadingPaquete(false);
      }
    }
    fetchPaquete();
  }, [id]);

  const handleReserva = async (data: any) => {
    try {
      // Validar campos obligatorios
      if (!data.paquete_id || !data.fecha_inicio || !data.fecha_fin) throw new Error('Todos los campos son obligatorios');
      if (isNaN(Number(data.numero_personas)) || isNaN(Number(data.numero_adultos)) || isNaN(Number(data.numero_niños))) throw new Error('Cantidad de personas/adultos/niños inválida');
      if (isNaN(Number(data.precio_por_persona)) || isNaN(Number(data.precio_niños))) throw new Error('Precio inválido');
      // Construir el payload con todos los campos obligatorios
      const payload = {
        paquete_id: Number(data.paquete_id),
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        numero_personas: Number(data.numero_personas),
        numero_adultos: Number(data.numero_adultos),
        numero_niños: Number(data.numero_niños),
        precio_total: Number((data.numero_adultos * data.precio_por_persona) + (data.numero_niños * data.precio_niños)),
        precio_por_persona: Number(data.precio_por_persona),
        precio_niños: Number(data.precio_niños),
      };
      await crearReserva(payload, user?.token);
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '0 auto' }}>
      <h2>Reservar paquete turístico</h2>
      {loadingPaquete && <div>Cargando información del paquete...</div>}
      {errorPaquete && <div style={{ color: 'red' }}>{errorPaquete}</div>}
      {!loadingPaquete && !errorPaquete && (
        <ReservaPaqueteForm
          paqueteId={id ?? ''}
          precioPorPersona={precioPorPersona}
          precioNiños={precioNiños}
          onSubmit={handleReserva}
          userNombre={user?.nombre || ''}
          userEmail={user?.email || ''}
        />
      )}
    </div>
  );
};

export default ReservarPaquetePage;
