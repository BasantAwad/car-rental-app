import React from 'react';
import InfoPage from './InfoPage';

const FleetPage = () => {
  const content = (
    <>
      <h2>Our Premium Fleet</h2>
      <p>Discover our extensive collection of luxury and exotic vehicles, carefully selected to provide you with an exceptional driving experience.</p>

      <h2>Luxury Sedans</h2>
      <ul>
        <li>Mercedes-Benz S-Class</li>
        <li>BMW 7 Series</li>
        <li>Audi A8</li>
        <li>Lexus LS</li>
      </ul>

      <h2>Sports Cars</h2>
      <ul>
        <li>Porsche 911</li>
        <li>Ferrari F8 Tributo</li>
        <li>Lamborghini Huracán</li>
        <li>Aston Martin Vantage</li>
      </ul>

      <h2>SUVs</h2>
      <ul>
        <li>Range Rover</li>
        <li>Mercedes-Benz G-Class</li>
        <li>Bentley Bentayga</li>
        <li>Rolls-Royce Cullinan</li>
      </ul>

      <h2>Electric Vehicles</h2>
      <ul>
        <li>Tesla Model S</li>
        <li>Porsche Taycan</li>
        <li>Audi e-tron GT</li>
        <li>Mercedes-Benz EQS</li>
      </ul>

      <h2>Fleet Features</h2>
      <ul>
        <li>Regular maintenance and inspection</li>
        <li>Latest model years</li>
        <li>Premium features and amenities</li>
        <li>Comprehensive insurance coverage</li>
        <li>24/7 roadside assistance</li>
      </ul>
    </>
  );

  return (
    <InfoPage
      title="Our Fleet"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default FleetPage; 