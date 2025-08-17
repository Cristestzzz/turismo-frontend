
import React from 'react';

interface PaquetesFiltroProps {
	categoria: string;
	onCategoriaChange: (categoria: string) => void;
	style?: React.CSSProperties;
}

const categorias = [
	'', 'aventura', 'cultural', 'gastronomico', 'playa', 'montaña', 'ciudad', 'ecoturismo', 'romantico', 'familiar', 'negocios'
];

const PaquetesFiltro: React.FC<PaquetesFiltroProps> = ({ categoria, onCategoriaChange, style }) => {
	return (
		<div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', ...style }}>
			<label htmlFor="categoria-select" style={{ fontWeight: 'bold' }}>Filtrar por categoría:</label>
			<select
				id="categoria-select"
				value={categoria}
				onChange={e => onCategoriaChange(e.target.value)}
				style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e3eaf2', minWidth: '180px' }}
			>
				<option value="">Todas</option>
				{categorias.slice(1).map(cat => (
					<option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
				))}
			</select>
		</div>
	);
};

export default PaquetesFiltro;
