import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { createReview } from '../../api/reviews';

interface CrearReviewPopupProps {
  paqueteId: number;
  reservaId?: number;
  onReviewCreated?: () => void;
}

const CrearReviewPopup: React.FC<CrearReviewPopupProps> = ({ paqueteId, reservaId, onReviewCreated }) => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setComentario('');
    setCalificacion(5);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const reviewPayload: any = {
        comentario,
        calificacion,
        paquete_id: paqueteId,
      };
      if (typeof reservaId === 'number') reviewPayload.reserva_id = reservaId;
      await createReview(reviewPayload, user?.token);
      setSuccess(true);
      if (onReviewCreated) onReviewCreated();
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Error al enviar review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        Comentar
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deja tu comentario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <div className="text-danger mb-2">{error}</div>}
            {success && <div className="text-success mb-2">¡Comentario enviado!</div>}
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                value={calificacion}
                onChange={e => setCalificacion(Number(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CrearReviewPopup;
