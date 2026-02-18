import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestPopupProps {
  onAddGuest: (name: string, location: string) => void;
}

const GuestPopup: React.FC<GuestPopupProps> = ({ onAddGuest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // 1. Scroll Trigger Logic
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 300 && !hasShown && !isDismissed) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // 2. 60-Second Timer Logic
    const timer = setTimeout(() => {
      if (!hasShown && !isDismissed) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 60000); // 60 seconds

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasShown, isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // We don't use sessionStorage here anymore because we want the notification icon to persist
  };

  const handleOpen = () => {
    setIsVisible(true);
    setIsDismissed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onAddGuest(name, location);
      setIsVisible(false);
      setIsDismissed(false); // Hide the notification since they signed
      setHasShown(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 9999 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg glass p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] border-2 border-white/40 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#800000]/10 rounded-full blur-2xl"></div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-[#800000] p-3 md:p-2 bg-white/40 rounded-full z-20 cursor-pointer shadow-md"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </motion.button>

              <div className="text-center relative z-10 w-full">
                <div className="text-[10px] md:text-sm font-bold text-[#800000] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-2 md:mb-4 opacity-70">Om Namo Venkatesaya</div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl md:text-5xl mb-3 md:mb-6"
                >
                  🙏
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-script text-[#800000] mb-2 md:mb-3">Athithi Devo Bhava</h2>
                <p className="font-serif text-[#4A0E0E] mb-6 md:mb-8 italic text-sm md:text-lg leading-snug px-2">
                  We would love to know who is visiting our digital invitation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Good Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 md:px-6 py-3 md:py-4 bg-white/40 border-b-2 border-[#800000]/20 rounded-xl md:rounded-2xl outline-none focus:border-[#800000] focus:bg-white/60 transition-all font-serif placeholder:text-black/30 text-base md:text-lg shadow-inner"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Where are you from?"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-5 md:px-6 py-3 md:py-4 bg-white/40 border-b-2 border-[#800000]/20 rounded-xl md:rounded-2xl outline-none focus:border-[#800000] focus:bg-white/60 transition-all font-serif placeholder:text-black/30 text-base md:text-lg shadow-inner"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full glass-maroon text-white font-bold py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl transition-all border border-white/20 tracking-[0.1em] md:tracking-[0.2em] font-traditional text-xs md:text-sm"
                  >
                    I’M COMING 🎉
                  </motion.button>
                  <p className="text-[9px] md:text-[10px] text-[#800000]/60 uppercase tracking-widest font-bold">Your visit is recorded with love</p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Notification Symbol (Warn style) */}
      <AnimatePresence>
        {isDismissed && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-6 left-6 z-[100]"
          >
            <motion.button
              onClick={handleOpen}
              animate={{
                y: [0, -10, 0],
                boxShadow: ["0 0 0px rgba(255,215,0,0.3)", "0 0 20px rgba(255,215,0,0.6)", "0 0 0px rgba(255,215,0,0.3)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-14 h-14 bg-[#FFD700] text-[#800000] border-2 border-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl relative group"
            >
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] rounded-full text-[8px] flex items-center justify-center text-[#FFD700] font-black">1</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-4 py-2 glass-maroon text-xs whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold border border-[#FFD700]/30 text-[#FFD700]">
                Sign the Guest Book 🙏
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuestPopup;
