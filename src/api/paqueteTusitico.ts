// Declaración global para que TypeScript reconozca import.meta.env en Vite
declare global {
  interface ImportMeta {
    env: {
      VITE_BACKEND_URL: string;
      // Agrega aquí otras variables si las usasa
    };
  }
}
export interface ReservaPaqueteData {
  paquete_id: string | number;
  nombre: string;
  email: string;
  cantidad: number;
}

export async function reservarPaqueteTuristico(data: ReservaPaqueteData, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reservas/`, data, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al reservar paquete turístico');
  }
}
export async function deletePaqueteTuristico(id: string | number, token?: string) {
  const authToken = token || localStorage.getItem('token');
  if (!authToken || authToken === 'null' || authToken === 'undefined') {
    throw new Error('No hay token de autenticación. Inicia sesión para continuar.');
  }
  try {
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/${id}`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al eliminar paquete turístico');
  }
}
import axios from 'axios';

export interface PaqueteTuristicoFiltros {
  tipo_paquete?: string;
  // Puedes agregar más filtros si el backend lo soporta
}

export async function searchPaquetesTuristicos(filtros: PaqueteTuristicoFiltros, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/search`,
      filtros,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al buscar paquetes turísticos');
  }
}

export interface PaqueteTuristicoCreate {
  titulo: string;
  descripcion?: string;
  tipo_paquete: string;
  duracion_dias: number;
  capacidad_maxima: number;
  nivel_dificultad: string;
  precio_por_persona: number;
  precio_niño?: number;
  incluye_transporte?: boolean;
  incluye_alojamiento?: boolean;
  incluye_comidas?: boolean;
  incluye_guia?: boolean;
  pais_destino: string;
  ciudad_destino: string;
  punto_encuentro: string;
  latitud?: number;
  longitud?: number;
  hora_inicio?: string;
  hora_fin?: string;
  edad_minima?: number;
  requiere_experiencia?: boolean;
  permite_cancelacion?: boolean;
  dias_cancelacion?: number;
  servicios_incluidos?: string;
  imagenes?: string[];
}

export async function createPaqueteTuristico(data: PaqueteTuristicoCreate, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/`, data, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear paquete turístico');
  }
}

export async function getPaquetesTuristicos(token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener paquetes turísticos');
  }
}

export async function getMisPaquetesTuristicos(token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/operador/mis-paquetes`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener mis paquetes turísticos');
  }
}

export async function updatePaqueteTuristico(id: string | number, data: any, token?: string) {
  const authToken = token || localStorage.getItem('token');
  if (!authToken || authToken === 'null' || authToken === 'undefined') {
    throw new Error('No hay token de autenticación. Inicia sesión para continuar.');
  }
  try {
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/${id}`, data, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al actualizar paquete turístico');
  }
}

export async function getPaqueteTuristicoById(id: string | number, token?: string) {
  try {
    const authToken = token || localStorage.getItem('token');
    const headers: any = { 'Content-Type': 'application/json' };
    if (authToken) headers.Authorization = `Bearer ${authToken}`;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/paquetes-turisticos/${id}`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al obtener paquete turístico');
  }
}
