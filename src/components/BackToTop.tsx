import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-[#ff6a6a] hover:text-white transition-all z-50 hover:scale-110 animate-fade-in"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}
      aria-label="返回顶部"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
