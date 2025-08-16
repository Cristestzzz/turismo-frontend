import axios from 'axios';

const API_URL = '/favoritos';

export async function addFavorito(paquete_id: number, token: string) {
	return axios.post(
		API_URL,
		{ paquete_id },
		{ headers: { Authorization: `Bearer ${token}` } }
	);
}

export async function removeFavorito(paquete_id: number, token: string) {
	return axios.delete(
		`${API_URL}/${paquete_id}`,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
}

export async function checkFavorito(paquete_id: number, token: string) {
  const res = await axios.get(
    `/favoritos/check/${paquete_id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
