/**
 * OCEANEYE - Satellite SAR Oil Spill Detection Studio
 * Multi-step AI inference pipeline (Preprocessing, Speckle Reduction, Deep U-Net Segmentation, Characterization)
 */

import React, { useState } from 'react';
import { Incident } from '../../types';
import {
  Radar,
  Upload,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  Maximize2,
  Info
} from 'lucide-react';

interface DetectionStudioProps {
  currentIncident: Incident;
  onNavigateToDrift: () => void;
}

export const DetectionStudio: React.FC<DetectionStudioProps> = ({
  currentIncident,
  onNavigateToDrift
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedSensor, setSelectedSensor] = useState<string>('SENTINEL_1_SAR');
  const [viewMode, setViewMode] = useState<'original' | 'speckle' | 'mask' | 'fused'>('fused');
  const [detectionConfidence, setDetectionConfidence] = useState<number>(currentIncident.detectionConfidence);
  const [sensitivityThreshold, setSensitivityThreshold] = useState<number>(0.75);

  const processingSteps = [
    { label: 'Ingesting Satellite SAR Scene', sub: 'Calibrating sigma-nought (σ₀) backscatter matrix' },
    { label: 'Radiometric Preprocessing', sub: 'Applying orbital vectors & terrain georeferencing' },
    { label: 'Lee Speckle Noise Filtering', sub: 'Spatial adaptive windowing for sea clutter reduction' },
    { label: 'CFAR & Deep U-Net Inference', sub: 'Dual-polarization (VV/VH) semantic feature extraction' },
    { label: 'Biogenic Look-alike Rejection', sub: 'Discriminating low-wind zero-backscatter & natural slicks' },
    { label: 'Slick Polygonization & Metrics', sub: 'Calculating geometry, orientation, thickness & volume' },
  ];

  const handleRunInference = () => {
    setIsProcessing(true);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < processingSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setDetectionConfidence(Math.round(88 + Math.random() * 8));
      }
    }, 450);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <Radar className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                Satellite SAR AI Oil Spill Detection
              </h1>
              <p className="text-xs text-neutral-400">
                Automated segmentation and characterization from Sentinel-1 Synthetic Aperture Radar
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="run-ai-inference-btn"
            disabled={isProcessing}
            onClick={handleRunInference}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all ${
              isProcessing
                ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed border border-neutral-800'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
            }`}
          >
            {isProcessing ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Processing Pipeline ({currentStep + 1}/6)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run AI Detection Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress pipeline banner if running */}
      {isProcessing && (
        <div className="bento-card p-5 space-y-3 animate-in fade-in duration-200 border-cyan-500/40">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-cyan-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin" />
              Executing Stage {currentStep + 1} of {processingSteps.length}: {processingSteps[currentStep].label}
            </span>
            <span className="text-neutral-400 font-mono">{Math.round(((currentStep + 1) / processingSteps.length) * 100)}%</span>
          </div>

          <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
            />
          </div>

          <p className="text-[11px] text-neutral-400 italic">{processingSteps[currentStep].sub}</p>
        </div>
      )}

      {/* Main Studio Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Ingestion Controls & Sensor Configuration Bento Tile */}
        <div className="lg:col-span-4 space-y-5">
          {/* Satellite Scene Ingestion Card */}
          <div className="bento-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              1. Satellite Scene Ingestion
            </h3>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-neutral-400">Sensor Platform</label>
              <select
                id="satellite-sensor-select"
                value={selectedSensor}
                onChange={e => setSelectedSensor(e.target.value)}
                className="w-full bg-black/70 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 outline-none"
              >
                <option value="SENTINEL_1_SAR">Sentinel-1C C-Band SAR (10m Resolution)</option>
                <option value="SENTINEL_2_MSI">Sentinel-2B Optical Multi-spectral (10m)</option>
                <option value="RADARSAT_2">RADARSAT-2 High-Res C-Band (8m)</option>
              </select>
            </div>

            {/* Scene Metadata Preview */}
            <div className="bg-black/60 border border-neutral-800/80 p-3.5 rounded-2xl text-xs space-y-2 font-mono text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Scene ID:</span>
                <span className="text-cyan-400 truncate max-w-[170px]">{currentIncident.satellite.sceneId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Acquisition:</span>
                <span>{new Date(currentIncident.satellite.acquisitionTime).toUTCString().slice(5, 22)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Polarization:</span>
                <span className="text-white">{currentIncident.satellite.polarization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Orbit Pass:</span>
                <span>{currentIncident.satellite.orbitPass}</span>
              </div>
            </div>

            {/* Dropzone Upload */}
            <div className="border-2 border-dashed border-neutral-800 hover:border-cyan-500/60 p-5 rounded-2xl text-center space-y-1.5 transition-all cursor-pointer bg-neutral-950/40">
              <Upload className="w-5 h-5 text-neutral-400 mx-auto" />
              <div className="text-xs font-semibold text-neutral-200">Upload Custom GeoTIFF / SAR Scene</div>
              <div className="text-[10px] text-neutral-400">Supports Sentinel SAFE, GeoTIFF, PNG (Max 150MB)</div>
            </div>
          </div>

          {/* AI Model Hyperparameters & Thresholds */}
          <div className="bento-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              2. Detection Tuning & Thresholds
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">CFAR Adaptive Sensitivity</span>
                <span className="text-cyan-400 font-mono font-bold">{sensitivityThreshold * 100}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={sensitivityThreshold}
                onChange={e => setSensitivityThreshold(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="pt-2.5 border-t border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Look-alike Filtering:</span>
                <span className="text-emerald-400 font-semibold">Active (Biogenic/Low-Wind)</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>Model Architecture:</span>
                <span className="text-white font-semibold">DeepLabV3+ / U-Net (ResNet-50)</span>
              </div>
            </div>
          </div>

          {/* Next Step Link */}
          <button
            onClick={onNavigateToDrift}
            className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Drift Hindcasting</span>
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right 8 Cols: Visual Comparison & Characterization Bento Tile */}
        <div className="lg:col-span-8 space-y-5">
          {/* Visual Canvas Display */}
          <div className="bento-card overflow-hidden shadow-xl space-y-0">
            {/* View Mode Bar */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  SAR Inspection Viewer
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">10m Ground Resolution</span>
              </div>

              {/* View Switchers */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setViewMode('original')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    viewMode === 'original' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Raw SAR Backscatter
                </button>
                <button
                  onClick={() => setViewMode('speckle')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    viewMode === 'speckle' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Lee Filtered
                </button>
                <button
                  onClick={() => setViewMode('mask')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    viewMode === 'mask' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  AI U-Net Mask
                </button>
                <button
                  onClick={() => setViewMode('fused')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    viewMode === 'fused' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Fused Overlay
                </button>
              </div>
            </div>

            {/* Visual Screen Simulation Canvas */}
            <div className="relative h-[380px] bg-black flex items-center justify-center overflow-hidden">
              {/* Synthetic SAR Representation */}
              <div className="absolute inset-0 bg-black opacity-90">
                <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <defs>
                    <radialGradient id="sarGlow" cx="45%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#18181b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
                    </radialGradient>
                    <pattern id="sarTexture" width="6" height="6" patternUnits="userSpaceOnUse">
                      <rect width="6" height="6" fill="#09090b" />
                      <circle cx="2" cy="2" r="0.8" fill="#18181b" opacity="0.6" />
                      <circle cx="5" cy="5" r="0.6" fill="#27272a" opacity="0.4" />
                    </pattern>
                  </defs>

                  {/* Ocean Surface Texture */}
                  <rect width="100%" height="100%" fill="url(#sarTexture)" />
                  <rect width="100%" height="100%" fill="url(#sarGlow)" />

                  {/* Low backscatter dark patch (Oil Slick) */}
                  <path
                    d="M 280,140 Q 380,100 490,130 Q 560,160 520,230 Q 450,290 350,260 Q 250,230 280,140 Z"
                    fill={
                      viewMode === 'original'
                        ? '#05070c'
                        : viewMode === 'speckle'
                          ? '#020408'
                          : viewMode === 'mask'
                            ? '#f43f5e'
                            : '#881337'
                    }
                    fillOpacity={viewMode === 'mask' ? 0.9 : viewMode === 'fused' ? 0.65 : 0.95}
                    stroke={viewMode === 'fused' || viewMode === 'mask' ? '#f43f5e' : '#27272a'}
                    strokeWidth={viewMode === 'fused' || viewMode === 'mask' ? '3' : '1'}
                    strokeDasharray={viewMode === 'fused' ? '6, 4' : 'none'}
                  />

                  {/* Tail Feathering Streaks */}
                  <path
                    d="M 280,140 Q 230,120 180,110 Q 140,105 110,108 Q 130,125 190,135 Q 240,142 280,140 Z"
                    fill={viewMode === 'mask' ? '#f43f5e' : '#050811'}
                    fillOpacity={viewMode === 'mask' ? 0.8 : 0.6}
                  />

                  {/* Bounding Box on Fused */}
                  {viewMode === 'fused' && (
                    <>
                      <rect x="100" y="90" width="470" height="210" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4, 4" />
                      <text x="110" y="80" fill="#06b6d4" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        DETECTION ROI #1 (18.4 km² • CONF 94%)
                      </text>
                      <circle cx="380" cy="190" r="4" fill="#f43f5e" />
                      <circle cx="380" cy="190" r="14" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.6" />
                    </>
                  )}
                </svg>
              </div>

              {/* HUD Telemetry inside Canvas */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-800 text-[11px] font-mono text-neutral-300">
                <div className="text-cyan-400 font-bold">MODE: {viewMode.toUpperCase()}</div>
                <div>Backscatter Damping: -6.4 dB</div>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-800 text-[11px] font-mono text-emerald-400">
                ✓ AI Classification: Suspected Mineral Oil Slick
              </div>
            </div>
          </div>

          {/* Slick Characterization Metrics Bento Grid */}
          <div className="bento-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                3. Oil Slick Characterization & Quantitative Parameters
              </h3>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Confidence: {detectionConfidence}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Estimated Area</span>
                <div className="text-xl font-black text-white mt-1 font-mono">{currentIncident.slick.areaKm2} km²</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Perimeter: {currentIncident.slick.perimeterKm} km</div>
              </div>

              <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Estimated Volume</span>
                <div className="text-xl font-black text-amber-400 mt-1 font-mono">~{currentIncident.slick.estimatedVolumeM3} m³</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Avg Thickness: {currentIncident.slick.estimatedThicknessUm} µm</div>
              </div>

              <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Orientation / Axis</span>
                <div className="text-xl font-black text-white mt-1 font-mono">{currentIncident.slick.orientationDeg}°</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Major: {currentIncident.slick.majorAxisKm}km / Minor: {currentIncident.slick.minorAxisKm}km</div>
              </div>

              <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold">Spill Classification</span>
                <div className="text-xs font-bold text-rose-300 mt-1.5 truncate">{currentIncident.characterization.spillType}</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">{currentIncident.characterization.weatheringStage}</div>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 bg-black/60 p-3.5 rounded-2xl border border-neutral-800 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Scientific Disclaimer:</strong> Remote sensing detection of dark patches on SAR imagery measures ocean surface capillary-wave damping. Results represent a <strong>suspected oil slick</strong> with {detectionConfidence}% confidence grade. Final verification requires in-situ sampling and Coast Guard aerial reconnaissance.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
