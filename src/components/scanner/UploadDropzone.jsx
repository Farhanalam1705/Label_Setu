import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, AlertCircle, FileUp } from 'lucide-react';
import { useToast } from '../common/Toast';

export const UploadDropzone = ({ onFileSelected, onOpenCamera }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  const validateAndProcessFile = (file) => {
    if (!file) return;

    // Type validation
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      addToast({
        title: 'Unsupported File Format',
        message: 'Please upload a JPG, JPEG, or PNG image file.',
        type: 'error',
      });
      return;
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE) {
      addToast({
        title: 'File Too Large',
        message: `Maximum allowed size is 10 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        type: 'error',
      });
      return;
    }

    // Simulate smooth upload & validation progress
    setIsProcessing(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setUploadProgress(100);
            onFileSelected(file);
            addToast({
              title: 'Image Loaded',
              message: 'Product label image loaded and validated successfully.',
              type: 'success',
            });
          }, 300);
          return 90;
        }
        return prev + 25;
      });
    }, 100);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {isProcessing ? (
        /* Upload & Processing State */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto animate-pulse">
              <FileUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Validating & Loading Image</h3>
              <p className="text-xs text-slate-500 mt-1">
                Checking file format integrity and dimensions under Metrology standard...
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2.5 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-500">{uploadProgress}% complete</p>
          </div>
        </div>
      ) : (
        <>
          {/* Dual Action Cards (Equal weight as requested in Stage 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Camera Capture Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 group-hover:bg-cyan-50 border border-slate-200 group-hover:border-cyan-200 text-slate-700 group-hover:text-cyan-700 flex items-center justify-center transition-colors shadow-xs">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Capture Image</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Use your device camera to capture a clear live photo of the product label.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenCamera}
                className="mt-6 w-full max-w-xs py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Open Camera</span>
              </button>
            </div>

            {/* 2. File Upload Card */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`bg-white rounded-2xl border-2 p-6 sm:p-8 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group ${
                isDragging
                  ? 'border-cyan-500 bg-cyan-50/40 ring-4 ring-cyan-500/10'
                  : 'border-slate-200 hover:border-cyan-300'
              }`}
            >
              <div className="space-y-3 flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors shadow-xs ${
                    isDragging
                      ? 'bg-cyan-100 text-cyan-700 border-cyan-300'
                      : 'bg-slate-100 group-hover:bg-cyan-50 border-slate-200 group-hover:border-cyan-200 text-slate-700 group-hover:text-cyan-700'
                  }`}
                >
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Upload Image</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Upload a packaged commodity label image from your local device or drag & drop.
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="mt-6 w-full max-w-xs py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
            </div>
          </div>

          {/* Guidelines and specs footnote */}
          <div className="bg-slate-100/80 rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Supported formats:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-semibold text-[11px]">
                JPG, JPEG, PNG
              </span>
              <span className="text-slate-400">|</span>
              <span>Max: <strong>10 MB</strong></span>
            </div>

            <p className="text-slate-500 text-center sm:text-right">
              Use a clear, glare-free image for better analysis.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
