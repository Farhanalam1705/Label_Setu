import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export const CameraModal = ({ isOpen, onClose, onCapture }) => {
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // default to back camera
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported on this browser or device.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError(
        err.message || 'Unable to access camera. Please verify permissions or use file upload.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const timestamp = new Date().getTime();
          const file = new File([blob], `label-capture-${timestamp}.jpg`, {
            type: 'image/jpeg',
          });
          stopCamera();
          onCapture(file);
          onClose();
        }
        setIsCapturing(false);
      },
      'image/jpeg',
      0.95
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-4 px-5 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Capture Product Label</h3>
              <p className="text-[11px] text-slate-400">Position the commodity label within the alignment frame</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative bg-black flex items-center justify-center min-h-[360px] max-h-[500px] overflow-hidden">
          {cameraError ? (
            <div className="p-8 text-center max-w-md">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <p className="text-sm font-semibold text-rose-300 mb-1">Camera Access Restricted</p>
              <p className="text-xs text-slate-400 mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              >
                Retry Access
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover max-h-[460px]"
              />

              {/* Viewfinder Guide Overlay */}
              <div className="absolute inset-8 sm:inset-12 border-2 border-cyan-400/60 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                {/* Corner Accents */}
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-cyan-300"></div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-cyan-300"></div>
                </div>

                <div className="text-center">
                  <span className="text-[11px] font-medium bg-slate-900/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-xs">
                    Align MRP, Net Quantity & Manufacturer Label
                  </span>
                </div>

                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-cyan-300"></div>
                  <div className="w-4 h-4 border-b-2 border-r-2 border-cyan-300"></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={toggleFacingMode}
            disabled={Boolean(cameraError)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch Camera</span>
          </button>

          <button
            onClick={takeSnapshot}
            disabled={Boolean(cameraError) || isCapturing}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-900/40 transition-all active:scale-95 disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>{isCapturing ? 'Capturing...' : 'Capture Image'}</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
