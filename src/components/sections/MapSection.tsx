import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allLocations } from '@/data/tripData';
import { Map as MapIcon, Navigation, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    L: any;
  }
}

export default function MapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [, setActiveLocation] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Wait for Leaflet to be available
    if (typeof window === 'undefined' || !window.L) return;

    const L = window.L;
    
    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 115],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: false
    });

    // Add zoom control to top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapRef.current = map;
    setMapLoaded(true);

    // Custom marker icon
    const createCustomIcon = (type: string) => {
      const colors: Record<string, string> = {
        airport: '#ff6a6a',
        hotel: '#4ecdc4',
        attraction: '#ffe66d',
        restaurant: '#ff6a6a',
        transport: '#c7c7c7'
      };
      
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pulse"></div>
          <div class="marker-core" style="background: ${colors[type] || '#ff6a6a'}"></div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
    };

    // Add markers
    const markers: any[] = [];
    allLocations.forEach((loc, index) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createCustomIcon(loc.type)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Montserrat, sans-serif; padding: 8px;">
          <p style="font-weight: 600; margin: 0 0 4px 0;">${loc.name}</p>
          <p style="font-size: 12px; color: #666; margin: 0;">第${loc.day}天</p>
        </div>
      `);

      marker.on('click', () => {
        setActiveLocation(index);
      });

      markers.push(marker);
    });

    // Draw route lines
    const baliLocations = allLocations.filter(l => l.lat < 0);
    const hkLocations = allLocations.filter(l => l.lat > 0);

    // Bali route
    if (baliLocations.length > 1) {
      const baliLatLngs = baliLocations.map(l => [l.lat, l.lng]);
      L.polyline(baliLatLngs, {
        color: '#ff6a6a',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
      }).addTo(map);
    }

    // HK route
    if (hkLocations.length > 1) {
      const hkLatLngs = hkLocations.map(l => [l.lat, l.lng]);
      L.polyline(hkLatLngs, {
        color: '#4ecdc4',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
      }).addTo(map);
    }

    // Flight path
    const dps = allLocations.find(l => l.name.includes('登巴萨'));
    const hkg = allLocations.find(l => l.name.includes('香港机场'));
    if (dps && hkg) {
      L.polyline([[dps.lat, dps.lng], [hkg.lat, hkg.lng]], {
        color: '#ff6a6a',
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 15'
      }).addTo(map);
    }

    // Fit bounds
    const allLatLngs = allLocations.map(l => [l.lat, l.lng]);
    map.fitBounds(allLatLngs, { padding: [50, 50] });

    return () => {
      map.remove();
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.map-title',
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

      gsap.fromTo(mapContainerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const locationGroups = [
    { type: 'airport', label: '机场', color: '#ff6a6a' },
    { type: 'hotel', label: '酒店', color: '#4ecdc4' },
    { type: 'attraction', label: '景点', color: '#ffe66d' },
    { type: 'transport', label: '交通', color: '#c7c7c7' }
  ];

  return (
    <section id="map" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f6] to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="map-title text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            行程<span className="text-[#4ecdc4]">路线</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            探索我们在巴厘岛和香港的完整行程路线，点击标记查看详情
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Map */}
          <div 
            ref={mapContainerRef}
            className="w-full h-[500px] lg:h-[600px] rounded-2xl shadow-2xl overflow-hidden"
            style={{ 
              transform: 'perspective(1000px) rotateX(2deg)',
              transformOrigin: 'center bottom'
            }}
          />

          {/* Loading State */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-4 border-[#ff6a6a] border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-600">加载地图中...</span>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapIcon className="w-5 h-5 text-[#ff6a6a]" />
              <span className="font-semibold text-sm">图例</span>
            </div>
            <div className="space-y-2">
              {locationGroups.map(group => (
                <div key={group.type} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: group.color }}
                  />
                  <span className="text-xs text-gray-600">{group.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Panel */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#ff6a6a]">{allLocations.length}</p>
                <p className="text-xs text-gray-600">地点</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4ecdc4]">2</p>
                <p className="text-xs text-gray-600">城市</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([-8.7, 115.2], 10);
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Navigation className="w-4 h-4 text-[#ff6a6a]" />
            <span className="text-sm font-medium">巴厘岛</span>
          </button>
          <button 
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([22.3, 114.17], 12);
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Navigation className="w-4 h-4 text-[#4ecdc4]" />
            <span className="text-sm font-medium">香港</span>
          </button>
          <button 
            onClick={() => {
              if (mapRef.current) {
                const allLatLngs = allLocations.map(l => [l.lat, l.lng]);
                mapRef.current.fitBounds(allLatLngs, { padding: [50, 50] });
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Layers className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">完整视图</span>
          </button>
        </div>
      </div>
    </section>
  );
}
