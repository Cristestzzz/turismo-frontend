import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaqueteTuristicoById, updatePaqueteTuristico } from '../../api/paqueteTusitico';

const EditarPaquetePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paquete, setPaquete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    async function fetchPaquete() {
      try {
        const paquete = await getPaqueteTuristicoById(id!);
        setPaquete(paquete);
        setForm(paquete);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPaquete();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Solo enviar los campos válidos para la actualización
      const camposValidos = [
        'titulo', 'descripcion', 'tipo_paquete', 'duracion_dias', 'capacidad_maxima',
        'nivel_dificultad', 'precio_por_persona', 'pais_destino', 'ciudad_destino', 'punto_encuentro'
      ];
      const payload: any = {};
      for (const key of camposValidos) {
        if (form[key] !== undefined) {
          if (["duracion_dias", "capacidad_maxima", "precio_por_persona"].includes(key)) {
            payload[key] = Number(form[key]);
          } else {
            payload[key] = form[key];
          }
        }
      }
      console.log('Payload enviado:', payload);
      try {
        await updatePaqueteTuristico(id!, payload);
        navigate('/mis-paquetes');
      } catch (err: any) {
        console.error('Error al actualizar:', err);
        setError(err?.message || JSON.stringify(err));
      }
    } catch (err: any) {
      setError(err?.message || JSON.stringify(err));
    }
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!paquete) return <div>No se encontró el paquete.</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Editar paquete turístico</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input name="titulo" value={form.titulo || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Descripción:
          <textarea name="descripcion" value={form.descripcion || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tipo de paquete:
          <input name="tipo_paquete" value={form.tipo_paquete || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Duración (días):
          <input type="number" name="duracion_dias" value={form.duracion_dias || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Capacidad máxima:
          <input type="number" name="capacidad_maxima" value={form.capacidad_maxima || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Nivel de dificultad:
          <input name="nivel_dificultad" value={form.nivel_dificultad || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Precio por persona:
          <input type="number" name="precio_por_persona" value={form.precio_por_persona || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          País destino:
          <input name="pais_destino" value={form.pais_destino || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Ciudad destino:
          <input name="ciudad_destino" value={form.ciudad_destino || ''} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Punto de encuentro:
          <input name="punto_encuentro" value={form.punto_encuentro || ''} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditarPaquetePage;
