import { Calendar, BookOpen, Map, ChevronUp } from 'lucide-react';

interface NavbarProps {
  scrollY: number;
}

export default function Navbar({ scrollY }: NavbarProps) {
  const isScrolled = scrollY > 100;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6a6a] to-[#4ecdc4] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">旅行行程</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('full-map')}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
            >
              <span className="flex items-center space-x-1">
                <Map className="w-4 h-4" />
                <span>地图</span>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('tips')}
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
            >
              <span className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>小贴士</span>
              </span>
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-all ${
              isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="hidden sm:inline">顶部</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
