import React, { useEffect, useState } from 'react';
import { getMisReservas } from '../../api/reservas';
import DataTablas, { DataTablasColumn } from '../../components/comunes/DataTablas';

const MisReservasPage: React.FC = () => {
	const [reservas, setReservas] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

		useEffect(() => {
				async function fetchReservas() {
						try {
								const misReservas = await getMisReservas();
								setReservas(misReservas);
						} catch (err: any) {
								setError(err?.message || 'Error al cargar reservas');
						} finally {
								setLoading(false);
						}
				}
				fetchReservas();
		}, []);

		const columns: DataTablasColumn[] = [
			{ key: 'propiedad_titulo', label: 'Paquete' },
			{ key: 'fecha_inicio', label: 'Fecha inicio', render: (v) => v?.slice(0,10) },
			{ key: 'fecha_fin', label: 'Fecha fin', render: (v) => v?.slice(0,10) },
			{ key: 'numero_personas', label: 'Personas' },
			{ key: 'estado', label: 'Estado' },
			{ key: 'metodo_pago', label: 'Método de pago' },
			{ key: 'precio_total', label: 'Total', render: (v) => `$${v}` },
		];

		return (
			<div style={{ padding: '2rem' }}>
				<h2>Mis reservas</h2>
				{loading && <div>Cargando...</div>}
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<DataTablas columns={columns} data={reservas} emptyText={(!loading && reservas.length === 0) ? 'No tienes reservas.' : undefined} />
			</div>
		);
    }
export default MisReservasPage;
