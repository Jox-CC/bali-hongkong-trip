import { useEffect, useRef, useState, useCallback } from 'react';
import { type DayData, attractionDetails } from '@/data/tripData';

interface MiniRouteMapProps {
  locations: DayData['locations'];
  day: number;
  onLocationClick: (name: string) => void;
}

// 地点类型颜色
const typeColors: Record<string, string> = {
  airport: '#ff6a6a',
  hotel: '#4ecdc4',
  attraction: '#ffe66d',
  transport: '#a0a0a0',
  restaurant: '#ff9f43'
};

export default function MiniRouteMap({ locations, onLocationClick }: MiniRouteMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const hoveredLocationRef = useRef<string | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // 使用IntersectionObserver检测可见性
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 绘制函数
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制深色背景
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // 绘制网格背景
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    if (locations.length < 2) return;

    // 计算地点的屏幕坐标 - 使用更大的padding确保不超出边界
    const paddingX = 70;  // 水平方向padding
    const paddingY = 60;  // 垂直方向padding
    const lats = locations.map(l => l.lat);
    const lngs = locations.map(l => l.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // 添加边距，让点更紧凑
    const latMargin = (maxLat - minLat) * 0.15 || 0.01;
    const lngMargin = (maxLng - minLng) * 0.15 || 0.01;
    
    const adjustedMinLat = minLat - latMargin;
    const adjustedMaxLat = maxLat + latMargin;
    const adjustedMinLng = minLng - lngMargin;
    const adjustedMaxLng = maxLng + lngMargin;

    const latRange = adjustedMaxLat - adjustedMinLat || 1;
    const lngRange = adjustedMaxLng - adjustedMinLng || 1;

    const getScreenPos = (lat: number, lng: number) => {
      const x = paddingX + ((lng - adjustedMinLng) / lngRange) * (width - 2 * paddingX);
      const y = height - paddingY - ((lat - adjustedMinLat) / latRange) * (height - 2 * paddingY);
      // 确保坐标在画布范围内
      return { 
        x: Math.max(paddingX, Math.min(width - paddingX, x)), 
        y: Math.max(paddingY, Math.min(height - paddingY, y)) 
      };
    };

    const points = locations.map(loc => getScreenPos(loc.lat, loc.lng));

    // 绘制路线（飞线效果）
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      const nextLoc = locations[i + 1];

      // 计算控制点（创建弧线效果）
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const offset = Math.abs(end.x - start.x) * 0.2;
      const controlX = midX;
      const controlY = midY - offset;

      // 绘制基础路线（暗色）
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制发光路线
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
      
      // 根据地点类型选择颜色
      const color = typeColors[nextLoc?.type] || '#ff6a6a';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 绘制流动效果（虚线动画）
      const dashOffset = -Date.now() / 20;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 10]);
      ctx.lineDashOffset = dashOffset;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 绘制移动的光点
    if (isPlaying && isVisible) {
      progressRef.current += 0.005 * speed;
      if (progressRef.current >= points.length - 1) {
        progressRef.current = 0;
      }
    }

    const currentIndex = Math.floor(progressRef.current);
    const nextIndex = Math.min(currentIndex + 1, points.length - 1);
    const segmentProgress = progressRef.current - currentIndex;

    if (currentIndex < points.length - 1) {
      const start = points[currentIndex];
      const end = points[nextIndex];
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const offset = Math.abs(end.x - start.x) * 0.2;
      const controlX = midX;
      const controlY = midY - offset;

      // 二次贝塞尔曲线插值
      const t = segmentProgress;
      const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * controlX + t * t * end.x;
      const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * controlY + t * t * end.y;

      // 绘制光点
      const currentLoc = locations[nextIndex];
      const color = typeColors[currentLoc?.type] || '#ff6a6a';
      
      // 光晕
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, `${color}80`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();

      // 核心光点
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // 绘制当前地点名称
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentLoc?.name || '', x, y - 20);
    }

    // 绘制地点标记
    points.forEach((point, i) => {
      const loc = locations[i];
      const color = typeColors[loc.type] || '#ff6a6a';
      const isHovered = hoveredLocationRef.current === loc.name;


      // 脉冲效果
      const pulseSize = isHovered ? 20 : 12;
      const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pulseSize);
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // 标记点
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, isHovered ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();

      // 白色边框
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, isHovered ? 8 : 6, 0, Math.PI * 2);
      ctx.stroke();

      // 地点名称（始终显示）
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(loc.name.substring(0, 6), point.x, point.y + 18);
    });

    // 绘制悬停提示
    if (hoveredLocationRef.current) {
      const locIndex = locations.findIndex(l => l.name === hoveredLocationRef.current);
      if (locIndex >= 0) {
        const point = points[locIndex];
        const detail = attractionDetails[hoveredLocationRef.current];
        if (detail) {
          const tooltipWidth = 180;
          const tooltipHeight = 50;
          const tooltipX = Math.min(Math.max(point.x - tooltipWidth / 2, 10), width - tooltipWidth - 10);
          const tooltipY = point.y - tooltipHeight - 15;

          // 提示框背景
          ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
          ctx.beginPath();
          ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
          ctx.fill();

          // 提示框文字
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(hoveredLocationRef.current.substring(0, 12), tooltipX + 10, tooltipY + 18);
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '10px sans-serif';
          const desc = detail.description.substring(0, 30);
          ctx.fillText(desc + '...', tooltipX + 10, tooltipY + 35);
        }
      }
    }
  }, [locations, isPlaying, speed, isVisible]);

  // 动画循环
  useEffect(() => {
    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    // 检查是否悬停在某个地点上 - 使用与绘制相同的坐标计算
    const paddingX = 70;
    const paddingY = 60;
    const lats = locations.map(l => l.lat);
    const lngs = locations.map(l => l.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const latMargin = (maxLat - minLat) * 0.15 || 0.01;
    const lngMargin = (maxLng - minLng) * 0.15 || 0.01;
    const adjustedMinLat = minLat - latMargin;
    const adjustedMaxLat = maxLat + latMargin;
    const adjustedMinLng = minLng - lngMargin;
    const adjustedMaxLng = maxLng + lngMargin;
    
    const latRange = adjustedMaxLat - adjustedMinLat || 1;
    const lngRange = adjustedMaxLng - adjustedMinLng || 1;

    let found = false;
    locations.forEach(loc => {
      const px = paddingX + ((loc.lng - adjustedMinLng) / lngRange) * (canvas.width - 2 * paddingX);
      const py = canvas.height - paddingY - ((loc.lat - adjustedMinLat) / latRange) * (canvas.height - 2 * paddingY);
      const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      
      if (distance < 15) {
        hoveredLocationRef.current = loc.name;
        found = true;
      }
    });

    if (!found) {
      hoveredLocationRef.current = null;
    }
  };

  // 处理点击
  const handleClick = () => {
    if (hoveredLocationRef.current) {
      onLocationClick(hoveredLocationRef.current);
    }
  };

  // 设置画布大小
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={() => { hoveredLocationRef.current = null; }}
      />
      
      {/* 控制按钮 */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-sm rounded-lg p-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-sm transition-colors"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-xs">速度</span>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <button
          onClick={() => { progressRef.current = 0; }}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-sm transition-colors"
        >
          ↺
        </button>
      </div>

      {/* 地点数量指示 */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-white/80 text-xs">{locations.length} 个地点</span>
      </div>
    </div>
  );
}
