import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Scan, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProductImageViewer = ({
  imageSrc = null,
  regions = [],
  activeRegionId = null,
  onRegionClick = null,
}) => {
  const { t } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showRegions, setShowRegions] = useState(true);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Color mapping for bounding box border and badge based on status
  const getRegionStyle = (region) => {
    const isSelected = activeRegionId === region.id;
    if (region.status === 'COMPLIANT') {
      return {
        border: isSelected ? 'border-2 border-emerald-500 bg-emerald-500/15' : 'border border-emerald-500/80 bg-emerald-500/10 hover:bg-emerald-500/20',
        badge: 'bg-emerald-600 text-white',
      };
    } else if (region.status === 'NON-COMPLIANT') {
      return {
        border: isSelected ? 'border-2 border-rose-500 bg-rose-500/20' : 'border border-rose-500/80 bg-rose-500/10 hover:bg-rose-500/20',
        badge: 'bg-rose-600 text-white',
      };
    } else {
      return {
        border: isSelected ? 'border-2 border-amber-500 bg-amber-500/20' : 'border border-amber-500/80 bg-amber-500/10 hover:bg-amber-500/20',
        badge: 'bg-amber-600 text-white',
      };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* Top Header & Interactive Controls */}
      <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/80">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            {t('scannedCommodityEvidence', 'Scanned Commodity & Evidence')}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5">
          {/* Toggle Region Highlights */}
          <button
            type="button"
            onClick={() => setShowRegions(!showRegions)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${
              showRegions
                ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Detected Regions Overlay"
          >
            {showRegions ? <Eye className="w-3 h-3 text-cyan-600" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
            <span>{showRegions ? t('labelsOn', 'Labels On') : t('labelsOff', 'Labels Off')}</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5"></div>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.75}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
            title={t('zoomOut', 'Zoom Out')}
            aria-label={t('zoomOut', 'Zoom Out')}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Percentage */}
          <span className="text-[11px] font-mono font-semibold text-slate-500 px-1 min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2.5}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
            title={t('zoomIn', 'Zoom In')}
            aria-label={t('zoomIn', 'Zoom In')}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Reset Zoom */}
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs ml-0.5 cursor-pointer"
            title={t('resetZoom', 'Reset Zoom')}
            aria-label={t('resetZoom', 'Reset Zoom')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Bounding Boxes */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col items-center justify-center bg-slate-950/95 overflow-hidden min-h-[380px] max-h-[500px] relative select-none">
        <div
          className="relative transition-transform duration-200 ease-out origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {imageSrc ? (
            /* Uploaded Image from Scanner / Processing */
            <img
              src={imageSrc}
              alt={t('scannedCommodityEvidence', 'Scanned Packaged Commodity')}
              className="max-h-[420px] w-auto max-w-full object-contain rounded-md shadow-lg"
            />
          ) : (
            /* Realistic Mock Packaged Commodity Package (Rice Brand Label) */
            <div className="w-[320px] sm:w-[360px] h-[420px] bg-gradient-to-b from-amber-50 via-white to-amber-50/80 rounded-xl border-2 border-slate-300 shadow-2xl p-6 flex flex-col justify-between text-slate-900 font-sans relative overflow-hidden">
              {/* Product Header & Brand */}
              <div className="text-center space-y-1 border-b pb-3 border-amber-200">
                <div className="inline-block px-2.5 py-0.5 bg-amber-700 text-white text-[10px] font-bold rounded-sm tracking-wider uppercase">
                  Premium Quality Grains
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900 pt-1">
                  ABC PREMIUM RICE
                </h3>
                <p className="text-[11px] text-slate-600 font-medium italic">
                  Aged Indian Basmati Rice • Traditional Harvest
                </p>
              </div>

              {/* Manufacturer / Packer Details */}
              <div className="p-2.5 bg-slate-50/90 rounded-md border border-slate-200 text-[10px] text-slate-700 space-y-0.5">
                <p className="font-bold text-slate-800">
                  Manufactured & Packed by:
                </p>
                <p>ABC Foods Pvt. Ltd., Plot 42-B, Industrial Area Phase-II,</p>
                <p>New Delhi - 110020, India. Lic. No. 10018011000234</p>
              </div>

              {/* Net Quantity & Date Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 bg-amber-100/60 rounded-md border border-amber-200">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">
                    {t('netQuantity', 'Net Quantity')}
                  </span>
                  <strong className="text-sm font-black text-slate-900 font-mono">
                    5 kg
                  </strong>
                </div>

                <div className="p-2 bg-slate-50 rounded-md border border-slate-200">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">
                    Packed Date
                  </span>
                  <strong className="text-xs font-bold text-slate-800 font-mono">
                    08/2026
                  </strong>
                </div>
              </div>

              {/* MRP & Consumer Care */}
              <div className="p-2.5 bg-amber-100/30 rounded-md border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">
                    {t('maximumRetailPrice', 'MRP (incl. of all taxes)')}
                  </span>
                  <strong className="text-base font-black text-slate-900 font-mono">
                    ₹520.00
                  </strong>
                </div>
                <div className="text-right text-[10px] text-slate-600">
                  <p className="font-bold text-slate-700">Consumer Care:</p>
                  <p>care@abcfoods.in</p>
                </div>
              </div>
            </div>
          )}

          {/* Bounding Box Highlights (Subtle and clean, not futuristic) */}
          {showRegions &&
            regions.map((region) => {
              const style = getRegionStyle(region);
              return (
                <div
                  key={region.id}
                  onClick={() => onRegionClick && onRegionClick(region)}
                  className={`absolute rounded transition-all cursor-pointer group/box ${style.border}`}
                  style={{
                    top: `${region.top}%`,
                    left: `${region.left}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`,
                  }}
                  title={`${region.field}: ${region.extractedText} (${region.status}) - Click to inspect`}
                >
                  {/* Tag label on top of box */}
                  <div
                    className={`absolute -top-3.5 left-0 px-1.5 py-0.2 rounded text-[9px] font-bold font-mono tracking-tight whitespace-nowrap shadow-xs pointer-events-none ${style.badge}`}
                  >
                    {region.label}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer Info & Legend */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="font-semibold text-slate-700">{t('regionLegend', 'Region Legend')}:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-xs bg-emerald-500"></span> {t('compliant', 'Compliant')}
          </span>
          <span className="inline-flex items-center gap-1 text-amber-700">
            <span className="w-2 h-2 rounded-xs bg-amber-500"></span> {t('needsReview', 'Needs Review')}
          </span>
          <span className="inline-flex items-center gap-1 text-rose-700">
            <span className="w-2 h-2 rounded-xs bg-rose-500"></span> {t('nonCompliant', 'Non-Compliant')}
          </span>
        </div>

        <p className="text-[10px] text-slate-400">
          {t('clickHighlightedBoxMsg', 'Click any highlighted box to inspect evidence snippet.')}
        </p>
      </div>
    </div>
  );
};
