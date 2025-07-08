import React from 'react';

export interface TravelCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

// Reusable card for displaying a travel destination
const TravelCard: React.FC<TravelCardProps> = ({ title, description, imageUrl, onClick }) => (
  <div className="travel-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem', maxWidth: '300px' }}>
    <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: '4px' }} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default TravelCard;
