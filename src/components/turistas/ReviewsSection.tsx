import React from 'react';
import './ReviewsSection.css';

interface Review {
  name: string;
  location: string;
  date: string;
  rating: number;
  review: string;
  showMore?: boolean;
}

const ReviewsSection: React.FC = () => {
  // Sample reviews data
  const reviews: Review[] = [
    {
      name: 'Sofía',
      location: 'Madrid, España',
      date: 'Julio de 2025',
      rating: 5,
      review: 'El tour por la Ciudad de los Reyes fue una experiencia inolvidable. El guía conocía cada rincón histórico y nos contó anécdotas fascinantes. ¡Las vistas desde el Cerro San Cristóbal son impresionantes!',
      showMore: false
    },
    {
      name: 'Javier',
      location: 'Bogotá, Colombia',
      date: 'Junio de 2025',
      rating: 5,
      review: 'El viaje a las Líneas de Nazca fue espectacular. La organización fue impecable y el vuelo fue muy seguro. Ver esas figuras gigantes desde el aire es algo que hay que hacer al menos una vez en la vida.',
      showMore: false
    },
    {
      name: 'Laura',
      location: 'Bucaramanga, Colombia',
      date: 'Junio de 2025',
      rating: 5,
      review: 'La excursión al Valle Sagrado en Cusco fue mágica. Cada ruina, cada pueblo andino, tiene una historia increíble. El almuerzo en Urubamba fue delicioso y la atención del personal fue excelente.',
      showMore: false
    },
    {
      name: 'Katy',
      location: 'Florida City, Florida',
      date: 'Julio de 2025',
      rating: 4,
      review: 'El tour a la Reserva Nacional de Paracas es una maravilla natural. Los acantilados y la fauna marina son hermosos, aunque el viaje fue un poco largo. Definitivamente vale la pena por las vistas.',
      showMore: false
    },
    {
      name: 'Filiberto',
      location: 'León, México',
      date: 'Junio de 2025',
      rating: 5,
      review: 'Visitar Machu Picchu fue el punto culminante de mi viaje. El guía era muy conocedor y apasionado. La caminata hasta la cima fue exigente pero la recompensa visual fue indescriptible. ¡Una experiencia de 10!',
      showMore: false
    },
    {
      name: 'Aracell',
      location: 'Estado de México, México',
      date: 'Mayo de 2025',
      rating: 4,
      review: 'El city tour por Lima fue muy completo. Visitamos el Centro Histórico y Barranco, que es muy bohemio y colorido. El transporte era cómodo y el guía, muy simpático. Fue una forma perfecta de conocer la ciudad.',
      showMore: false
    },
    {
      name: 'Carlos',
      location: 'Buenos Aires, Argentina',
      date: 'Abril de 2025',
      rating: 5,
      review: 'Excelente tour a las Islas Ballestas. La lancha era rápida y pudimos ver lobos marinos, pingüinos y aves de cerca. El guía fue muy atento y nos dio información detallada sobre la fauna local. ¡Super recomendado!',
      showMore: false
    }
  ];

  const toggleShowMore = (index: number) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].showMore = !updatedReviews[index].showMore;
    // In a real app, you would set state here
  };

  return (
    <div className="reviews-section" id="reseñas">
      <div className="reviews-header">
        <h2>⭐ 4.92 · 7 reseñas</h2>
      </div>
      
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>
              <div className="review-author">
                <h4>{review.name}</h4>
                <p>{review.location}</p>
              </div>
            </div>
            <div className="review-content">
              <div className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                <span className="review-date">· {review.date}</span>
              </div>
              <p className="review-text">
                {review.showMore ? review.review : `${review.review.substring(0, 100)}...`}
              </p>
              {review.review.length > 100 && (
                <button 
                  className="show-more"
                  onClick={() => toggleShowMore(index)}
                >
                  {review.showMore ? 'Mostrar menos' : 'Mostrar más'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="show-all-reviews">Mostrar todas las reseñas</button>
    </div>
  );
};

export default ReviewsSection;