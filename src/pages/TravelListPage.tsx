import React from 'react';
import TravelCard from '../components/TravelCard';

// Shows list of travel destinations
const TravelListPage: React.FC = () => (
  <section>
    <h2>Travel Destinations</h2>
    {/* Example card; in a real app this would be mapped from data */}
    <TravelCard
      title="Sydney Harbour"
      description="Experience the iconic Sydney Harbour Bridge and Opera House."
      imageUrl="https://via.placeholder.com/300"
      onClick={() => console.log('Clicked Sydney')}
    />
  </section>
);

export default TravelListPage;
