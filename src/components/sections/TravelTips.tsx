import { useRef, useEffect, useState } from 'react';
import { travelTips } from '@/data/tripData';
import { Lightbulb } from 'lucide-react';

function TipCard({ tip }: { tip: typeof travelTips[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center cursor-pointer border border-white/10"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${rotation.x !== 0 || rotation.y !== 0 ? 20 : 0}px)`,
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div 
        className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl"
        style={{
          background: 'linear-gradient(135deg, #ff6a6a, #4ecdc4)',
          transform: rotation.x !== 0 || rotation.y !== 0 ? 'scale(1.1) translateZ(30px)' : 'scale(1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {tip.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>

      {/* Content */}
      <p className="text-white/60 text-sm leading-relaxed">{tip.content}</p>
    </div>
  );
}

export default function TravelTips() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tips" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden bg-black">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#ff6a6a]/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#4ecdc4]/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Lightbulb className="w-4 h-4 text-[#ffe66d]" />
            <span className="text-sm text-white/70">出行必读</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            旅行<span className="text-[#4ecdc4]">小贴士</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            出行前必读，让您的旅程更加顺利愉快
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelTips.slice(0, 3).map((tip, index) => (
            <div 
              key={index} 
              className={`tip-card-wrapper transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ perspective: '1000px', transitionDelay: `${index * 100}ms` }}
            >
              <TipCard tip={tip} />
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
          {travelTips.slice(3).map((tip, index) => (
            <div 
              key={index + 3} 
              className={`tip-card-wrapper transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ perspective: '1000px', transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <TipCard tip={tip} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
