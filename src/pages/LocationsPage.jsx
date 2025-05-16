import React from 'react';
import InfoPage from './InfoPage';

const LocationsPage = () => {
  const content = (
    <>
      <h2>Our Locations</h2>
      <p>Find us at convenient locations across major cities. Each location offers our full range of luxury vehicles and premium services.</p>

      <h2>New York City</h2>
      <ul>
        <li>Manhattan Downtown: 123 Luxury Drive</li>
        <li>JFK Airport: Terminal 4, Arrivals Level</li>
        <li>LaGuardia Airport: Terminal B, Ground Transportation</li>
      </ul>

      <h2>Los Angeles</h2>
      <ul>
        <li>Beverly Hills: 456 Rodeo Drive</li>
        <li>LAX Airport: Terminal 5, Arrivals Level</li>
        <li>Santa Monica: 789 Ocean Avenue</li>
      </ul>

      <h2>Miami</h2>
      <ul>
        <li>South Beach: 321 Collins Avenue</li>
        <li>MIA Airport: Terminal D, Ground Transportation</li>
        <li>Downtown: 654 Brickell Avenue</li>
      </ul>

      <h2>Chicago</h2>
      <ul>
        <li>Downtown: 987 Michigan Avenue</li>
        <li>O'Hare Airport: Terminal 3, Arrivals Level</li>
        <li>Midway Airport: Terminal 1, Ground Transportation</li>
      </ul>

      <h2>Location Features</h2>
      <ul>
        <li>24/7 operation</li>
        <li>Free shuttle service at airport locations</li>
        <li>Complimentary valet parking</li>
        <li>Luxury waiting lounges</li>
        <li>Professional staff available</li>
      </ul>

      <h2>Coming Soon</h2>
      <p>We're expanding! New locations opening soon in:</p>
      <ul>
        <li>Las Vegas</li>
        <li>San Francisco</li>
        <li>Boston</li>
        <li>Dallas</li>
      </ul>
    </>
  );

  return (
    <InfoPage
      title="Our Locations"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default LocationsPage; 