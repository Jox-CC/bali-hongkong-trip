import { useRef, useEffect, useState } from 'react';
import { Calendar, ChevronDown, Plane, Hotel, Camera } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToDays = () => {
    const firstDay = document.querySelector('.day-section-1');
    if (firstDay) {
      firstDay.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image Grid */}
      <div className="absolute inset-0">
        <div className="grid grid-cols-2 grid-rows-2 h-full">
          <div className="relative overflow-hidden">
            <img 
              src="day2-uluwatu.jpg" 
              alt="乌鲁瓦图" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="day4-kelingking.jpg" 
              alt="精灵坠崖" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-black/50 to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="day3-devilstear.jpg" 
              alt="恶魔的眼泪" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src="day6-hongkong.jpg" 
              alt="香港" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-black/50 to-transparent" />
          </div>
        </div>
        {/* Overall gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      </div>

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <Calendar className="w-4 h-4 text-[#ff6a6a]" />
          <span className="text-sm font-medium text-white/90">2024年2月20日 - 25日</span>
        </div>

        {/* Title */}
        <h1 className="text-center mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            巴厘岛
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mt-2">
            <span className="text-white">与</span>
            <span className="bg-gradient-to-r from-[#ff6a6a] to-[#4ecdc4] bg-clip-text text-transparent"> 香港</span>
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/80 mt-4">
            探险之旅
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 text-center max-w-2xl mb-12">
          6天5夜穿越热带天堂与繁华都市，体验巴厘岛的自然奇观与香港的都市魅力
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#ff6a6a]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-sm text-white/50">城市</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Hotel className="w-5 h-5 text-[#4ecdc4]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-sm text-white/50">晚住宿</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#ffe66d]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">15+</p>
              <p className="text-sm text-white/50">景点</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button 
          onClick={scrollToDays}
          className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105"
        >
          <span>探索行程</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
