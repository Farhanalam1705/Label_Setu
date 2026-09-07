import React from 'react';

// Expected region object: { id, label, description, bounds: { x, y, width, height } }
export const ImageOverlay = ({ src, regions = [], activeRegionId, onRegionClick }) => {
  return (
    <div className="relative bg-slate-100 rounded-xl overflow-hidden border border-slate-300 p-2">
      {src ? (
        <img src={src} alt="Evidence" className="w-full h-auto object-contain" />
      ) : (
        <div className="flex items-center justify-center h-64 text-slate-500">
          No image available
        </div>
      )}
      {/* Overlay boxes */}
      {regions.map((region) => (
        <div
          key={region.id}
          className={`absolute border-2 rounded transition-all duration-200 ${region.id === activeRegionId ? 'border-cyan-500 bg-cyan-500/20' : 'border-orange-400 bg-orange-400/15'} cursor-pointer`}
          style={{
            left: `${region.bounds.x}px`,
            top: `${region.bounds.y}px`,
            width: `${region.bounds.width}px`,
            height: `${region.bounds.height}px`,
          }}
          onClick={() => onRegionClick(region)}
        >
          <span className="absolute -top-4 left-0 text-xs font-mono bg-slate-800 text-cyan-200 px-1 rounded">
            {region.label}
          </span>
        </div>
      ))}
    </div>
  );
};
