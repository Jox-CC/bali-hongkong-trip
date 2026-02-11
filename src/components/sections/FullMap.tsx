import { useEffect, useRef, useState, useCallback } from 'react';
import { allLocations, attractionDetails, tripData } from '@/data/tripData';
import { Map as MapIcon, Play, Pause, RotateCcw } from 'lucide-react';
import AttractionModal from '../AttractionModal';

// 地点类型颜色
const typeColors: Record<string, string> = {
  airport: '#ff6a6a',
  hotel: '#4ecdc4',
  attraction: '#ffe66d',
  transport: '#9b59b6',
  restaurant: '#e74c3c',
};

// 将经纬度转换为画布坐标
function latLngToCanvas(lat: number, lng: number, width: number, height: number) {
  // 巴厘岛区域大致范围
  const minLat = -9.0;
  const maxLat = -8.5;
  const minLng = 114.5;
  const maxLng = 116.0;
  
  // 香港区域
  const hkMinLat = 22.2;
  const hkMaxLat = 22.4;
  const hkMinLng = 113.9;
  const hkMaxLng = 114.3;
  
  // 上海区域
  const shMinLat = 31.0;
  const shMaxLat = 31.3;
  const shMinLng = 121.5;
  const shMaxLng = 122.0;
  
  let x, y;
  
  if (lat > 0) {
    // 北半球（上海、香港）
    if (lng > 120) {
      // 上海 - 放在右上角
      x = width * 0.85 + ((lng - shMinLng) / (shMaxLng - shMinLng)) * width * 0.12;
      y = height * 0.15 + ((shMaxLat - lat) / (shMaxLat - shMinLat)) * height * 0.15;
    } else {
      // 香港 - 放在中上
      x = width * 0.70 + ((lng - hkMinLng) / (hkMaxLng - hkMinLng)) * width * 0.12;
      y = height * 0.25 + ((hkMaxLat - lat) / (hkMaxLat - hkMinLat)) * height * 0.15;
    }
  } else {
    // 巴厘岛 - 放在下方中央
    x = width * 0.35 + ((lng - minLng) / (maxLng - minLng)) * width * 0.45;
    y = height * 0.45 + ((maxLat - lat) / (maxLat - minLat)) * height * 0.50;
  }
  
  return { x, y };
}

// 生成路线
function generateRoutes() {
  const routes: { from: string; to: string; color: string; day: number }[] = [];
  
  tripData.forEach((day) => {
    const dayLocations = day.locations;
    for (let i = 0; i < dayLocations.length - 1; i++) {
      const from = dayLocations[i];
      const to = dayLocations[i + 1];
      
      // 根据类型确定颜色
      let color = '#4ecdc4'; // 默认汽车绿色
      if (from.type === 'airport' || to.type === 'airport') {
        color = '#ff6a6a'; // 飞机红色
      } else if (from.type === 'transport' || to.type === 'transport') {
        color = '#9b59b6'; // 船紫色
      }
      
      routes.push({
        from: from.name,
        to: to.name,
        color,
        day: day.day,
      });
    }
  });
  
  return routes;
}

export default function FullMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(2);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const routes = generateRoutes();
  const progressRef = useRef(0);
  const currentRouteIndexRef = useRef(0);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 绘制地图背景
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 深色背景
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制网格
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // 绘制区域标签和光晕
    const regions = [
      { name: '上海', x: 0.88, y: 0.18, color: '#ff6a6a' },
      { name: '香港', x: 0.75, y: 0.28, color: '#4ecdc4' },
      { name: '巴厘岛', x: 0.55, y: 0.65, color: '#ffe66d' },
    ];
    
    regions.forEach((region) => {
      const rx = region.x * width;
      const ry = region.y * height;
      
      // 光晕
      const gradient = ctx.createRadialGradient(rx, ry, 0, rx, ry, 100);
      gradient.addColorStop(0, region.color + '15');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(rx, ry, 100, 0, Math.PI * 2);
      ctx.fill();
      
      // 标签
      ctx.font = 'bold 16px Montserrat, sans-serif';
      ctx.fillStyle = region.color + '60';
      ctx.textAlign = 'center';
      ctx.fillText(region.name, rx, ry);
    });
  }, []);

  // 绘制地点
  const drawLocation = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, loc: typeof allLocations[0], isHovered: boolean) => {
    const color = typeColors[loc.type] || '#fff';
    
    // 脉冲效果
    const pulseRadius = 10 + Math.sin(Date.now() / 300) * 3;
    ctx.strokeStyle = color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // 外圈光晕（hover时）
    if (isHovered) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
      gradient.addColorStop(0, color + '50');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 主圆点
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    
    // 白色边框
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.stroke();
    
    // 名称（hover时显示）
    if (isHovered) {
      ctx.font = '12px Montserrat, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(loc.name, x, y + 22);
    }
  }, []);

  // 绘制路线
  const drawRoute = useCallback((ctx: CanvasRenderingContext2D, from: { x: number; y: number }, to: { x: number; y: number }, color: string, progress: number) => {
    // 计算控制点（创建弧线效果）
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // 弧线弯曲程度
    const curveAmount = Math.min(dist * 0.3, 80);
    const controlX = midX - dy / dist * curveAmount;
    const controlY = midY + dx / dist * curveAmount;
    
    // 绘制完整路线（虚线）
    ctx.strokeStyle = color + '30';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(controlX, controlY, to.x, to.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 绘制已走过的路线
    if (progress > 0) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      
      // 计算贝塞尔曲线上的点
      const t = progress;
      const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * controlX + t * t * to.x;
      const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * controlY + t * t * to.y;
      
      // 分段绘制
      const segments = 20;
      for (let i = 1; i <= Math.floor(t * segments); i++) {
        const st = i / segments;
        const sx = (1 - st) * (1 - st) * from.x + 2 * (1 - st) * st * controlX + st * st * to.x;
        const sy = (1 - st) * (1 - st) * from.y + 2 * (1 - st) * st * controlY + st * st * to.y;
        ctx.lineTo(sx, sy);
      }
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // 绘制移动的光点
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color + '80');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // 中心白点
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // 动画循环
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // 绘制背景
    drawBackground(ctx, width, height);
    
    // 绘制所有路线
    routes.forEach((route, index) => {
      const fromLoc = allLocations.find(l => l.name === route.from);
      const toLoc = allLocations.find(l => l.name === route.to);
      
      if (fromLoc && toLoc) {
        const from = latLngToCanvas(fromLoc.lat, fromLoc.lng, width, height);
        const to = latLngToCanvas(toLoc.lat, toLoc.lng, width, height);
        
        // 当前路线或已完成路线
        if (index < currentRouteIndexRef.current) {
          drawRoute(ctx, from, to, route.color, 1);
        } else if (index === currentRouteIndexRef.current) {
          drawRoute(ctx, from, to, route.color, progressRef.current);
        }
      }
    });
    
    // 绘制所有地点
    allLocations.forEach((loc) => {
      const pos = latLngToCanvas(loc.lat, loc.lng, width, height);
      const isHovered = hoveredLocation === loc.name;
      drawLocation(ctx, pos.x, pos.y, loc, isHovered);
    });
    
    // 更新进度
    if (isPlaying && isVisible) {
      progressRef.current += speed * 0.003;
      
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        currentRouteIndexRef.current = (currentRouteIndexRef.current + 1) % routes.length;
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, isVisible, speed, hoveredLocation, routes, drawBackground, drawLocation, drawRoute]);

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 检查是否悬停在某个地点上
    let found = null;
    for (const loc of allLocations) {
      const pos = latLngToCanvas(loc.lat, loc.lng, canvas.width, canvas.height);
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < 15) {
        found = loc.name;
        break;
      }
    }
    setHoveredLocation(found);
  };

  // 处理点击
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 检查是否点击了某个地点
    for (const loc of allLocations) {
      const pos = latLngToCanvas(loc.lat, loc.lng, canvas.width, canvas.height);
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < 15 && attractionDetails[loc.name]) {
        setSelectedLocation(loc.name);
        break;
      }
    }
  };

  return (
    <>
      <section id="full-map" ref={sectionRef} className="py-20 lg:py-32 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              完整<span className="text-[#4ecdc4]">路线图</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              探索六天行程的完整路线，点击标记查看景点详情
            </p>
          </div>

          {/* Animated Map */}
          <div className={`relative bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* 标题栏 */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapIcon className="w-5 h-5 text-[#ff6a6a]" />
                  <span className="text-white font-semibold">行程动画</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      progressRef.current = 0;
                      currentRouteIndexRef.current = 0;
                    }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full cursor-pointer"
              style={{ minHeight: '500px', height: '60vh' }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            />
            
            {/* 控制栏 */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between flex-wrap gap-3">
                {/* 速度控制 */}
                <div className="flex items-center space-x-3">
                  <span className="text-white/60 text-sm">速度</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-24 accent-[#ff6a6a]"
                  />
                  <span className="text-white text-sm w-6">{speed}x</span>
                </div>
                
                {/* 图例 */}
                <div className="flex items-center space-x-4 text-xs">
                  {Object.entries(typeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full" style={{ background: color }}></span>
                      <span className="text-white/60">
                        {type === 'airport' ? '机场' : type === 'hotel' ? '酒店' : type === 'attraction' ? '景点' : type === 'transport' ? '交通' : '餐饮'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { label: '地点', value: allLocations.length, color: '#ff6a6a' },
              { label: '城市', value: 2, color: '#4ecdc4' },
              { label: '天数', value: 6, color: '#ffe66d' },
              { label: '路线段', value: routes.length, color: '#9b59b6' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
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
