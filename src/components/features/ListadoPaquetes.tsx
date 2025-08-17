import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPaquetesTuristicos } from '../../api/paqueteTusitico';
import { useAuth } from '../../context/AuthContext';
import { addFavorito, removeFavorito, checkFavorito } from '../../api/favorito';
import PaquetesCarousel from './../comunes/PaquetesCarousel';
import CategoriasCarousel from './CategoriasCarousel';
import HeroSection from './HeroSection';
import './PaquetesCard.css';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // Importa los íconos necesarios

const ListadoPaquetes: React.FC = () => {
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
    try {
      if (favoritos[paqueteId]) {
        await removeFavorito(paqueteId, user.token);
        setFavoritos({ ...favoritos, [paqueteId]: false });
      } else {
        await addFavorito(paqueteId, user.token);
        setFavoritos({ ...favoritos, [paqueteId]: true });
      }
    } catch (err) {
      console.error('Error al actualizar favoritos:', err);
    }
  };
  
  const handleStarClick = (e: React.MouseEvent, paqueteId: number) => {
    e.stopPropagation();
    handleFavorito(paqueteId);
  };
  
  return (
    <div className="homepage-container">
      <HeroSection
        images={[
          "https://live.staticflickr.com/8266/8746178810_7cf99099c1_h.jpg",
          "https://live.staticflickr.com/3751/8973127846_c09e43054b_k.jpg",
          "https://live.staticflickr.com/5489/9387084053_983025f3d6_h.jpg"
        ]}
      />
      
      <div className="main-content-wrapper">
        <div className="container py-4">
          <CategoriasCarousel />
          <h1 className="mt-5">Paquetes turísticos disponibles</h1>
          {loading && <div>Cargando...</div>}
          {error && <div className="text-danger">{error}</div>}
          {!loading && !error && paquetes.length > 0 ? (
            <div className="row g-4">
              {paquetes.map((p) => (
                <div key={p.id} className="col-md-4">
                  <div className="paquete-card h-100">
                    <Link to={`/paquete/${p.id}`} className="card-link-overlay">
                      <div className="paquete-card-image-container">
                        {p.imagenes && p.imagenes.length > 0 && (
                          <img src={p.imagenes[0]} alt={p.titulo} className="paquete-card-image" />
                        )}
                        <span className="paquete-card-label">{p.tipo_paquete}</span>
                        <div className="paquete-card-rating">
                          <span>⭐</span> 4.7
                        </div>
                      </div>
                      <div className="paquete-card-body">
                        <h3 className="paquete-card-title">{p.titulo}</h3>
                        <div className="paquete-card-location">
                          <FaMapMarkerAlt />
                          <span>{p.ciudad_destino}, {p.pais_destino}</span>
                        </div>
                        <div className="paquete-card-price">
                          <span className="paquete-card-price-value">S/ {p.precio_por_persona}</span>
                          <span>/ persona</span>
                        </div>
                        <div className="paquete-card-availability">
                          <FaCalendarAlt />
                          <span>Disponible el 9/9/2025</span>
                        </div>
                        <div className="paquete-card-tags">
                          {p.servicios_incluidos?.split(',').map((tag: string, idx: number) => (
                            <span key={idx} className="paquete-card-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && <div>No hay paquetes disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoPaquetes;