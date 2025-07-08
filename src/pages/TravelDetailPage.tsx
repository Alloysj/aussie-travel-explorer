import React from 'react';
import { useParams } from 'react-router-dom';

// Detail page for a specific travel item
const TravelDetailPage: React.FC = () => {
  const { id } = useParams();
  return (
    <section>
      <h2>Travel Detail {id}</h2>
    </section>
  );
};

export default TravelDetailPage;
