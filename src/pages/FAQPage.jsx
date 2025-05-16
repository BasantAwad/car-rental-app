import React from 'react';
import InfoPage from './InfoPage';

const FAQPage = () => {
  const content = (
    <>
      <h2>Frequently Asked Questions</h2>
      <p>Find answers to common questions about our luxury car rental services.</p>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-4">Rental Requirements</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white">What are the age requirements?</h4>
              <p className="text-gray-300">You must be at least 21 years old to rent our vehicles. Some luxury and exotic vehicles may require a minimum age of 25.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">What documents do I need?</h4>
              <p className="text-gray-300">A valid driver's license, credit card in your name, and proof of insurance are required. International drivers need a valid passport and international driver's license.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Reservations and Cancellations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white">How do I make a reservation?</h4>
              <p className="text-gray-300">You can make a reservation online through our website, by phone, or by visiting any of our locations.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">What is your cancellation policy?</h4>
              <p className="text-gray-300">Free cancellation up to 24 hours before pickup. Please see our Cancellation Policy page for detailed information.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Pricing and Payments</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white">What payment methods do you accept?</h4>
              <p className="text-gray-300">We accept all major credit cards, debit cards, and cash payments. A credit card is required for the security deposit.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">Are there any hidden fees?</h4>
              <p className="text-gray-300">No, all fees are clearly stated during the reservation process. This includes taxes, insurance, and any optional services you choose.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Vehicle Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white">What types of vehicles do you offer?</h4>
              <p className="text-gray-300">We offer a wide range of luxury vehicles including sedans, SUVs, sports cars, and electric vehicles. Visit our Fleet page for the complete list.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">Are the vehicles well-maintained?</h4>
              <p className="text-gray-300">Yes, all our vehicles undergo regular maintenance and thorough inspections before each rental to ensure safety and performance.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Additional Services</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white">Do you offer delivery service?</h4>
              <p className="text-gray-300">Yes, we offer delivery and pickup services at airports and selected locations. Additional fees may apply.</p>
            </div>
            <div>
              <h4 className="font-medium text-white">What happens if I need roadside assistance?</h4>
              <p className="text-gray-300">We provide 24/7 roadside assistance for all our vehicles. Contact our emergency number for immediate support.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 p-4 bg-purple-900/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-gray-300">Contact our customer service team for assistance:</p>
        <ul className="mt-2 text-gray-300">
          <li>Phone: +1 (234) 567-890</li>
          <li>Email: support@luxurycarrentals.com</li>
          <li>Hours: 24/7 support available</li>
        </ul>
      </div>
    </>
  );

  return (
    <InfoPage
      title="FAQ"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default FAQPage; 