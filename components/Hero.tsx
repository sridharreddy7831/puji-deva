import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLOKAS, WEDDING_DATE } from '../constants';

const Hero: React.FC = () => {
  const [currentSloka, setCurrentSloka] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const slokaInterval = setInterval(() => {
      setCurrentSloka((prev) => (prev + 1) % SLOKAS.length);
    }, 5000);

    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerInterval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => {
      clearInterval(slokaInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const handleSaveDate = () => {
    const event = {
      title: "Wedding Ceremony of Puji & Deva",
      details: "Join us to celebrate the union of Pujitha and Devendra.",
      location: "Tirupati, Andhra Pradesh",
      start: "20260222T100000Z", // Example start time (update based on WEDDING_DATE)
      end: "20260222T220000Z"
    };

    // Construct Google Calendar URL
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleUrl, '_blank');
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#4A0E0E]">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/4.jpg')`,
          filter: 'brightness(0.3)'
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSloka}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#FFD700] font-traditional text-sm md:text-lg tracking-widest italic"
            >
              {SLOKAS[currentSloka]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#FFD700] font-traditional text-sm md:text-lg tracking-widest mb-4 uppercase"
        >
          Together with Loving Families
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2"
        >
          We invite you to celebrate the
        </motion.p>

        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          className="text-[#FFD700] font-script text-4xl md:text-6xl mb-6"
        >
          Wedding Ceremony
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.9 }}
          className="text-white/60 font-serif text-xs uppercase tracking-widest mb-4"
        >
          of
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="text-white font-traditional text-4xl md:text-7xl lg:text-8xl mb-4 drop-shadow-lg text-center"
        >
          Puji <span className="text-[#FFD700] font-script text-3xl md:text-6xl">&</span> Deva
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="h-1 bg-[#FFD700] mx-auto my-6"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white font-serif text-xl md:text-3xl italic tracking-wide mb-8"
        >
          22nd February, 2026 • Tirupati
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto mb-12"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-light flex flex-col items-center py-3 rounded-2xl border border-white/10 shadow-lg px-2 sm:px-4"
            >
              <span className="text-2xl md:text-4xl font-bold text-[#FFD700] font-serif drop-shadow-md">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold mt-1">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={handleSaveDate}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#FFD700',
            color: '#4A0E0E',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#FFD700]/90 text-[#4A0E0E] font-bold rounded-full transition-all duration-300 shadow-2xl border-2 border-[#FFD700] tracking-widest uppercase text-xs md:text-sm hover:z-20 relative group"
        >
          SAVE THE DATE
        </motion.button>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-50px] left-[-50px] w-48 h-48 md:w-80 md:h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD700] fill-current">
          <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-50px] right-[-50px] w-48 h-48 md:w-80 md:h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD700] fill-current">
          <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
