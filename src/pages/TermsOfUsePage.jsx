import React from 'react';
import InfoPage from './InfoPage';

const TermsOfUsePage = () => {
  const content = (
    <>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using our services, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>

      <h2>2. Rental Requirements</h2>
      <p>To rent a vehicle, you must:</p>
      <ul>
        <li>Be at least 21 years of age</li>
        <li>Possess a valid driver's license</li>
        <li>Have a valid credit card in your name</li>
        <li>Provide proof of insurance</li>
        <li>Meet our driving record requirements</li>
      </ul>

      <h2>3. Vehicle Usage</h2>
      <p>When renting our vehicles, you agree to:</p>
      <ul>
        <li>Use the vehicle only for personal or business purposes</li>
        <li>Not sublet or transfer the rental</li>
        <li>Not use the vehicle for illegal purposes</li>
        <li>Return the vehicle in the same condition as received</li>
        <li>Comply with all traffic laws and regulations</li>
      </ul>

      <h2>4. Insurance and Liability</h2>
      <p>Our insurance coverage includes:</p>
      <ul>
        <li>Collision Damage Waiver (CDW)</li>
        <li>Liability Insurance</li>
        <li>Personal Accident Insurance</li>
        <li>Personal Effects Coverage</li>
      </ul>

      <h2>5. Cancellation Policy</h2>
      <p>Cancellation terms:</p>
      <ul>
        <li>Free cancellation up to 24 hours before pickup</li>
        <li>50% charge for cancellations within 24 hours</li>
        <li>No refund for no-shows</li>
      </ul>

      <h2>6. Modifications to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.</p>

      <h2>7. Contact Information</h2>
      <p>For questions about these terms, please contact us at legal@luxurycarrentals.com</p>
    </>
  );

  return (
    <InfoPage
      title="Terms of Use"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default TermsOfUsePage; 