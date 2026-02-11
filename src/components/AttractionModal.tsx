import { useEffect, useState } from 'react';
import { X, MapPin, Lightbulb } from 'lucide-react';
import { attractionDetails } from '@/data/tripData';

interface AttractionModalProps {
  locationName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AttractionModal({ locationName, isOpen, onClose }: AttractionModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const detail = attractionDetails[locationName];
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  if (!isOpen || !detail) return null;
  
  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ${isClosing ? 'opacity-0 scale-95 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={detail.image}
            alt={locationName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/day1-airport.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Title on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center space-x-2 text-white/70 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">景点介绍</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{locationName}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[40vh]">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">简介</h3>
            <p className="text-gray-600 leading-relaxed">{detail.description}</p>
          </div>
          
          {/* Tips */}
          {detail.tips && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="flex items-center space-x-2 text-amber-600 mb-2">
                <Lightbulb className="w-5 h-5" />
                <span className="font-semibold">旅行小贴士</span>
              </div>
              <p className="text-amber-700 text-sm">{detail.tips}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
