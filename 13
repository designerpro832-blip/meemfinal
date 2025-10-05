import React from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '../types';
import { Link } from 'react-router-dom';

interface HorizontalGalleryProps {
  items: GalleryItem[];
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = items.slice(0, 12);

  return (
    <div className="w-full relative">
      <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 w-64 md:w-72"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link to="/gallery" className="block group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-ui-surface">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm font-semibold">
                  NEW
                </div>
              </div>
              <div className="mt-4 px-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-base text-ui-text-primary truncate w-3/4">{item.title}</h3>
                    <p className="text-sm font-bold text-brand-mid-blue">{item.category.substring(0,3).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-ui-text-secondary mt-1">
                    <span>📸 By {item.photographer}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-1"></div>
      </div>
      <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-ui-background to-transparent pointer-events-none md:hidden" />
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-ui-background to-transparent pointer-events-none md:hidden" />
    </div>
  );
};

export default HorizontalGallery;
