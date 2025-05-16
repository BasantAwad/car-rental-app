import React from 'react';
import InfoPage from './InfoPage';

const PrivacyPolicyPage = () => {
  const content = (
    <>
      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us, including:</p>
      <ul>
        <li>Name and contact information</li>
        <li>Driver's license and identification details</li>
        <li>Payment information</li>
        <li>Rental history and preferences</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process your rental reservations</li>
        <li>Communicate with you about your rentals</li>
        <li>Send you marketing communications (with your consent)</li>
        <li>Improve our services</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li>Service providers who assist in our operations</li>
        <li>Insurance companies for rental coverage</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2>4. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about our privacy policy, please contact us at privacy@luxurycarrentals.com</p>
    </>
  );

  return (
    <InfoPage
      title="Privacy Policy"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default PrivacyPolicyPage; 