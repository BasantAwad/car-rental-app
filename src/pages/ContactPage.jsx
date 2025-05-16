import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from './InfoPage';

const ContactPage = () => {
  const content = `
    <div class="space-y-8">
      <div>
        <h2>Contact Information</h2>
        <ul class="space-y-4">
          <li>
            <h3>Phone Support</h3>
            <p>24/7 Customer Service: <a href="tel:+1234567890" class="text-purple-400 hover:text-purple-300">+1 (234) 567-890</a></p>
          </li>
          <li>
            <h3>Email Support</h3>
            <p>General Inquiries: <a href="mailto:info@luxurycarrentals.com" class="text-purple-400 hover:text-purple-300">info@luxurycarrentals.com</a></p>
            <p>Customer Support: <a href="mailto:support@luxurycarrentals.com" class="text-purple-400 hover:text-purple-300">support@luxurycarrentals.com</a></p>
          </li>
          <li>
            <h3>Office Address</h3>
            <p>123 Luxury Drive<br>Premium City, PC 12345<br>United States</p>
          </li>
        </ul>
      </div>

      <div>
        <h2>Business Hours</h2>
        <ul class="space-y-2">
          <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
          <li>Saturday: 10:00 AM - 6:00 PM</li>
          <li>Sunday: 11:00 AM - 5:00 PM</li>
        </ul>
      </div>

      <div>
        <h2>Emergency Support</h2>
        <p>For after-hours emergencies or roadside assistance, please call our 24/7 support line:</p>
        <p class="text-purple-400">+1 (234) 567-8911</p>
      </div>

      <div>
        <h2>Quick Links</h2>
        <ul class="space-y-2">
          <li><a href="/faq" class="text-purple-400 hover:text-purple-300">Frequently Asked Questions</a></li>
          <li><a href="/customer-service" class="text-purple-400 hover:text-purple-300">Customer Service</a></li>
          <li><a href="/locations" class="text-purple-400 hover:text-purple-300">Our Locations</a></li>
        </ul>
      </div>
    </div>
  `;

  return (
    <InfoPage
      title="Contact Us"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default ContactPage; 