import React from 'react';
import InfoPage from './InfoPage';

const AboutUsPage = () => {
  const content = `
    <div class="space-y-8">
      <div>
        <h2>Our Story</h2>
        <p>Founded in 2020, Luxury Car Rentals has quickly become a premier destination for high-end vehicle rentals. Our commitment to excellence and customer satisfaction has made us the go-to choice for discerning clients seeking exceptional driving experiences.</p>
      </div>

      <div>
        <h2>Our Mission</h2>
        <p>We strive to provide an unparalleled luxury car rental experience by offering:</p>
        <ul>
          <li>Premium fleet of meticulously maintained vehicles</li>
          <li>Exceptional customer service</li>
          <li>Competitive pricing</li>
          <li>Flexible rental terms</li>
          <li>Comprehensive insurance options</li>
        </ul>
      </div>

      <div>
        <h2>Why Choose Us</h2>
        <ul>
          <li>Extensive selection of luxury and exotic vehicles</li>
          <li>24/7 customer support</li>
          <li>Transparent pricing with no hidden fees</li>
          <li>Nationwide coverage with multiple locations</li>
          <li>Professional and experienced staff</li>
        </ul>
      </div>

      <div>
        <h2>Our Values</h2>
        <ul>
          <li>Customer Satisfaction</li>
          <li>Quality Service</li>
          <li>Integrity</li>
          <li>Innovation</li>
          <li>Environmental Responsibility</li>
        </ul>
      </div>
    </div>
  `;

  return (
    <InfoPage
      title="About Us"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default AboutUsPage; 