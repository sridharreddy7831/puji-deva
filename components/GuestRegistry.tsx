import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Guest {
  name: string;
  location: string;
  timestamp: number;
}

interface GuestRegistryProps {
  guests: Guest[];
  onAddGuest: (name: string, location: string) => void;
}

const GuestRegistry: React.FC<GuestRegistryProps> = ({ guests, onAddGuest }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onAddGuest(name, location);
      setName('');
      setLocation('');
      setIsFormOpen(false);
    }
  };

  return (
    <section id="registry" className="py-24 px-4 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-script text-[#800000] mb-2">Shower Your Blessings</h2>
          <p className="text-[#4A0E0E] font-serif tracking-widest uppercase text-sm">Send your warm wishes to the couple</p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-[#FFD700] mx-auto mt-4 mb-10"
          ></motion.div>

          {!isFormOpen ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="px-10 py-4 glass-gold text-[#800000] font-bold rounded-2xl hover:bg-[#800000] hover:text-white transition-all duration-500 shadow-2xl border border-[#FFD700]/50 tracking-widest flex items-center gap-3 mx-auto"
            >
              <span className="text-xl">✍️</span> Write a Blessing
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#4A0E0E]/60 backdrop-blur-sm"
              >
                <motion.form
                  initial={{ scale: 0.9, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 50, opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="max-w-md w-full glass p-10 rounded-[3rem] shadow-2xl border-white/40 relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="absolute top-6 right-6 text-[#800000]"
                  >
                    ✕
                  </motion.button>
                  <h3 className="text-3xl font-traditional text-[#800000] mb-8 text-center">Your Blessing</h3>
                  <div className="space-y-6">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-4 bg-white/30 border-b-2 border-[#800000]/20 rounded-2xl outline-none focus:border-[#800000] focus:bg-white/50 transition-all font-serif placeholder:text-black/30 text-lg"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Living in (City)"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-6 py-4 bg-white/30 border-b-2 border-[#800000]/20 rounded-2xl outline-none focus:border-[#800000] focus:bg-white/50 transition-all font-serif placeholder:text-black/30 text-lg"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full glass-maroon text-white font-bold py-4 rounded-2xl hover:bg-[#800000] transition-all shadow-xl border border-white/20 text-lg tracking-widest mt-4"
                    >
                      SEND BLESSING 🪔
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Masonry Layout for Multiple Responses */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {guests.map((guest, idx) => (
              <motion.div
                key={guest.timestamp}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className="break-inside-avoid group relative glass p-8 rounded-3xl shadow-xl border-t-8 border-[#FFD700] bg-gradient-to-br from-white/40 to-white/10"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl font-traditional text-[#800000] mb-1">{guest.name}</h3>
                    <div className="w-12 h-0.5 bg-[#FFD700]/50 group-hover:w-full transition-all duration-700"></div>
                  </div>

                  <div className="flex items-center gap-2 text-[#4A0E0E]">
                    <span className="text-lg opacity-40">📍</span>
                    <span className="font-serif italic font-semibold text-lg">{guest.location}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#800000]/10 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-[#800000] font-bold uppercase tracking-widest opacity-60">
                        📅 {new Date(guest.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)] animate-pulse"></div>
                    </div>
                    <span className="text-[10px] text-[#800000] font-bold uppercase tracking-widest opacity-60">
                      🕒 {new Date(guest.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  </div>
                </div>

                {/* Card Numbering Badge */}
                <div className="absolute -top-4 -right-2 glass-gold w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-[#800000] shadow-lg border border-white/40 rotate-12 group-hover:rotate-0 transition-transform">
                  #{idx + 1}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {guests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 opacity-30 select-none"
          >
            <div className="text-6xl mb-4">📜</div>
            <p className="font-serif italic text-xl">Be the first to leave a blessing...</p>
          </motion.div>
        )}

        {guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <div className="w-px h-24 bg-gradient-to-b from-[#800000]/40 to-transparent mx-auto"></div>
            <p className="mt-8 text-xs text-[#800000] font-bold uppercase tracking-[0.5em] opacity-30">Our Eternal Gratitude</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GuestRegistry;
