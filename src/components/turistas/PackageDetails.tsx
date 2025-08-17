import React from 'react';
import { LuMapPin, LuClock, LuUsers, LuSignal, LuDollarSign, LuFileText, LuPackage } from 'react-icons/lu';
import './PackageDetails.css';

interface PackageDetailsProps {
  paquete: {
    tipo_paquete: string;
    ciudad_destino: string;
    pais_destino: string;
    duracion_dias: number;
    capacidad_maxima: number;
    nivel_dificultad: string;
    precio_por_persona: number;
    descripcion: string;
  };
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ paquete }) => {
  return (
    <div className="package-details">
      <h3 className="details-title">Acerca de este paquete</h3>
      <div className="details-grid">
        <div className="detail-item">
          <LuPackage size={24} className="detail-icon" />
          <div>
            <strong>Tipo</strong>
            <p>{paquete.tipo_paquete}</p>
          </div>
        </div>
        <div className="detail-item">
          <LuMapPin size={24} className="detail-icon" />
          <div>
            <strong>Destino</strong>
            <p>{paquete.ciudad_destino}, {paquete.pais_destino}</p>
          </div>
        </div>
        <div className="detail-item">
          <LuClock size={24} className="detail-icon" />
          <div>
            <strong>Duración</strong>
            <p>{paquete.duracion_dias} días</p>
          </div>
        </div>
        <div className="detail-item">
          <LuUsers size={24} className="detail-icon" />
          <div>
            <strong>Capacidad máxima</strong>
            <p>{paquete.capacidad_maxima} personas</p>
          </div>
        </div>
        <div className="detail-item">
          <LuSignal size={24} className="detail-icon" />
          <div>
            <strong>Nivel de dificultad</strong>
            <p>{paquete.nivel_dificultad}</p>
          </div>
        </div>
        <div className="detail-item">
          <LuDollarSign size={24} className="detail-icon" />
          <div>
            <strong>Precio por persona</strong>
            <p>S/ {paquete.precio_por_persona}</p>
          </div>
        </div>
      </div>
      <div className="detail-item-full">
        <LuFileText size={24} className="detail-icon" />
        <div>
          <strong>Descripción</strong>
          <p>{paquete.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
