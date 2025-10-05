import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';
import { Link } from 'react-router-dom';

interface CoverflowCarouselProps {
  items: GalleryItem[];
}

const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({ items }) => {
  const initialIndex = items.length > 2 ? Math.floor(items.length / 2) : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  if (!items || items.length === 0) return null;

  const getPosition = (index: number) => {
    let pos = index - activeIndex;
    const numItems = items.length;
    if (pos > numItems / 2) pos -= numItems;
    if (pos < -numItems / 2) pos += numItems;
    return pos;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-full h-[250px] md:h-[350px] flex items-center justify-center">
        {/* Carousel Items */}
        <div className="relative w-full h-full">
          {items.map((item, index) => {
            const position = getPosition(index);
            const isVisible = Math.abs(position) <= 2; // Show center + 2 on each side

            return (
              <motion.div
                key={`${item.id}-${index}`}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                initial={{ x: `${position * 100}%`, scale: 0.7, opacity: 0 }}
                animate={{
                  x: `${position * 28}%`, // Horizontal spacing
                  y: position === 0 ? 0 : '12%', // Vertically align side images lower
                  scale: position === 0 ? 1 : 0.65, // Center image is larger
                  zIndex: items.length - Math.abs(position),
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <Link to="/gallery" className="block w-full h-full flex items-center justify-center">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover rounded-lg"
                    style={{
                      width: 'auto',
                      height: '100%',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 lg:left-24 top-1/2 -translate-y-1/2 z-30 bg-brand-light-blue/60 p-2 rounded-full shadow-lg hover:bg-brand-light-blue transition-all backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-dark-blue" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 lg:right-24 top-1/2 -translate-y-1/2 z-30 bg-brand-light-blue/60 p-2 rounded-full shadow-lg hover:bg-brand-light-blue transition-all backdrop-blur-sm"
          aria-label="Next image"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-brand-dark-blue" />
        </button>
      </div>
    </div>
  );
};

export default CoverflowCarousel;
