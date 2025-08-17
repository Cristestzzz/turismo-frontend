export interface UpdateUserProfileData {
  telefono?: string;
  fecha_nacimiento?: string;
  pais?: string;
  ciudad?: string;
  direccion?: string;
  codigo_postal?: string;
  nombre_empresa?: string;
  descripcion_empresa?: string;
}

export async function updateUserProfile(data: UpdateUserProfileData) {
  try {
    const token = localStorage.getItem('token');
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al actualizar perfil');
  }
}
import axios from 'axios';
export interface ConvertirseEmpresaData {
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  pais?: string;
  ciudad?: string;
}

export async function convertirEnEmpresa(data: ConvertirseEmpresaData) {
  try {
    const token = localStorage.getItem('token');
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/me/convert-to-operator`, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    const res = response.data;
    // Solo actualiza el estado si el backend lo confirma
    if (res.status === "pendiente_verificacion") {
      // Si tienes acceso a la función login y user, actualízalo aquí
      // login({ ...user!, isOperador: true });
      // setSuccess(true); // Si usas un estado de éxito
    }
    return res;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al convertir en empresa');
  }
}
export interface CreateUserData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  fecha_nacimiento?: string;
  pais?: string;
  ciudad?: string;
  direccion?: string;
  codigo_postal?: string;
}


export async function createUser(userData: CreateUserData) {
  try {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al crear usuario');
  }
}

export interface LoginUserData {
  email: string;
  password: string;
}

export async function loginUser(loginData: LoginUserData) {
  try {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, loginData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error al iniciar sesión');
  }
}