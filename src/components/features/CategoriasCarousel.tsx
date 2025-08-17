import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import './CategoriasCarousel.css';

const categoriasData = [
  { name: 'Aventura', des: 'Explora nuevos desafíos y emociones.', path: '/paquetes/aventura', imageUrl: 'https://i.ibb.co/qCkd9jS/img1.jpg' },
  { name: 'Cultural', des: 'Descubre la historia y las tradiciones locales.', path: '/paquetes/cultural', imageUrl: 'https://i.ibb.co/jrRb11q/img2.jpg' },
  { name: 'Gastronómico', des: 'Una aventura para tu paladar.', path: '/paquetes/gastronomico', imageUrl: 'https://i.ibb.co/NSwVv8D/img3.jpg' },
  { name: 'Playa', des: 'Relájate bajo el sol y disfruta del mar.', path: '/paquetes/playa', imageUrl: 'https://i.ibb.co/Bq4Q0M8/img4.jpg' },
  { name: 'Montaña', des: 'Conquista las cumbres más altas.', path: '/paquetes/montana', imageUrl: 'https://i.ibb.co/jTQfmTq/img5.jpg' },
  { name: 'Ciudad', des: 'Vive el ritmo y la vida de las grandes urbes.', path: '/paquetes/ciudad', imageUrl: 'https://i.ibb.co/RNkk6L0/img6.jpg' },
];

const CategoriasCarousel: React.FC = () => {
  const [items, setItems] = useState(categoriasData);

  const handleNext = () => {
    setItems(currentItems => {
      const newItems = [...currentItems];
      const firstItem = newItems.shift();
      if (firstItem) {
        newItems.push(firstItem);
      }
      return newItems;
    });
  };

  const handlePrev = () => {
    setItems(currentItems => {
      const newItems = [...currentItems];
      const lastItem = newItems.pop();
      if (lastItem) {
        newItems.unshift(lastItem);
      }
      return newItems;
    });
  };

  return (
    <div className="carousel-container-wrapper">
      <div className="carousel-container">
        <div className="slide">
          {items.map((item, index) => (
            <div className="item" key={item.name} style={{ backgroundImage: `url(${item.imageUrl})` }}>
              <div className="content">
                <div className="name">{item.name}</div>
                <div className="des">{item.des}</div>
                <Link to={item.path}>
                  <button>Ver más</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="button-controls">
          <button className="prev" onClick={handlePrev}><LuArrowLeft /></button>
          <button className="next" onClick={handleNext}><LuArrowRight /></button>
        </div>
      </div>
    </div>
  );
};

export default CategoriasCarousel;