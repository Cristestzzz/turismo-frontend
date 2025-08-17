import axios from 'axios';

export interface ReservaCreate {
  paquete_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  numero_personas: number;
  numero_adultos: number;
  numero_niños: number;
  precio_total: number;
  precio_por_persona: number;
  precio_niños: number;

// Interfaz para los datos de reserva, ajusta los campos según el backend

}
// Interfaz para los datos de reserva, ajusta los campos según el backend
export interface ReservaPayload {
  paquete_id: number;
  fecha_inicio: string; // formato 'YYYY-MM-DD'
  fecha_fin: string; // formato 'YYYY-MM-DD'
  numero_personas: number;
  numero_adultos: number;
  numero_niños: number;
  precio_total: number;
  precio_por_persona: number;
  precio_niños: number;
}

export const crearReserva = async (reservaData: ReservaPayload, token?: string) => {
  try {
    // Robustecer el payload eliminando campos undefined y asegurando tipos
    const payload: any = { ...reservaData };
    Object.keys(payload).forEach(key => {
      if (payload[key] === undefined) delete payload[key];
    });
    payload.paquete_id = Number(payload.paquete_id);
    // Obtener el token desde localStorage si no se pasa explícitamente
    const authToken = token || localStorage.getItem('token');
    const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/reservas/`,
      payload,
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : '',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear reserva');
  }
};


export const getMisReservas = async (token?: string) => {
  const authToken = token || localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reservas/`, {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};