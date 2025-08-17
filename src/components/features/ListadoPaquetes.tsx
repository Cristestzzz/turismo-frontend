import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getPaquetesTuristicos, searchPaquetesTuristicos } from '../../api/paqueteTusitico';
import { useAuth } from '../../context/AuthContext';
import { addFavorito, removeFavorito, checkFavorito } from '../../api/favorito';
import CategoriasCarousel from './CategoriasCarousel';
import HeroSection from './HeroSection';
import { Features } from './Features';
import './PaquetesCard.css';
import './ListadoPaquetes.css'; // Importa el nuevo archivo CSS
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { LuHeadset, LuGift, LuMessagesSquare, LuCalendarCheck } from 'react-icons/lu';
import { IconType } from 'react-icons';

const ListadoPaquetes: React.FC = () => {
  const [paquetes, setPaquetes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<{[key: number]: boolean}>({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categoria } = useParams();

  useEffect(() => {
    async function fetchPaquetes() {
      setLoading(true);
      try {
        let data;
        if (categoria) {
          data = await searchPaquetesTuristicos({ tipo_paquete: categoria }, user?.token);
        } else {
          data = await getPaquetesTuristicos(user?.token);
        }
        setPaquetes(data);
        // Si tienes lógica de favoritos, puedes agregarla aquí
      } catch (err: any) {
        setError(err?.message || 'Error al cargar paquetes');
      } finally {
        setLoading(false);
      }
    }
    fetchPaquetes();
  }, [user, categoria]);

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

  const featuresData = {
    mainTitle: "",
    items: [
      {
        title: "Atención al cliente",
        subtitle: "Ininterrumpida",
        description: "Sin importar la zona horaria, estamos aquí para ayudarte.",
        icon: LuHeadset
      },
      {
        title: "Gana recompensas",
        subtitle: "",
        description: "Explora, gana, canjea y repite con nuestro programa de fidelidad.",
        icon: LuGift
      },
      {
        title: "Millones de opiniones",
        subtitle: "",
        description: "Planifica y reserva con confianza gracias a las opiniones de otros viajeros.",
        icon: LuMessagesSquare
      },
      {
        title: "Planifica a tu manera",
        subtitle: "",
        description: "Mantén la flexibilidad con la cancelación gratuita y la opción de reservar ahora y pagar después sin coste adicional.",
        icon: LuCalendarCheck
      }
    ]
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
          
          <Features mainTitle={featuresData.mainTitle} items={featuresData.items} />

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
