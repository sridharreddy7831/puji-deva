
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import GuestBook from './pages/GuestBook';
import GuestPopup from './components/GuestPopup';
import WelcomeScreen from './components/WelcomeScreen';
import { AnimatePresence, motion } from 'framer-motion';

interface Guest {
  name: string;
  location: string;
  timestamp: number;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode; isPlaying: boolean; onToggleMusic: () => void }> = ({ children, isPlaying, onToggleMusic }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');

  // Logic to highlight active section on scroll (only relevant for Home)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['hero', 'story', 'ceremonies', 'gallery'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { id: 'hero', label: 'Home', path: '/' },
    { id: 'story', label: 'Story', path: '/#story' },
    { id: 'ceremonies', label: 'Events', path: '/#ceremonies' },
    { id: 'gallery', label: 'Gallery', path: '/#gallery' },
    { id: 'guest-book', label: 'Blessings', path: '/guest-book' }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">

      {/* Music Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          onClick={onToggleMusic}
          className="w-14 h-14 bg-[#FFD700] text-[#800000] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-white transition-all active:scale-90 hover:scale-105"
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </motion.div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </button>
      </div>

      {/* Hamburger Navigation */}
      <div className="fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 bg-[#FFD700] text-[#800000] rounded-full flex flex-col items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-white transition-all active:scale-90 hover:scale-105"
        >
          <div className={`w-6 h-0.5 bg-[#800000] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#800000] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-[#800000] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Expanded Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-[#4A0E0E]/80 backdrop-blur-2xl flex items-center justify-center transition-all duration-700 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="text-center">
          <ul className="space-y-8">
            {navLinks.map((link, idx) => (
              <li
                key={link.id}
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`transition-all transform duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                {link.path.startsWith('/#') ? (
                  <a
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl md:text-5xl font-traditional transition-all hover:tracking-widest ${activeSection === link.id && location.pathname === '/' ? 'text-[#FFD700] scale-110 blur-0' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl md:text-5xl font-traditional transition-all hover:tracking-widest ${location.pathname === link.path ? 'text-[#FFD700] scale-110 blur-0' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-16 text-[#FFD700] text-4xl animate-bounce">🪔</div>
        </div>
      </div>

      <main className="relative z-10">
        {children}
      </main>

      <footer className="pt-0 pb-12 bg-transparent text-center relative overflow-hidden z-0">
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <img
            src="/0.png"
            alt="Traditional Wedding Footer"
            className="w-full h-auto max-w-2xl mix-blend-multiply transform hover:scale-[1.02] transition-transform duration-500"
          />
          <p className="mt-8 text-[10px] tracking-widest uppercase opacity-40 font-bold text-[#4A0E0E]">
            Created with love for Pujitha & Devendra's Union
          </p>
        </div>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [petals, setPetals] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedGuests = localStorage.getItem('vivaha_guests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
    setPetals(Array.from({ length: 15 }, (_, i) => i));

    // Initialize audio
    audioRef.current = new Audio('/1.mp3');
    audioRef.current.loop = true;
  }, []);

  const handleOpenInvitation = () => {
    setShowWelcome(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const addGuest = (name: string, location: string) => {
    const newGuest: Guest = { name, location, timestamp: Date.now() };
    const updated = [newGuest, ...guests];
    setGuests(updated);
    localStorage.setItem('vivaha_guests', JSON.stringify(updated));
  };

  return (
    <Router>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen key="welcome" onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      {/* Petal Falling Animation */}
      {petals.map(id => (
        <div
          key={id}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <div className="w-4 h-4 bg-orange-400/30 rounded-full blur-[1px]"></div>
        </div>
      ))}

      <Layout isPlaying={isPlaying} onToggleMusic={toggleMusic}>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <GuestPopup onAddGuest={addGuest} />
            </>
          } />
          <Route path="/guest-book" element={<GuestBook guests={guests} onAddGuest={addGuest} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
