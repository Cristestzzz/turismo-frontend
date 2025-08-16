import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { convertirEnEmpresa, updateUserProfile } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import './ConvertirseEmpresa.mode.css';

interface Props {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

const initialState = {
  telefono: '',
  fecha_nacimiento: '',
  pais: '',
  ciudad: '',
};

const ConvertirseEmpresaModal: React.FC<Props> = ({ show, onHide, onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const { user, login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Solo estos campos serán obligatorios
      const camposObligatorios: Array<keyof typeof form> = [
        'telefono',
        'fecha_nacimiento',
        'pais',
        'ciudad',
      ];
      for (let i = 0; i < camposObligatorios.length; i++) {
        const key = camposObligatorios[i];
        if (!form[key]) {
          setError('Por favor completa todos los campos obligatorios');
          setLoading(false);
          return;
        }
      }
      // 1. Actualizar perfil primero
  // Construir payload solo con campos no vacíos y fecha en formato ISO
  const payload: any = {};
  if (form.telefono) payload.telefono = form.telefono;
  if (form.fecha_nacimiento) payload.fecha_nacimiento = new Date(form.fecha_nacimiento).toISOString();
  if (form.pais) payload.pais = form.pais;
  if (form.ciudad) payload.ciudad = form.ciudad;
  await updateUserProfile(payload);
      // 2. Convertir en empresa
      const res = await convertirEnEmpresa({
        email: user?.email ?? '',
        telefono: form.telefono,
        fecha_nacimiento: form.fecha_nacimiento,
        pais: form.pais,
        ciudad: form.ciudad,
      });
      // Si el backend responde con estado pendiente_verificacion, mostrar mensaje informativo
      if (res.status === 'pendiente_verificacion') {
        setInfo(res.message + (res.note ? `\n${res.note}` : ''));
        login({ ...user!, isOperador: true });
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setInfo(null);
          onHide();
        }, 3500);
        return;
      }
      // Si no, cerrar normalmente
      login({ ...user!, isOperador: true });
      if (onSuccess) onSuccess();
      onHide();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Convertirse en Empresa</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} className="convertirse-empresa-form">
        <Modal.Body>
          {error && <div className="register-error message error">{error}</div>}
          {info && <div className="register-success message success" style={{ whiteSpace: 'pre-line', marginBottom: '1rem' }}>{info}</div>}
          <label htmlFor="telefono" className="convert-label">Teléfono</label>
          <input name="telefono" id="telefono" type="text" className="form-input" value={form.telefono} onChange={handleChange} required />

          <label htmlFor="fecha_nacimiento" className="convert-label">Fecha de nacimiento</label>
          <input name="fecha_nacimiento" id="fecha_nacimiento" type="date" className="form-input" value={form.fecha_nacimiento} onChange={handleChange} required />

          <label htmlFor="pais" className="convert-label">País</label>
          <input name="pais" id="pais" type="text" className="form-input" value={form.pais} onChange={handleChange} required />

          <label htmlFor="ciudad" className="convert-label">Ciudad</label>
          <input name="ciudad" id="ciudad" type="text" className="form-input" value={form.ciudad} onChange={handleChange} required />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Convertirse en empresa'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ConvertirseEmpresaModal;