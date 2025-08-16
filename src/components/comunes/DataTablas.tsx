import React from 'react';

export interface DataTablasColumn {
	key: string;
	label: string;
	render?: (value: any, row: any) => React.ReactNode;
}

interface DataTablasProps {
	columns: DataTablasColumn[];
	data: any[];
	emptyText?: string;
}

const DataTablas: React.FC<DataTablasProps> = ({ columns, data, emptyText }) => {
	return (
		<div style={{ width: '100%', overflowX: 'auto' }}>
			<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
				<thead>
					<tr style={{ background: '#f5f5f5' }}>
						{columns.map(col => (
							<th key={col.key} style={{ border: '1px solid #ddd', padding: '8px' }}>{col.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
								{emptyText || 'No hay datos para mostrar.'}
							</td>
						</tr>
					) : (
						data.map((row, idx) => (
							<tr key={row.id || idx}>
								{columns.map(col => (
									<td key={col.key} style={{ border: '1px solid #ddd', padding: '8px' }}>
										{col.render ? col.render(row[col.key], row) : row[col.key]}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default DataTablas;
