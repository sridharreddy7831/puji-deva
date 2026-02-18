import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '../constants';

const ImageSlider: React.FC<{ images: { url: string }[]; aspect: string }> = ({ images, aspect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="mb-12">
      <div className="relative group max-w-4xl mx-auto">
        <div className={`relative ${aspect} overflow-hidden rounded-[2rem] shadow-2xl border-2 border-[#FFD700]/40 bg-[#4A0E0E]/5`}>
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="min-w-full h-full relative">
                  <img
                    src={img.url}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E0E]/40 via-transparent to-transparent opacity-40"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-light text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass-light text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/20 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const horizontalImages = GALLERY_IMAGES.slice(0, 3);
  const verticalImages = GALLERY_IMAGES.slice(3, 6);

  return (
    <section id="gallery" className="pt-12 pb-16 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-script text-[#800000] mb-2">Moments of Love</h2>
          <p className="text-[#4A0E0E] font-serif tracking-widest uppercase text-sm">A glimpse into our journey</p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-[#FFD700] mx-auto mt-4"
          ></motion.div>
        </motion.div>

        {/* Horizontal Slideshow */}
        {horizontalImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider
              images={horizontalImages}
              aspect="aspect-[16/9]"
            />
          </motion.div>
        )}

        {/* Vertical Slideshow */}
        {verticalImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageSlider
              images={verticalImages}
              aspect="max-w-md mx-auto aspect-[4/5]"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass-maroon py-8 px-10 rounded-[2.5rem] text-center italic text-[#4A0E0E] font-serif text-sm md:text-lg max-w-2xl mx-auto leading-relaxed border border-[#FFD700]/20 shadow-lg"
        >
          "A collection of memories, woven with love and laughter, leading us to our forever."
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
