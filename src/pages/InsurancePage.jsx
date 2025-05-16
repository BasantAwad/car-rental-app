import React from 'react';
import InfoPage from './InfoPage';

const InsurancePage = () => {
  const content = (
    <>
      <h2>Insurance Coverage Options</h2>
      <p>We offer comprehensive insurance coverage to ensure your peace of mind during your rental period.</p>

      <h2>Collision Damage Waiver (CDW)</h2>
      <ul>
        <li>Reduces your financial responsibility for damage to the rental vehicle</li>
        <li>Covers collision damage and theft</li>
        <li>Available in different coverage levels</li>
        <li>Optional excess reduction available</li>
      </ul>

      <h2>Liability Insurance</h2>
      <ul>
        <li>Protects against third-party claims</li>
        <li>Covers bodily injury and property damage</li>
        <li>Meets state minimum requirements</li>
        <li>Additional coverage available</li>
      </ul>

      <h2>Personal Accident Insurance</h2>
      <ul>
        <li>Covers medical expenses for driver and passengers</li>
        <li>Accidental death coverage</li>
        <li>24/7 emergency assistance</li>
        <li>Optional coverage for additional passengers</li>
      </ul>

      <h2>Personal Effects Coverage</h2>
      <ul>
        <li>Protects personal belongings in the vehicle</li>
        <li>Covers theft and damage</li>
        <li>Up to $1,000 coverage per person</li>
        <li>Maximum coverage per rental</li>
      </ul>

      <h2>Roadside Assistance</h2>
      <ul>
        <li>24/7 emergency roadside service</li>
        <li>Towing and jump-start service</li>
        <li>Flat tire assistance</li>
        <li>Fuel delivery service</li>
      </ul>

      <h2>Insurance Requirements</h2>
      <ul>
        <li>Valid driver's license required</li>
        <li>Proof of insurance may be required</li>
        <li>Age restrictions may apply</li>
        <li>International drivers may need additional documentation</li>
      </ul>

      <h2>Contact Our Insurance Team</h2>
      <p>For questions about insurance coverage or to customize your policy:</p>
      <ul>
        <li>Phone: +1 (234) 567-890</li>
        <li>Email: insurance@luxurycarrentals.com</li>
        <li>Hours: Monday - Sunday, 8:00 AM - 8:00 PM</li>
      </ul>
    </>
  );

  return (
    <InfoPage
      title="Insurance"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default InsurancePage; 