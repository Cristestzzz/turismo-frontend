import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PaquetesCarousel.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addFavorito, removeFavorito } from '../../api/favorito';

interface PaquetesCarouselProps {
  paquetes: any[];
  favoritos: { [key: number]: boolean };
  setFavoritos: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

const PaquetesCarousel: React.FC<PaquetesCarouselProps> = ({ paquetes, favoritos, setFavoritos }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <div className="paquetes-carousel-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {paquetes.map((p) => (
          <SwiperSlide key={p.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PaquetesCarousel;