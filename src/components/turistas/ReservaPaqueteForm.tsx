import React, { useState } from 'react';
import './ReservaPaqueteForm.mode.css';

interface ReservaPaqueteFormProps {
  paqueteId: string | number;
  precioPorPersona: number;
  precioNiños?: number;
  onSubmit: (data: any) => Promise<void>;
  userNombre: string;
  userEmail: string;
}

const ReservaPaqueteForm: React.FC<ReservaPaqueteFormProps> = ({
  paqueteId,
  precioPorPersona,
  precioNiños = 0,
  onSubmit,
  userNombre,
  userEmail,
}) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [numeroPersonas, setNumeroPersonas] = useState(1);
  const [numeroAdultos, setNumeroAdultos] = useState(1);
  const [numeroNinos, setNumeroNinos] = useState(0);
  const [metodoPago, setMetodoPago] = useState('Tarjeta');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Calcula el precio total
  const precioTotal = (numeroAdultos * precioPorPersona) + (numeroNinos * precioNiños);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!fechaInicio || !fechaFin) throw new Error('Debes seleccionar las fechas');
      if (numeroPersonas !== numeroAdultos + numeroNinos) throw new Error('La suma de adultos y niños debe ser igual al total de personas');
      const data = {
        paquete_id: paqueteId,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        numero_personas: numeroPersonas,
        numero_adultos: numeroAdultos,
        numero_niños: numeroNinos,
        precio_total: precioTotal,
        precio_por_persona: precioPorPersona,
        precio_niños: precioNiños,
        metodo_pago: metodoPago,
      };
      await onSubmit(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al reservar');
    } finally {
      setLoading(false);
    }
  };

  return (
  <form className="reserva-paquete-form" onSubmit={handleSubmit}>
      <div>
        <label>Fecha inicio</label>
        <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />
      </div>
      <div>
        <label>Fecha fin</label>
        <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} required />
      </div>
      <div>
        <label>Número de personas</label>
        <input type="number" value={numeroPersonas} onChange={e => setNumeroPersonas(Number(e.target.value))} min={1} max={50} required />
      </div>
      <div>
        <label>Número de adultos</label>
        <input type="number" value={numeroAdultos} onChange={e => setNumeroAdultos(Number(e.target.value))} min={1} max={50} required />
      </div>
      <div>
        <label>Número de niños</label>
        <input type="number" value={numeroNinos} onChange={e => setNumeroNinos(Number(e.target.value))} min={0} max={20} required />
      </div>
      <div>
        <label>Precio total</label>
        <input type="number" value={precioTotal} disabled />
      </div>
      <div>
        <label>Método de pago</label>
        <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} required>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Reservando...' : 'Reservar'}
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">¡Reserva realizada con éxito!</div>}
    </form>
  );
};

export default ReservaPaqueteForm;
