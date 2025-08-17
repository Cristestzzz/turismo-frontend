import React, { useState } from 'react';
import { LuLayoutGrid } from 'react-icons/lu';
import './GallerySection.css';

interface GallerySectionProps {
  imagenes: string[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ imagenes }) => {
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarLightbox, setMostrarLightbox] = useState(false);
  const [mostrarTodasFotos, setMostrarTodasFotos] = useState(false);
  const [imagenOverlayActual, setImagenOverlayActual] = useState(0);

  const toggleLightbox = () => {
    setMostrarLightbox(!mostrarLightbox);
  };

  const toggleTodasFotos = () => {
    setMostrarTodasFotos(!mostrarTodasFotos);
  };

  const cambiarImagenPrincipal = (index: number) => {
    setImagenActual(index);
  };

  return (
    <>
      <div className="gallery-section">
        <div className="gallery-left">
          <img
            src={imagenes[imagenActual]}
            alt="Imagen principal"
            className="gallery-main-image"
            onClick={() => setMostrarLightbox(true)}
          />
        </div>
        <div className="gallery-right">
          {imagenes
            .filter((_, index) => index !== imagenActual)
            .slice(0, 4)
            .map((img, index) => (
              <div
                className="gallery-thumb"
                key={index}
                onClick={() => cambiarImagenPrincipal(imagenes.indexOf(img))}
              >
                <img src={img} alt={`Miniatura ${index + 1}`} />
              </div>
            ))}
        </div>
        {/* Botón movido al final del contenedor de la galería */}
        <button className="show-all-photos-btn" onClick={toggleTodasFotos}>
          <span className="photos-icon">
            <LuLayoutGrid />
          </span>
          Mostrar todas las fotos ({imagenes.length})
        </button>
      </div>

      {mostrarTodasFotos && (
        <div className="todas-fotos-overlay">
          <div className="todas-fotos-container-horizontal">
            <div className="todas-fotos-header">
              <h2>Recorrido fotográfico</h2>
              <button onClick={toggleTodasFotos} className="todas-fotos-close">
                &times;
              </button>
            </div>
            <div className="todas-fotos-thumbnails">
              {imagenes.map((img, index) => (
                <div
                  className={`thumbnail-item ${index === imagenOverlayActual ? 'active' : ''}`}
                  key={index}
                  onClick={() => setImagenOverlayActual(index)}
                >
                  <img src={img} alt={`Miniatura ${index + 1}`} />
                </div>
              ))}
            </div>
            {imagenes.length > 0 && (
              <div className="todas-fotos-main-image">
                <img src={imagenes[imagenOverlayActual]} alt={`Foto principal ${imagenOverlayActual + 1}`} />
              </div>
            )}
          </div>
        </div>
      )}

      {mostrarLightbox && (
        <div className="lightbox" onClick={toggleLightbox}>
          <div className="lightbox-content">
            <img
              src={imagenes[imagenActual]}
              alt={`Vista ampliada ${imagenActual + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lightbox-navigation">
              <button
                className="lightbox-nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === 0 ? imagenes.length - 1 : prev - 1
                  );
                }}
              >
                
              </button>
              <span className="lightbox-counter">
                {imagenActual + 1} / {imagenes.length}
              </span>
              <button
                className="lightbox-nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagenActual((prev) =>
                    prev === imagenes.length - 1 ? 0 : prev + 1
                  );
                }}
                >
                
              </button>
            </div>
            <button
              className="lightbox-close"
              onClick={toggleLightbox}
              aria-label="Cerrar lightbox"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
