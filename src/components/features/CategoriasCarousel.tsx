 import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import './CategoriasCarousel.css';

// Datos de las categorías con rutas e imágenes de placeholder
const categoriasData = [
  { name: 'Aventura', path: '/paquetes/aventura', imageUrl: 'https://images.unsplash.com/photo-1549880181-566b744d2d48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDEzfHxhZHZlbnR1cmV8ZW58MHx8fHwxNjQ3MjgyMDU4&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Cultural', path: '/paquetes/cultural', imageUrl: 'https://images.unsplash.com/photo-1558238714-38686617a264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDV8fGN1bHR1cmV8ZW58MHx8fHwxNjQ3MjgyMTEy&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Gastronómico', path: '/paquetes/gastronomico', imageUrl: 'https://images.unsplash.com/photo-1543825867-b89233633d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDM1fHxmb29kZ3JhcGh5fGVufDB8fHx8MTY0NzI4MjExNg&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Playa', path: '/paquetes/playa', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDR8fGJlYWNofGVufDB8fHx8MTY0NzI4MjEyMA&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Montaña', path: '/paquetes/montana', imageUrl: 'https://images.unsplash.com/photo-1544376794-ff3d1c3a6e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDIyfHxtb3VudGFpbnxlbnwwfHx8fDE2NDcyODIxMjY&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Ciudad', path: '/paquetes/ciudad', imageUrl: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDF8fGNpdHl8ZW58MHx8fHwxNjQ3MjgyMTMw&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Ecoturismo', path: '/paquetes/ecoturismo', imageUrl: 'https://images.unsplash.com/photo-1503799564-9f4d1c1c3f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDEwfHxlY290b3VyaXNtfGVufDB8fHx8MTY0NzI4MjEzNQ&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Romántico', path: '/paquetes/romantico', imageUrl: 'https://images.unsplash.com/photo-1517457210217-1f261902888c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDM2fHxjb3VwbGVzJTIwdHJhdmVsfGVufDB8fHx8MTY0NzI4MjEzNw&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Familiar', path: '/paquetes/familiar', imageUrl: 'https://images.unsplash.com/photo-1543354315-1845f32a7628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDR8fGZhbWlseSUyMHRyYXZlbHxlbnwwfHx8fDE2NDcyODIxNDI&ixlib=rb-1.2.1&q=80&w=1080' },
  { name: 'Negocios', path: '/paquetes/negocios', imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f8dc859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTY3OHwwfDF8c2VhcmNofDV8fGJ1c2luZXNzJTIwdHJhdmVsfGVufDB8fHx8MTY0NzI4MjE0Mw&ixlib=rb-1.2.1&q=80&w=1080' },
];

const CategoriasCarousel: React.FC = () => {
  return (
    <div className="categorias-carousel-container">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
        }}
        className="mySwiper"
      >
        {categoriasData.map((categoria, index) => (
          <SwiperSlide key={index}>
            <Link to={categoria.path} className="categoria-card">
              <img src={categoria.imageUrl} alt={categoria.name} className="categoria-image" />
              <div className="categoria-overlay">
                <span className="categoria-name">{categoria.name}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriasCarousel;