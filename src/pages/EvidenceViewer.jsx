import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEvidenceData } from '../data/mockEvidenceData';
import { ImageOverlay } from '../components/evidence/ImageOverlay';
import { FindingDetails } from '../components/evidence/FindingDetails';


export const EvidenceViewer = () => {
  const { imageUrl, findings } = mockEvidenceData;
  const [activeId, setActiveId] = useState(null);

  const handleSelect = (id) => {
    setActiveId(id);
  };

  return (
    <div className="evidence-viewer container mx-auto p-6 max-w-7xl space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-800 mb-4">Evidence Viewer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Image with overlay */}
        <div className="lg:col-span-8">
          <ImageOverlay
            src={imageUrl}
            regions={findings}
            activeRegionId={activeId}
            onRegionClick={(region) => setActiveId(region.id)}
          />
        </div>
        {/* Sidebar list of findings */}
        <div className="lg:col-span-4">
          <FindingDetails
            findings={findings}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div className="mt-4">
        <Link to="/results" className="text-sm font-medium text-cyan-600 hover:underline">
          ← Back to Results
        </Link>
      </div>
    </div>
  );
};
