import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from './InfoPage';

const SitemapPage = () => {
  const content = `
    <h2>Site Structure</h2>
    <ul>
      <li>
        <h3>Main Pages</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/fleet">Our Fleet</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </li>
      <li>
        <h3>Customer Service</h3>
        <ul>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/customer-service">Customer Service</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
          <li><Link to="/insurance">Insurance Information</Link></li>
        </ul>
      </li>
      <li>
        <h3>Legal</h3>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-use">Terms of Use</Link></li>
        </ul>
      </li>
    </ul>
  `;

  return (
    <InfoPage
      title="Sitemap"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default SitemapPage; 