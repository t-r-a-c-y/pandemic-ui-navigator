
import React from 'react';
import { MapPin } from 'lucide-react';

const MapView: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden relative bg-pandemic-blue/5">
      {/* This would be replaced with an actual map like Google Maps or Mapbox */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.5,40,9,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2MzZnNoNTcwOWd3MnJudWVnbTBkOG5sIn0.example')] bg-cover bg-center opacity-60"></div>
      
      {/* Map overlay with risk zones */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-pandemic-red/20 animate-pulse-slow"></div>
      <div className="absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-pandemic-yellow/20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-pandemic-green/20 animate-pulse-slow"></div>
      
      {/* User location */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-8 h-8 bg-pandemic-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <div className="w-16 h-16 bg-pandemic-blue/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-xl font-medium">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-xl font-medium">-</span>
        </button>
      </div>
      
      {/* Risk legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="text-xs font-medium mb-2">Risk Levels</div>
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 bg-pandemic-red rounded-full"></div>
          <span className="text-xs">High</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 bg-pandemic-yellow rounded-full"></div>
          <span className="text-xs">Moderate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pandemic-green rounded-full"></div>
          <span className="text-xs">Low</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
