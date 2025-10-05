import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface ImageCarouselProps {
  items: GalleryItem[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images to prevent flash on first load
  useEffect(() => {
    items.forEach(item => {
      const img = new Image();
      img.src = item.image_url;
    });
  }, [items]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  // This function calculates the circular position for infinite looping
  const getAdjustedPosition = (index: number) => {
    const pos = index - activeIndex;
    const numItems = items.length;
    if (pos > numItems / 2) {
      return pos - numItems;
    }
    if (pos < -numItems / 2) {
      return pos + numItems;
    }
    return pos;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      {/* Title and Author for active image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 h-12"
        >
          <h3 className="text-2xl font-bold text-gray-800">{items[activeIndex].title}</h3>
          <p className="text-gray-500">by {items[activeIndex].photographer}</p>
        </motion.div>
      </AnimatePresence>

      {/* Carousel */}
      <div className="relative w-full h-[300px] md:h-[400px] [perspective:1200px]">
        {items.map((item, index) => {
          const position = getAdjustedPosition(index);

          const variants = {
            center: { x: '0%', scale: 1.1, rotateY: 0, zIndex: 3 },
            left1: { x: '-40%', scale: 0.85, rotateY: 40, zIndex: 2 },
            right1: { x: '40%', scale: 0.85, rotateY: -40, zIndex: 2 },
            left2: { x: '-70%', scale: 0.7, rotateY: 45, zIndex: 1 },
            right2: { x: '70%', scale: 0.7, rotateY: -45, zIndex: 1 },
            hidden: { opacity: 0, scale: 0.5, x: position > 0 ? '100%' : '-100%' }
          };

          let variant = 'hidden';
          if (position === 0) variant = 'center';
          if (position === 1) variant = 'right1';
          if (position === -1) variant = 'left1';
          if (position === 2) variant = 'right2';
          if (position === -2) variant = 'left2';

          return (
            <motion.div
              key={item.id}
              className="absolute w-[200px] h-[280px] md:w-[250px] md:h-[350px] top-0 left-0 right-0 mx-auto cursor-pointer"
              initial="hidden"
              animate={variant}
              variants={variants}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => goToIndex(index)}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-16 md:mt-8">
        <button
          onClick={goPrev}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          disabled={items.length <= 1}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={goNext}
          className="p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={items.length <= 1}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
