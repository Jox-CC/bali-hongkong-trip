import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tripData, type DayData } from '@/data/tripData';
import { Plane, Car, Hotel, Utensils, Eye, Anchor, Bike, Camera, ShoppingBag, Train, Ship, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  '✈️': <Plane className="w-4 h-4" />,
  '🛬': <Plane className="w-4 h-4" />,
  '🚗': <Car className="w-4 h-4" />,
  '🏨': <Hotel className="w-4 h-4" />,
  '🍽️': <Utensils className="w-4 h-4" />,
  '👀': <Eye className="w-4 h-4" />,
  '🏛️': <MapPin className="w-4 h-4" />,
  '🏖️': <Anchor className="w-4 h-4" />,
  '👣': <MapPin className="w-4 h-4" />,
  '🚤': <Ship className="w-4 h-4" />,
  '🏍️': <Bike className="w-4 h-4" />,
  '📸': <Camera className="w-4 h-4" />,
  '🛍️': <ShoppingBag className="w-4 h-4" />,
  '🚇': <Train className="w-4 h-4" />,
  '🚌': <Car className="w-4 h-4" />,
};

function DayCard({ data, index }: { data: DayData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { 
          opacity: 0, 
          rotateY: index % 2 === 0 ? -45 : 45,
          x: index % 2 === 0 ? -100 : 100
        },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`day-card relative ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}
      style={{ 
        width: '100%',
        maxWidth: '500px',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Day Badge */}
      <div 
        className="absolute -top-4 left-6 z-20 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, #ff6a6a, #ff8e8e)',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s var(--ease-elastic)'
        }}
      >
        第{data.day}天 · {data.date}
      </div>

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ 
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transitionTimingFunction: 'var(--ease-smooth)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{data.title}</h3>
          <p className="text-sm text-white/80">{data.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {data.highlights.map((highlight, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Activities Preview */}
        <div className="space-y-2">
          {data.activities.slice(0, 3).map((activity, i) => (
            <div key={i} className="flex items-center space-x-3 text-sm">
              <span className="text-gray-500 font-medium min-w-[50px]">{activity.time}</span>
              <span className="text-[#ff6a6a]">{iconMap[activity.icon] || activity.icon}</span>
              <span className="text-gray-700 truncate">{activity.description}</span>
            </div>
          ))}
          {data.activities.length > 3 && (
            <p className="text-xs text-gray-500 pl-[70px]">
              +{data.activities.length - 3} 更多活动
            </p>
          )}
        </div>

        {/* View Details Button */}
        <button 
          onClick={() => document.getElementById(`day-detail-${data.day}`)?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full py-3 rounded-xl text-sm font-semibold text-[#ff6a6a] bg-[#ff6a6a]/10 hover:bg-[#ff6a6a]/20 transition-colors"
        >
          查看详情
        </button>
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Timeline line animation
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
          }
        }
      );

      // Date markers animation
      gsap.utils.toArray<HTMLElement>('.date-marker').forEach((marker, i) => {
        gsap.fromTo(marker,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: marker,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f6] via-white to-[#f6f6f6]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            行程<span className="text-[#ff6a6a]">时间轴</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            六天五夜的精彩旅程，从巴厘岛的 tropical paradise 到香港的繁华都市
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div 
            className="timeline-line hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full"
            style={{ transformOrigin: 'top' }}
          />

          {/* Cards Grid */}
          <div className="space-y-12 lg:space-y-24">
            {tripData.map((day, index) => (
              <div key={day.day} className="relative">
                {/* Date Marker - Desktop */}
                <div 
                  className="date-marker hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center z-10"
                  style={{ top: '50%', marginTop: '-24px' }}
                >
                  <span className="text-lg font-bold text-[#ff6a6a]">{day.day}</span>
                </div>

                {/* Card */}
                <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                  <DayCard data={day} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
