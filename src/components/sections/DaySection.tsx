import { useEffect, useRef, useState } from 'react';
import { tripData, type DayData, attractionDetails, hotelData } from '@/data/tripData';
import { Plane, Car, Hotel, Utensils, Eye, Anchor, Bike, Camera, Train, Ship, MapPin, Clock, MapPinned, Info, Bed } from 'lucide-react';
import AttractionModal from '../AttractionModal';
import MiniRouteMap from '../MiniRouteMap';

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
  '🛍️': <Camera className="w-5 h-5" />,
  '🚇': <Train className="w-5 h-5" />,
  '🚌': <Car className="w-5 h-5" />,
};

const getActivityColor = (icon: string): string => {
  if (icon === '✈️' || icon === '🛬') return 'from-blue-500 to-blue-600';
  if (icon === '🚗' || icon === '🚌' || icon === '🚇' || icon === '🏍️' || icon === '🚤') return 'from-green-500 to-green-600';
  if (icon === '🏨') return 'from-purple-500 to-purple-600';
  if (icon === '🍽️') return 'from-orange-500 to-orange-600';
  if (icon === '👀' || icon === '📸') return 'from-pink-500 to-pink-600';
  return 'from-gray-500 to-gray-600';
};

// Activity Item with click to show detail
function ActivityItem({ activity, index, onLocationClick }: { activity: DayData['activities'][0]; index: number; onLocationClick: (name: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasDetail = activity.locationName && attractionDetails[activity.locationName];
  
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
        hasDetail ? 'bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20' : 'bg-white/5'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => hasDetail && activity.locationName && onLocationClick(activity.locationName)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getActivityColor(activity.icon)} flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        {iconMap[activity.icon] || <span>{activity.icon}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/60 text-sm">{activity.time}</p>
        <p className="text-white font-medium">{activity.description}</p>
      </div>
      {hasDetail && (
        <div className={`flex-shrink-0 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <Info className="w-5 h-5 text-[#ff6a6a]" />
        </div>
      )}
    </div>
  );
}

// Attraction Card Component
function AttractionCard({ name, onClick }: { name: string; onClick: () => void }) {
  const detail = attractionDetails[name];
  if (!detail) return null;
  
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={detail.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/day1-airport.jpg';
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white font-semibold text-lg">{name}</h4>
        <p className="text-white/70 text-sm line-clamp-2 mt-1">{detail.description}</p>
      </div>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Info className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}

// Hotel Card Component
function HotelCard({ day }: { day: number }) {
  const hotel = hotelData[day];
  if (!hotel) return null;
  
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/day1-airport.jpg';
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute top-3 left-3 flex items-center space-x-1 px-3 py-1 rounded-full bg-purple-500/80 backdrop-blur-sm">
        <Bed className="w-3 h-3 text-white" />
        <span className="text-white text-xs font-medium">今日住宿</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white font-bold text-xl">{hotel.name}</h4>
        <p className="text-white/70 text-sm mt-1 line-clamp-2">{hotel.description}</p>
        {hotel.tips && (
          <p className="text-purple-300 text-xs mt-2">
            <span className="inline-block w-1 h-1 rounded-full bg-purple-400 mr-1"></span>
            {hotel.tips}
          </p>
        )}
      </div>
    </div>
  );
}

function DayContent({ data }: { data: DayData }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Scroll animation with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContentVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Get attractions for this day
  const dayAttractions = data.locations.filter(loc => 
    loc.type === 'attraction' && attractionDetails[loc.name]
  );

  return (
    <>
      <section 
        ref={sectionRef}
        className={`day-section-${data.day} relative min-h-screen w-full overflow-hidden`}
      >
        {/* Full-screen Background Image */}
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        </div>

        {/* Content */}
        <div 
          ref={contentRef}
          className={`relative z-10 min-h-screen flex items-center transition-all duration-1000 ${
            isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              
              {/* Left: Day Info & Activities */}
              <div className="lg:col-span-3 space-y-6">
                {/* Day Badge */}
                <div className="inline-flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6a6a] to-[#ff8e8e] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {data.day}
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium tracking-wider uppercase">Day {data.day}</p>
                    <p className="text-white text-lg">{data.date}</p>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {data.title}
                  </h2>
                  <p className="mt-3 text-lg text-white/80">
                    {data.subtitle}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {data.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Activities Timeline */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white/60 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">今日行程 ({data.activities.length} 个活动)</span>
                  </div>
                  
                  <div className={`space-y-2 ${data.activities.length > 5 ? 'max-h-[280px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                    {data.activities.map((activity, i) => (
                      <div 
                        key={i} 
                        className={`transition-all duration-500 ${
                          isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                        style={{ transitionDelay: `${200 + i * 80}ms` }}
                      >
                        <ActivityItem 
                          activity={activity} 
                          index={i} 
                          onLocationClick={setSelectedLocation}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel Card */}
                {data.hotel && (
                  <div 
                    className={`space-y-3 pt-4 transition-all duration-700 ${
                      isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                  >
                    <div className="flex items-center space-x-2 text-white/60">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm font-medium">今日住宿</span>
                    </div>
                    <HotelCard day={data.day} />
                  </div>
                )}

                {/* Attractions Gallery */}
                {dayAttractions.length > 0 && (
                  <div 
                    className={`space-y-3 pt-4 transition-all duration-700 ${
                      isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: '800ms' }}
                  >
                    <div className="flex items-center space-x-2 text-white/60">
                      <MapPinned className="w-4 h-4" />
                      <span className="text-sm font-medium">今日景点 (点击查看详情)</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dayAttractions.map((attr, i) => (
                        <div 
                          key={i}
                          className={`transition-all duration-500 ${
                            isContentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                          style={{ transitionDelay: `${900 + i * 100}ms` }}
                        >
                          <AttractionCard 
                            name={attr.name} 
                            onClick={() => setSelectedLocation(attr.name)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Mini Route Map with Flying Line Animation */}
              <div 
                className={`lg:col-span-2 hidden lg:block transition-all duration-1000 ${
                  isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-5 border border-white/10 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPinned className="w-5 h-5 text-[#ff6a6a]" />
                      <span className="text-white font-semibold">今日路线</span>
                    </div>
                    <span className="text-white/40 text-sm">{data.locations.length} 个地点</span>
                  </div>
                  <div className="h-[350px] rounded-2xl overflow-hidden">
                    <MiniRouteMap 
                      locations={data.locations}
                      day={data.day}
                      onLocationClick={setSelectedLocation}
                    />
                  </div>
                  <p className="mt-4 text-xs text-white/40 text-center">
                    点击标记查看景点详情 · 悬停查看简介
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Attraction Modal */}
      <AttractionModal
        locationName={selectedLocation || ''}
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </>
  );
}

export default function DaySections() {
  return (
    <div className="relative">
      {tripData.map((day) => (
        <DayContent key={day.day} data={day} />
      ))}
    </div>
  );
}
