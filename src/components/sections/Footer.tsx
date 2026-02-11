import { useRef, useEffect, useState } from 'react';
import { Calendar, Heart, Plane } from 'lucide-react';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden border-t border-white/10">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6a6a] to-[#4ecdc4] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">旅行行程</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              精心策划每一次旅程，<br />
              只为难忘的冒险与回忆。
            </p>
          </div>

          {/* Center - Trip Info */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white/5">
              <div className="text-center">
                <Plane className="w-6 h-6 text-[#ff6a6a] mx-auto mb-1" />
                <p className="text-xs text-white/40">巴厘岛</p>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#ff6a6a] to-[#4ecdc4]" />
              <div className="text-center">
                <Plane className="w-6 h-6 text-[#4ecdc4] mx-auto mb-1" />
                <p className="text-xs text-white/40">香港</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/40">
              2024年2月20日 - 25日
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <p className="text-sm font-semibold text-white/60 mb-4">快速导航</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <button 
                onClick={() => document.getElementById('full-map')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                地图
              </button>
              <button 
                onClick={() => document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                小贴士
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-white/30">
            © 2024 旅行行程. 保留所有权利。
          </p>
          <p className="text-sm text-white/30 flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#ff6a6a] fill-[#ff6a6a]" />
            <span>for unforgettable adventures</span>
          </p>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6a6a] via-[#4ecdc4] to-[#ffe66d]" />
    </footer>
  );
}
