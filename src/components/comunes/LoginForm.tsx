import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import './RegisterForm.mode.css';

const initialState = {
  email: '',
  password: '',
};

const iconos = {
  email: '📧',
  password: '🔒',
};

const LoginForm: React.FC = () => {
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
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });
      // Decodifica el token JWT para extraer isOperador
      let isOperador = false;
      let id = undefined;
      if (res.access_token) {
        const payload = JSON.parse(atob(res.access_token.split('.')[1]));
        isOperador = payload.es_operador || false;
        id = payload.sub;
      }
      login({
        id: id ? Number(id) : 0,
        email: form.email,
        nombre: res.nombre || '',
        apellido: res.apellido || '',
        isOperador,
        token: res.access_token,
      });
      localStorage.setItem('token', res.access_token); // Guardar token JWT
      if (id) {
        localStorage.setItem('id', String(Number(id)));
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
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
        <div className="logo">🌿</div>
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta Kandamo</p>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="register-error message error">{error}</div>}
        {success && <div className="register-success message success">¡Bienvenido!</div>}

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
          />
          <div className="focus-border"></div>
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          <span>{loading ? 'Ingresando...' : 'Iniciar sesión'}</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
