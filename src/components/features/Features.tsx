import './feature.css';

import React from 'react';
import { IconType } from 'react-icons';
import { LuHeadset, LuGift, LuMessagesSquare, LuCalendarCheck } from 'react-icons/lu'; // Importa los iconos específicos de Lucide

export interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: IconType; // El icono ahora es un componente React
}

export interface FeaturesProps {
  mainTitle?: string;
  items: FeatureItem[];
}

export const Features: React.FC<FeaturesProps> = ({ mainTitle, items }) => {
  return (
    <section className="features-section">
      {mainTitle && <h2 className="features-main-title">{mainTitle}</h2>}
      <div className="features-grid">
        {items.map((item, index) => {
          const IconComponent = item.icon; // El icono ya es el componente
          return (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {IconComponent && <IconComponent size={24} />} {/* Renderiza el componente del icono */}
              </div>
              <h3 className="feature-title">{item.title}</h3>
              {item.subtitle && <p className="feature-subtitle">{item.subtitle}</p>}
              <p className="feature-description">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
