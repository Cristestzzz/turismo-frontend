import axios from 'axios';

export interface Review {
  id?: number;
  reserva_id: number;
  autor_id?: number;
  paquete_id: number;
  calificacion: number;
  comentario?: string;
  organizacion?: number;
  comunicacion?: number;
  actividades?: number;
  guia?: number;
  seguridad?: number;
  valor?: number;
  fecha_review?: string;
  autor_nombre?: string;
  autor_apellido?: string;
  autor_avatar?: string;
  paquete_titulo?: string;
  paquete_tipo?: string;
  reserva_fecha_inicio?: string;
  reserva_fecha_fin?: string;
}

export async function getReviewsByPaquete(paqueteId: number | string, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/paquete/${paqueteId}`, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener reviews');
  }
}

export async function createReview(reviewData: Review, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reviews/`, reviewData, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear review');
  }
}
