import React from 'react';
import InfoPage from './InfoPage';

const CancellationPolicyPage = () => {
  const content = (
    <>
      <h2>Cancellation Policy</h2>
      <p>We understand that plans can change. Our cancellation policy is designed to be fair and transparent for all our customers.</p>

      <h2>Standard Cancellation Terms</h2>
      <ul>
        <li>Free cancellation up to 24 hours before pickup time</li>
        <li>50% charge for cancellations within 24 hours of pickup</li>
        <li>No refund for no-shows or cancellations after pickup time</li>
      </ul>

      <h2>Special Events and Holidays</h2>
      <p>For reservations during special events or holidays:</p>
      <ul>
        <li>Free cancellation up to 48 hours before pickup time</li>
        <li>75% charge for cancellations within 48 hours</li>
        <li>No refund for no-shows or cancellations after pickup time</li>
      </ul>

      <h2>Long-term Rentals</h2>
      <p>For rentals of 7 days or longer:</p>
      <ul>
        <li>Free cancellation up to 72 hours before pickup time</li>
        <li>25% charge for cancellations within 72 hours</li>
        <li>No refund for no-shows or cancellations after pickup time</li>
      </ul>

      <h2>Refund Process</h2>
      <ul>
        <li>Refunds are processed within 5-7 business days</li>
        <li>Refunds are issued to the original payment method</li>
        <li>Processing fees may apply depending on the payment method</li>
      </ul>

      <h2>Force Majeure</h2>
      <p>In case of events beyond our control (natural disasters, government actions, etc.):</p>
      <ul>
        <li>Full refund or rescheduling options available</li>
        <li>No cancellation fees will apply</li>
        <li>Documentation may be required</li>
      </ul>

      <h2>Contact Us</h2>
      <p>If you need to cancel your reservation or have questions about our cancellation policy, please contact us:</p>
      <ul>
        <li>Phone: +1 (234) 567-890</li>
        <li>Email: cancellations@luxurycarrentals.com</li>
        <li>Hours: 24/7 support available</li>
      </ul>
    </>
  );

  return (
    <InfoPage
      title="Cancellation Policy"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default CancellationPolicyPage; 