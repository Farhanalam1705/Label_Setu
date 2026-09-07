import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, FileText, Shield, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';
import { useToast } from '../common/Toast';

export const InspectionRow = ({ inspection, onViewEvidence }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleViewReport = () => {
    setIsMenuOpen(false);
    if (inspection.hasReport) {
      navigate('/reports/generate');
    } else {
      addToast({
        title: 'Report Unavailable',
        message: 'Report is not available for this inspection.',
        type: 'info',
      });
    }
  };

  const handleViewEvidence = () => {
    setIsMenuOpen(false);
    if (onViewEvidence) {
      onViewEvidence(inspection);
    }
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 group text-xs">
      {/* Inspection ID */}
      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
        <button
          type="button"
          onClick={() => navigate(`/history/${inspection.inspectionId}`)}
          className="text-cyan-700 hover:text-cyan-900 hover:underline font-bold text-left cursor-pointer"
        >
          {inspection.inspectionId}
        </button>
      </td>

      {/* Product */}
      <td className="py-3.5 px-4">
        <div className="font-bold text-slate-900 text-xs">{inspection.productName}</div>
        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
          {inspection.manufacturer}
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
        <span className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded text-[11px] border border-slate-200">
          {inspection.category}
        </span>
      </td>

      {/* Date */}
      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-medium">
        {inspection.date}
      </td>

      {/* Officer */}
      <td className="py-3.5 px-4 text-slate-800 whitespace-nowrap font-semibold">
        {inspection.officer}
      </td>

      {/* Compliance */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <ConfidenceBadge confidence={inspection.complianceScore} showLabel={false} />
      </td>

      {/* Status */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <StatusBadge status={inspection.status} size="sm" />
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5 relative">
          <button
            type="button"
            onClick={() => navigate(`/history/${inspection.inspectionId}`)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Three dot dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/history/${inspection.inspectionId}`);
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleViewReport}
                  className="w-full px-3 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Report</span>
                </button>

                <button
                  type="button"
                  onClick={handleViewEvidence}
                  className="w-full px-3 py-1.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-600" />
                  <span>View Evidence</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};
