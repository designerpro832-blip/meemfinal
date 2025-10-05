import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface FanCarouselProps {
  items: GalleryItem[];
}

const FanCarousel: React.FC<FanCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images to prevent flash on first load
  useEffect(() => {
    items.forEach(item => {
      const img = new Image();
      img.src = item.image_url;
    });
  }, [items]);

  const goNext = () => setActiveIndex(prev => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex(prev => (prev - 1 + items.length) % items.length);

  const getPosition = (index: number) => {
    let pos = index - activeIndex;
    const numItems = items.length;
    if (pos > numItems / 2) pos -= numItems;
    if (pos < -numItems / 2) pos += numItems;
    return pos;
  };

  if (!items || items.length === 0) return null;

  const MAX_VISIBLE_OFFSET = 3;

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="relative w-full h-[300px] md:h-[350px] mb-8">
        {items.map((item, index) => {
          const position = getPosition(index);
          const isVisible = Math.abs(position) <= MAX_VISIBLE_OFFSET;

          return (
            <motion.div
              key={`${item.id}-${index}`}
              className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                x: `${position * 50}px`, // Horizontal spread
                rotate: position * 10, // Fan rotation
                scale: position === 0 ? 1.1 : 1 - Math.abs(position) * 0.15, // Center is biggest
                zIndex: items.length - Math.abs(position),
                opacity: isVisible ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
          disabled={items.length <= 1}
          aria-label="Previous image"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={goNext}
          className="p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={items.length <= 1}
          aria-label="Next image"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FanCarousel;
