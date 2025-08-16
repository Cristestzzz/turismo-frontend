import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPaquetesTuristicos } from '../../api/paqueteTusitico';
import { useAuth } from '../../context/AuthContext';
import { addFavorito, removeFavorito, checkFavorito } from '../../api/favorito';

const ListadoPaquetes: React.FC = () => {
  // Maneja el click en la estrella de favoritos
  const handleStarClick = async (e: React.MouseEvent, paqueteId: number) => {
    e.stopPropagation();
    await handleFavorito(paqueteId);
  };
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<{[key: number]: boolean}>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPaquetes() {
      try {
        const data = await getPaquetesTuristicos();
        setPaquetes(data);
            if (typeof user?.token === 'string' && user.token) {
              const favs: {[key: number]: boolean} = {};
              await Promise.all(data.map(async (p: any) => {
                try {
                  const res = await checkFavorito(p.id, user.token as string);
                  favs[p.id] = res && typeof res.is_favorite === 'boolean' ? res.is_favorite : false;
                } catch (e) {
                  console.error('Error al consultar favorito:', e);
                  favs[p.id] = false;
                }
              }));
              setFavoritos(favs);
        }
      } catch (err: any) {
        setError(err?.message || 'Error al cargar paquetes');
      } finally {
        setLoading(false);
      }
    }
    fetchPaquetes();
  }, [user]);

  const handleFavorito = async (paqueteId: number) => {
    if (!user?.token) return;
    if (favoritos[paqueteId]) {
      await removeFavorito(paqueteId, user.token);
      setFavoritos({ ...favoritos, [paqueteId]: false });
    } else {
      await addFavorito(paqueteId, user.token);
      setFavoritos({ ...favoritos, [paqueteId]: true });
    }
  };

  return (
    <div className="container py-4">
      <h1>Paquetes turísticos disponibles</h1>
      {loading && <div>Cargando...</div>}
      {error && <div className="text-danger">{error}</div>}
      <div className="row g-4">
        {paquetes.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card position-relative h-100 shadow-sm">
              {user && (
                <button
                  onClick={(e) => handleStarClick(e, p.id)}
                  className="btn p-0 position-absolute"
                  style={{
                    top: 12,
                    right: 12,
                    fontSize: 28,
                    color: favoritos[p.id] ? '#ffd600' : '#bbb',
                    zIndex: 2,
                  }}
                  title={favoritos[p.id] ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  aria-label={favoritos[p.id] ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                  ★
                </button>
              )}
              {p.imagenes && p.imagenes.length > 0 && (
                <img src={p.imagenes[0]} alt={p.titulo} className="card-img-top" style={{ height: 140, objectFit: 'cover', borderRadius: '6px 6px 0 0' }} />
              )}
              <div className="card-body d-flex flex-column">
                <h3 className="card-title" style={{ margin: '1rem 0 0.5rem 0' }}>{p.titulo}</h3>
                <button className="btn btn-primary mb-2" onClick={() => navigate(`/paquete/${p.id}`)}>
                  Ver detalles
                </button>
                <button className="btn btn-success" onClick={() => navigate(`/reservar-paquete/${p.id}`)}>
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListadoPaquetes;