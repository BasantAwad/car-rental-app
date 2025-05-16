import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InfoPage = ({ title, content, lastUpdated }) => {
  const navigate = useNavigate();

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

      <div className="bg-black/30 p-8 rounded-lg border border-purple-500/20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">{title}</h1>
        
        {lastUpdated && (
          <p className="text-gray-400 text-sm mb-8">
            Last updated: {lastUpdated}
          </p>
        )}

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.div>
  );
};

export default InfoPage; 