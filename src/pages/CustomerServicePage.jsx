import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerServicePage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What are your rental requirements?",
      answer: "You must be at least 21 years old, have a valid driver's license, and a valid credit card in your name. Additional requirements may apply for certain vehicle categories."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your reservation free of charge up to 24 hours before your pickup time. Cancellations within 24 hours may incur a 50% charge."
    },
    {
      question: "What insurance options are available?",
      answer: "We offer comprehensive insurance packages including Collision Damage Waiver (CDW), Liability Insurance, Personal Accident Insurance, and Personal Effects Coverage."
    },
    {
      question: "How do I extend my rental?",
      answer: "You can extend your rental by contacting our customer service at least 24 hours before your scheduled return time. Extensions are subject to vehicle availability."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns may incur additional charges. Please contact us if you anticipate being late to discuss options and avoid penalties."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="space-y-12">
        {/* Contact Information */}
        <div className="bg-black/30 p-8 rounded-lg border border-purple-500/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Customer Service</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Phone size={20} className="mr-3 text-purple-400" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <a href="tel:+1234567890" className="text-purple-400 hover:text-purple-300">+1 (234) 567-890</a>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <Mail size={20} className="mr-3 text-purple-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <a href="mailto:support@luxurycarrentals.com" className="text-purple-400 hover:text-purple-300">support@luxurycarrentals.com</a>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <MapPin size={20} className="mr-3 text-purple-400" />
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p>123 Luxury Drive, Premium City, PC 12345</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <Clock size={20} className="mr-3 text-purple-400" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p>Monday - Sunday: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Support</h2>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => navigate('/contact')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Send us a Message
                </Button>

                <div className="bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Emergency Support</h3>
                  <p className="text-gray-300 text-sm mb-2">For urgent assistance outside business hours:</p>
                  <a href="tel:+1234567890" className="text-purple-400 hover:text-purple-300 font-medium">+1 (234) 567-890</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-black/30 p-8 rounded-lg border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-purple-500/20 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerServicePage; 