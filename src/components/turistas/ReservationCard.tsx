import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importa el icono de estrella de Font Awesome
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './ReservationCard.css'; // Importa el CSS específico para ReservationCard

interface ReservationCardProps {
  precio: number;
  calificacion?: number;
  fechaDisponible?: string;
  paqueteId: string; // Agrega paqueteId a las props
}

const ReservationCard: React.FC<ReservationCardProps> = ({ precio, calificacion, fechaDisponible, paqueteId }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleReservaClick = () => {
    navigate(`/reservar-paquete/${paqueteId}`); // Navega a la página de reservas
  };

  return (
    <div className="reserva-card">
      <div className="reserva-top-row">
        <div className="reserva-precio">
          <span className="precio-monto">S/ {precio.toLocaleString('es-PE')}</span>
          <span className="precio-periodo">/ mes</span>
        </div>

        {calificacion && (
          <div className="reserva-rating">
            <FaStar size={16} className="estrella-icono" /> {/* Usa el icono de Font Awesome */}
            <span className="rating-num">{calificacion.toFixed(1)}</span>
            <span className="reseñas">
              · <a href="#opiniones">7 reseñas</a> {/* Este enlace a "7 reseñas" es hardcoded, considera hacerlo dinámico si tienes los datos reales de reseñas. */}
            </span>
          </div>
        )}
      </div>

      {fechaDisponible && (
        <div className="reserva-card__availability"> {/* Usamos una clase específica para la disponibilidad dentro de la tarjeta */}
          🗓️ Disponible desde {new Date(fechaDisponible).toLocaleDateString('es-PE')}
        </div>
      )}

      <div className="reserva-garantia">
        Pago con garantía: + S/ {precio.toLocaleString('es-PE')}
      </div>

      <button className="btn-reserva" onClick={handleReservaClick}>
        Reserva
      </button>

      <div className="reserva-nota">
        No se hará ningún cargo por el momento
      </div>
    </div>
  );
};

export default ReservationCard;
