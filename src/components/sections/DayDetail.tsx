import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tripData, type DayData } from '@/data/tripData';
import { ChevronDown, Plane, Car, Hotel, Utensils, Eye, Anchor, Bike, Camera, ShoppingBag, Train, Ship, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  '✈️': <Plane className="w-5 h-5" />,
  '🛬': <Plane className="w-5 h-5" />,
  '🚗': <Car className="w-5 h-5" />,
  '🏨': <Hotel className="w-5 h-5" />,
  '🍽️': <Utensils className="w-5 h-5" />,
  '👀': <Eye className="w-5 h-5" />,
  '🏛️': <MapPin className="w-5 h-5" />,
  '🏖️': <Anchor className="w-5 h-5" />,
  '👣': <MapPin className="w-5 h-5" />,
  '🚤': <Ship className="w-5 h-5" />,
  '🏍️': <Bike className="w-5 h-5" />,
  '📸': <Camera className="w-5 h-5" />,
  '🛍️': <ShoppingBag className="w-5 h-5" />,
  '🚇': <Train className="w-5 h-5" />,
  '🚌': <Car className="w-5 h-5" />,
};

const getActivityColor = (icon: string): string => {
  if (icon === '✈️' || icon === '🛬') return 'bg-blue-100 text-blue-600';
  if (icon === '🚗' || icon === '🚌' || icon === '🚇' || icon === '🏍️' || icon === '🚤') return 'bg-green-100 text-green-600';
  if (icon === '🏨') return 'bg-purple-100 text-purple-600';
  if (icon === '🍽️') return 'bg-orange-100 text-orange-600';
  if (icon === '👀' || icon === '📸') return 'bg-pink-100 text-pink-600';
  return 'bg-gray-100 text-gray-600';
};

function DayAccordion({ data, isOpen, onToggle }: { data: DayData; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [data.activities]);

  return (
    <div 
      id={`day-detail-${data.day}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #ff6a6a, #ff8e8e)' }}
          >
            {data.day}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-black">{data.title}</h3>
            <p className="text-sm text-gray-500">{data.date} · {data.activities.length} 个活动</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <img 
            src={data.image} 
            alt={data.title}
            className="w-16 h-16 rounded-lg object-cover hidden sm:block"
          />
          <ChevronDown 
            className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
            style={{ transitionTimingFunction: 'var(--ease-liquid)' }}
          />
        </div>
      </button>

      {/* Content */}
      <div 
        className="overflow-hidden transition-all duration-600"
        style={{ 
          maxHeight: isOpen ? contentHeight : 0,
          transitionTimingFunction: 'var(--ease-liquid)'
        }}
      >
        <div ref={contentRef} className="p-6">
          {/* Description */}
          <p className="text-gray-600 mb-6">{data.subtitle}</p>

          {/* Activity Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff6a6a] via-[#4ecdc4] to-[#ff6a6a]" />

            {/* Activities */}
            <div className="space-y-4">
              {data.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="relative pl-14 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Timeline Dot */}
                  <div 
                    className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity.icon)}`}
                  >
                    {iconMap[activity.icon] || <span className="text-lg">{activity.icon}</span>}
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-semibold text-[#ff6a6a]">{activity.time}</span>
                    <p className="text-gray-700 mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-3">行程亮点</p>
            <div className="flex flex-wrap gap-2">
              {data.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#ff6a6a]/10 to-[#4ecdc4]/10 text-gray-700"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DayDetail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.day-detail-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.day-accordion-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleDay = (day: number) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f6f6f6] to-white" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="day-detail-title text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            每日<span className="text-[#ff6a6a]">详情</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            点击查看每一天的详细行程安排
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {tripData.map((day) => (
            <div key={day.day} className="day-accordion-item">
              <DayAccordion
                data={day}
                isOpen={openDay === day.day}
                onToggle={() => toggleDay(day.day)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
