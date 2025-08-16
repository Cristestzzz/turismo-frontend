import React, { useState } from 'react';
import { createUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './RegisterForm.mode.css';

const initialState = {
  email: '',
  password: '',
  nombre: '',
  apellido: '',
};

const iconos = {
  email: '📧',
  password: '🔒',
  nombre: '👤',
  apellido: '👥',
};


const RegisterForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createUser(form);
      setSuccess(true);
      login({
        email: form.email,
        nombre: form.nombre,
        apellido: form.apellido,
      });
      setForm(initialState);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200); // Pequeña pausa para mostrar el mensaje de éxito
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <div className="logo">🌿</div>
        <h2>Registro de Usuario</h2>
        <p>Únete a la comunidad Kandamo</p>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="register-error message error">{error}</div>}
        {success && <div className="register-success message success">¡Usuario creado exitosamente!</div>}

        <div className="form-group">
          <span className="icon">{iconos.email}</span>
          <input
            name="email"
            type="email"
            className="form-input"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="focus-border"></div>
        </div>

        <div className="form-group">
          <span className="icon">{iconos.password}</span>
          <input
            name="password"
            type="password"
            className="form-input"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <div className="focus-border"></div>
        </div>

        <div className="form-group">
          <span className="icon">{iconos.nombre}</span>
          <input
            name="nombre"
            type="text"
            className="form-input"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <div className="focus-border"></div>
        </div>

        <div className="form-group">
          <span className="icon">{iconos.apellido}</span>
          <input
            name="apellido"
            type="text"
            className="form-input"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <div className="focus-border"></div>
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          <span>{loading ? 'Registrando...' : 'Registrarse'}</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;