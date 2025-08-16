import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePaqueteTuristico, getPaqueteTuristicoById } from '../../api/paqueteTusitico';

const EliminarPaquetePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [paquete, setPaquete] = useState<any>(null);

	React.useEffect(() => {
		async function fetchPaquete() {
			try {
				const data = await getPaqueteTuristicoById(id!);
				setPaquete(data);
			} catch (err: any) {
				setError(err?.message || 'Error al cargar el paquete');
			}
		}
		if (id) fetchPaquete();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm('¿Estás seguro de que deseas eliminar este paquete turístico?')) return;
		setLoading(true);
		try {
			await deletePaqueteTuristico(id!);
			navigate('/empresa/dashboard');
		} catch (err: any) {
			setError(err?.message || 'Error al eliminar el paquete');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ padding: '2rem' }}>
			<h2>Eliminar paquete turístico</h2>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{paquete ? (
				<div>
					<p><strong>{paquete.titulo}</strong> - {paquete.tipo_paquete} - {paquete.ciudad_destino} ({paquete.pais_destino})</p>
					<button onClick={handleDelete} disabled={loading} style={{ background: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
						{loading ? 'Eliminando...' : 'Eliminar'}
					</button>
					<button onClick={() => navigate(-1)} style={{ marginLeft: '1rem' }}>Cancelar</button>
				</div>
			) : (
				<div>Cargando información del paquete...</div>
			)}
		</div>
	);
};

export default EliminarPaquetePage;
