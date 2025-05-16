import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from './InfoPage';

const BlogPage = () => {
  const content = (
    <>
      <h2>Latest Articles</h2>
      
      <div className="space-y-8">
        <article className="border-b border-purple-500/20 pb-8">
          <h3 className="text-2xl font-bold mb-4">The Future of Luxury Car Rentals</h3>
          <p className="text-gray-400 mb-4">March 15, 2024</p>
          <p>Exploring the latest trends in luxury car rentals, from electric vehicles to autonomous driving features...</p>
          <Link to="/blog/future-of-luxury-car-rentals" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">Read More →</Link>
        </article>

        <article className="border-b border-purple-500/20 pb-8">
          <h3 className="text-2xl font-bold mb-4">Top 10 Luxury Cars for Summer 2024</h3>
          <p className="text-gray-400 mb-4">March 10, 2024</p>
          <p>Discover the most sought-after luxury vehicles for your summer adventures...</p>
          <Link to="/blog/top-10-luxury-cars-summer-2024" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">Read More →</Link>
        </article>

        <article className="border-b border-purple-500/20 pb-8">
          <h3 className="text-2xl font-bold mb-4">Luxury Car Maintenance Tips</h3>
          <p className="text-gray-400 mb-4">March 5, 2024</p>
          <p>Essential maintenance tips to keep your luxury vehicle in pristine condition...</p>
          <Link to="/blog/luxury-car-maintenance-tips" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">Read More →</Link>
        </article>

        <article className="border-b border-purple-500/20 pb-8">
          <h3 className="text-2xl font-bold mb-4">The Rise of Electric Luxury Vehicles</h3>
          <p className="text-gray-400 mb-4">February 28, 2024</p>
          <p>How electric vehicles are reshaping the luxury car market...</p>
          <Link to="/blog/rise-of-electric-luxury-vehicles" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">Read More →</Link>
        </article>

        <article>
          <h3 className="text-2xl font-bold mb-4">Luxury Car Rental Guide for Beginners</h3>
          <p className="text-gray-400 mb-4">February 20, 2024</p>
          <p>Everything you need to know about renting your first luxury vehicle...</p>
          <Link to="/blog/luxury-car-rental-guide" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">Read More →</Link>
        </article>
      </div>
    </>
  );

  return (
    <InfoPage
      title="Blog"
      content={content}
      lastUpdated="March 15, 2024"
    />
  );
};

export default BlogPage; 