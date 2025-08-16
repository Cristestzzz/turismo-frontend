import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { convertirEnEmpresa } from '../../api/user';

const initialState = {
  telefono: '',
  fecha_nacimiento: '',
  genero: '',
  pais: '',
  ciudad: '',
  direccion: '',
  codigo_postal: '',
  nombre_empresa: '',
  descripcion_empresa: '',
};

const ConvertirseEmpresaPage: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await convertirEnEmpresa({
        email: user?.email ?? "",
        ...form,
      });
      login({ ...user!, isOperador: true });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="register-container">
      <div className="register-header">
        <div className="logo">🏢</div>
        <h2>Convertirse en Empresa</h2>
        <p>Completa los datos para ser operador/anfitrión</p>
        <div style={{ marginTop: '1rem' }}>
          <p>¿Ya eres operador? Puedes crear paquetes turísticos desde tu panel:</p>
          <Link to="/empresa/crear-paquete" className="empresa-link">Ir a crear paquete turístico</Link>
        </div>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="register-error message error">{error}</div>}
        {success && <div className="register-success message success">¡Ya eres empresa!</div>}
        <div className="form-group">
          <input name="nombre_empresa" type="text" className="form-input" placeholder="Nombre de la empresa" value={form.nombre_empresa} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <textarea name="descripcion_empresa" className="form-input" placeholder="Descripción de la empresa" value={form.descripcion_empresa} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="telefono" type="text" className="form-input" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="fecha_nacimiento" type="date" className="form-input" placeholder="Fecha de nacimiento" value={form.fecha_nacimiento} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="genero" type="text" className="form-input" placeholder="Género" value={form.genero} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="pais" type="text" className="form-input" placeholder="País" value={form.pais} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="ciudad" type="text" className="form-input" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="direccion" type="text" className="form-input" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="codigo_postal" type="text" className="form-input" placeholder="Código postal" value={form.codigo_postal} onChange={handleChange} required />
        </div>
        <label htmlFor="nombre_empresa" className="convert-label">Nombre de la empresa</label>
<input name="nombre_empresa" id="nombre_empresa" type="text" className="form-input" value={form.nombre_empresa} onChange={handleChange} required />

<label htmlFor="descripcion_empresa" className="convert-label">Descripción de la empresa</label>
<input name="descripcion_empresa" id="descripcion_empresa" type="text" className="form-input" value={form.descripcion_empresa} onChange={handleChange} required />
        <button type="submit" className="register-button" disabled={loading}>
          <span>{loading ? 'Enviando...' : 'Convertirse en empresa'}</span>
        </button>
      </form>
    </div>
  );
};

export default ConvertirseEmpresaPage;
