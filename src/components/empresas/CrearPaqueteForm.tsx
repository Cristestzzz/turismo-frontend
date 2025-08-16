import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './CrearPaqueteForm.mode.css';
import { createPaqueteTuristico, PaqueteTuristicoCreate } from '../../api/paqueteTusitico';

const initialState: PaqueteTuristicoCreate = {
	titulo: '',
	descripcion: '',
	tipo_paquete: 'aventura',
	duracion_dias: 1,
	capacidad_maxima: 1,
	nivel_dificultad: 'facil',
	precio_por_persona: 0,
	precio_niño: 0,
	incluye_transporte: false,
	incluye_alojamiento: false,
	incluye_comidas: false,
	incluye_guia: false,
	pais_destino: '',
	ciudad_destino: '',
	punto_encuentro: '',
  // latitud y longitud eliminados
	hora_inicio: '09:00',
	hora_fin: '18:00',
	edad_minima: 0,
	requiere_experiencia: false,
	permite_cancelacion: true,
  // dias_cancelacion eliminado
  imagenes: [],
};

const tiposPaquete = [
	'aventura', 'cultural', 'gastronomico', 'playa', 'montaña', 'ciudad', 'ecoturismo', 'romantico', 'familiar', 'negocios'
];
const nivelesDificultad = ['facil', 'moderado', 'dificil', 'extremo'];

const CrearPaqueteForm: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Construir el payload asegurando tipos correctos y omitiendo undefined
      let paqueteData: any = { ...form };
      // Agregar operador_id requerido por el backend
      const operadorId = localStorage.getItem('id');
      paqueteData.operador_id = operadorId ? Number(operadorId) : 0;
      // Convertir campos numéricos a número (por si acaso)
      paqueteData.duracion_dias = Number(paqueteData.duracion_dias);
      paqueteData.capacidad_maxima = Number(paqueteData.capacidad_maxima);
      paqueteData.precio_por_persona = Number(paqueteData.precio_por_persona);
      paqueteData.precio_niño = Number(paqueteData.precio_niño);
      paqueteData.edad_minima = Number(paqueteData.edad_minima);
      // dias_cancelacion eliminado del payload
      // latitud y longitud eliminados del payload
      // Si descripción está vacía, eliminar
      if (!paqueteData.descripcion) delete paqueteData.descripcion;
      // Si servicios_incluidos está vacío, eliminar
      if (!paqueteData.servicios_incluidos) delete paqueteData.servicios_incluidos;
      // Si imágenes están seleccionadas, convertir a base64
      if (selectedImages.length > 0) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
        paqueteData.imagenes = await Promise.all(selectedImages.map(toBase64));
      } else {
        delete paqueteData.imagenes;
      }
      // ...existing code...
      console.log('Payload enviado:', paqueteData);
      await createPaqueteTuristico(paqueteData, user?.token);
      setSuccess(true);
      setForm(initialState);
      setSelectedImages([]);
      // Redirigir al dashboard empresa después de crear el paquete
      navigate('/dashboard-empresa');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="crear-paquete-container mejorado">
    <h2>Crear Paquete Turístico</h2>
    <form className="crear-paquete-form grid-form" onSubmit={handleSubmit}>
      {error && <div className="form-error message error">{error}</div>}
      {success && <div className="form-success message success">¡Paquete creado exitosamente!</div>}
      <div className="form-col">
        <label>Título del paquete</label>
        <input name="titulo" type="text" className="form-input" placeholder="Ej: Aventura en la selva" value={form.titulo} onChange={handleChange} required />
        <label>Descripción</label>
        <textarea name="descripcion" className="form-input" placeholder="Describe el paquete" value={form.descripcion} onChange={handleChange} />
        <label>Tipo de paquete</label>
        <select name="tipo_paquete" className="form-input" value={form.tipo_paquete} onChange={handleChange} required>
          {tiposPaquete.map(tp => <option key={tp} value={tp}>{tp}</option>)}
        </select>
        <label>Duración (días)</label>
        <input name="duracion_dias" type="number" className="form-input" placeholder="Ej: 5" value={form.duracion_dias} onChange={handleChange} min={1} max={30} required />
        <label>Capacidad máxima</label>
        <input name="capacidad_maxima" type="number" className="form-input" placeholder="Ej: 20" value={form.capacidad_maxima} onChange={handleChange} min={1} max={50} required />
        <label>Nivel de dificultad</label>
        <select name="nivel_dificultad" className="form-input" value={form.nivel_dificultad} onChange={handleChange} required>
          {nivelesDificultad.map(nd => <option key={nd} value={nd}>{nd}</option>)}
        </select>
        <label>Precio por persona</label>
        <input name="precio_por_persona" type="number" className="form-input" placeholder="Ej: 1500" value={form.precio_por_persona} onChange={handleChange} min={1} required />
        <label>Precio niño</label>
        <input name="precio_niño" type="number" className="form-input" placeholder="Ej: 800" value={form.precio_niño} onChange={handleChange} min={0} />
        <label>Incluye:</label>
        <div className="form-group form-checkboxes">
          <label><input name="incluye_transporte" type="checkbox" checked={form.incluye_transporte} onChange={handleChange} /> Transporte</label>
          <label><input name="incluye_alojamiento" type="checkbox" checked={form.incluye_alojamiento} onChange={handleChange} /> Alojamiento</label>
          <label><input name="incluye_comidas" type="checkbox" checked={form.incluye_comidas} onChange={handleChange} /> Comidas</label>
          <label><input name="incluye_guia" type="checkbox" checked={form.incluye_guia} onChange={handleChange} /> Guía</label>
          <label><input name="requiere_experiencia" type="checkbox" checked={form.requiere_experiencia} onChange={handleChange} /> Requiere experiencia</label>
          <label><input name="permite_cancelacion" type="checkbox" checked={form.permite_cancelacion} onChange={handleChange} /> Permite cancelación</label>
        </div>
      </div>
      <div className="form-col">
        <label>País destino</label>
        <input name="pais_destino" type="text" className="form-input" placeholder="Ej: Perú" value={form.pais_destino} onChange={handleChange} required />
        <label>Ciudad destino</label>
        <input name="ciudad_destino" type="text" className="form-input" placeholder="Ej: Cusco" value={form.ciudad_destino} onChange={handleChange} required />
        <label>Punto de encuentro</label>
        <input name="punto_encuentro" type="text" className="form-input" placeholder="Ej: Plaza principal" value={form.punto_encuentro} onChange={handleChange} required />
  {/* latitud y longitud eliminados del formulario */}
        <label>Hora inicio (HH:mm)</label>
        <input name="hora_inicio" type="text" className="form-input" placeholder="Ej: 09:00" value={form.hora_inicio} onChange={handleChange} />
        <label>Hora fin (HH:mm)</label>
        <input name="hora_fin" type="text" className="form-input" placeholder="Ej: 18:00" value={form.hora_fin} onChange={handleChange} />
        <label>Edad mínima</label>
        <input name="edad_minima" type="number" className="form-input" placeholder="Ej: 12" value={form.edad_minima} onChange={handleChange} min={0} max={100} />
  {/* dias_cancelacion eliminado del formulario */}
        <label>Imágenes del paquete</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        {selectedImages.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {selectedImages.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #e3eaf2' }} />
            ))}
          </div>
        )}
      </div>
  {/* ...existing code... (removed duplicate 'Incluye' section) */}
      <div className="form-actions">
        <button type="submit" className="crear-paquete-button crear-paquete-button-small" disabled={loading}>
          <span>{loading ? 'Enviando...' : 'Crear paquete'}</span>
        </button>
      </div>
    </form>
  </div>
);
};

export default CrearPaqueteForm;
