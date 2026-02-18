import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
    onOpen: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
    React.useEffect(() => {
        // Prevent scrolling on the welcome page
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-[#4A0E0E] flex items-center justify-center overflow-hidden touch-none"
        >
            {/* Background image with brightness filter */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-110"
                style={{ backgroundImage: "url('/5.jpg')" }}
            ></div>

            {/* Decorative Mandalas */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 opacity-20 pointer-events-none"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD700] fill-current">
                    <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
                </svg>
            </motion.div>
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 opacity-20 pointer-events-none"
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD700] fill-current">
                    <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
                </svg>
            </motion.div>

            <div className="relative z-10 text-center px-6 max-w-2xl">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="text-[10px] md:text-sm font-bold text-[#FFD700] uppercase tracking-[0.5em] mb-4 opacity-80">
                        Shubh Vivah
                    </div>
                    <div className="w-12 h-0.5 bg-[#FFD700] mx-auto mb-10"></div>

                    <h2 className="text-[#FFD700] font-traditional text-xl md:text-3xl tracking-widest mb-2 uppercase">
                        The Pandikunta Family
                    </h2>
                    <p className="text-white/60 font-serif italic text-sm md:text-base mb-12">
                        Warmly welcome you to the union of
                    </p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, type: "spring" }}
                    className="mb-12"
                >
                    <h1 className="text-white font-traditional text-4xl md:text-7xl mb-4 drop-shadow-2xl">
                        Pujitha <span className="text-[#FFD700] font-script text-3xl md:text-6xl">&</span> Devendra
                    </h1>

                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <motion.button
                        onClick={onOpen}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#FFD700",
                            color: "#4A0E0E",
                            boxShadow: "0 0 40px rgba(255, 215, 0, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-full transition-all duration-500 tracking-[0.3em] text-xs md:text-sm group relative overflow-hidden"
                    >
                        <span className="relative z-10">OPEN INVITATION</span>
                        <div className="absolute inset-0 bg-[#FFD700] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </motion.button>

                    <p className="mt-8 text-white/30 text-[9px] uppercase tracking-widest font-bold animate-pulse">
                        Bless us with your presence
                    </p>
                </motion.div>
            </div>

            {/* Ganesh Icon at top center */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-24 h-24 pointer-events-none"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD700] fill-current">
                    <path d="M50 10C35 10 25 25 25 40C25 55 40 70 40 85L50 95L60 85C60 70 75 55 75 40C75 25 65 10 50 10Z" />
                </svg>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;
