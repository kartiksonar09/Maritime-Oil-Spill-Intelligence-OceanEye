/**
 * OCEANEYE - System Architecture & Technical Methodology View
 * Visual pipeline explainer designed for Smart India Hackathon (SIH26143) judges
 */

import React, { useState } from 'react';
import {
  Cpu,
  Radar,
  Wind,
  Ship,
  ShieldCheck,
  ArrowDown,
  Layers,
  CheckCircle2,
  FileCode,
  Sparkles,
  Activity
} from 'lucide-react';

export const SystemArchitectureView: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number>(0);

  const modules = [
    {
      id: 0,
      title: 'Satellite SAR Data Ingestion & Preprocessing',
      badge: 'Data Layer',
      icon: Radar,
      color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40',
      description: 'Acquires dual-polarization (VV + VH) Synthetic Aperture Radar imagery from Sentinel-1C / Sentinel-2. Performs precise orbit correction, radiometric calibration to sigma-nought (σ₀), land/island masking, and speckle noise reduction using an adaptive spatial Lee/Frost filter.',
      keyEquations: [
        'σ₀ = 10 · log₁₀(DN² / A²)',
        'Lee Filter: I_filtered = Ī + W · (I - Ī), where W = var(I) / [var(I) + σ²_noise]'
      ],
      deliverables: 'De-speckled, georeferenced backscatter intensity matrix with sea-clutter suppression.'
    },
    {
      id: 1,
      title: 'AI Semantic Oil-Slick Segmentation',
      badge: 'Deep Learning',
      icon: Cpu,
      color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
      description: 'DeepLabV3+ with ResNet-50 backbone / U-Net segmentation network trained on SAR oceanic datasets. Identifies surface capillary-wave damping (dark patches) while rejecting look-alikes (low-wind calm zones, natural biogenic surfactants, internal waves, upwelling).',
      keyEquations: [
        'Loss = α · L_Dice + (1 - α) · L_Focal',
        'L_Focal = -α_t · (1 - p_t)^γ · log(p_t)'
      ],
      deliverables: 'Binary slick mask, polygonal boundary, area (km²), perimeter, centroid, orientation, and confidence grade.'
    },
    {
      id: 2,
      title: 'Lagrangian Hydrodynamic Drift Engine',
      badge: 'Physical Simulation',
      icon: Wind,
      color: 'text-amber-400 border-amber-800 bg-amber-950/40',
      description: 'Solves Lagrangian particle transport equations to back-project (hindcast) the oil slick to its probable time/point of illegal discharge (T_origin) and forward-project (forecast) the slick plume towards coastlines over 6h, 12h, and 24h horizons.',
      keyEquations: [
        'v⃗_spill = v⃗_current + α · v⃗_wind (with Coriolis deflection θ_coriolis ≈ 10°)',
        'Uncertainty Ellipse: r(t) = r₀ + σ_turbulent · √t'
      ],
      deliverables: 'Backward hindcast path, probable origin centroid, uncertainty radius (±km), and estimated release window.'
    },
    {
      id: 3,
      title: 'AIS Spatio-Temporal Correlation Matrix',
      badge: 'Vessel Attribution',
      icon: Ship,
      color: 'text-rose-400 border-rose-800 bg-rose-950/40',
      description: 'Queries historical AIS streams within the Area of Interest (AoI) and time window. Evaluates multi-criteria proximity, course alignment, temporal synchronization, and AIS telemetry anomalies (such as speed drops or transmitter gaps).',
      keyEquations: [
        'Attribution Score = w₁·S_spatial + w₂·S_temporal + w₃·S_trajectory + w₄·S_drift + w₅·S_ais',
        'Weights: w = [0.30, 0.25, 0.20, 0.15, 0.10]'
      ],
      deliverables: 'Ranked candidate vessels, explainable factor score breakdown, and transparent probabilistic disclaimers.'
    },
    {
      id: 4,
      title: 'Decision Support & Investigator Dossier',
      badge: 'Government Ready',
      icon: ShieldCheck,
      color: 'text-purple-400 border-purple-800 bg-purple-950/40',
      description: 'Delivers an actionable intelligence dossier to Coast Guard and Port State Control authorities. Implements human-in-the-loop verification, cryptographic signing, official PDF report generation, and automated priority alerts.',
      keyEquations: [
        'Digital Signature: Hash(DossierID + ReviewerID + Timestamp + Decision)',
        'Alert Priority Thresholds: Critical (Score ≥ 85%), High (≥ 70%), Medium (≥ 45%)'
      ],
      deliverables: 'Printable investigation dossier, interactive GIS map, and exportable JSON telemetry.'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
            <Cpu className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400">
            Core Algorithmic Pipeline Architecture
          </span>
        </div>
        <h1 className="text-xl lg:text-3xl font-black text-white tracking-tight">
          SpillTrace AI System Architecture & Algorithmic Pipeline
        </h1>
        <p className="text-xs lg:text-sm text-neutral-400 max-w-3xl leading-relaxed">
          "An automated detection and hindcasting machine learning model that identifies oil slicks from satellite imagery, maps their drift paths backward and forward. It also ranks potential culprit vessels based on spatio-temporal correlation with AIS data."
        </p>
      </div>

      {/* Interactive Pipeline Steps Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          const isSelected = selectedModule === idx;

          return (
            <div
              key={m.id}
              onClick={() => setSelectedModule(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 relative ${
                isSelected
                  ? 'bg-neutral-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl'
                  : 'bg-black/60 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl border ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 font-bold">0{idx + 1}</span>
              </div>

              <div className="font-bold text-white text-xs leading-snug">{m.title}</div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold bg-neutral-950 text-neutral-400 border border-neutral-800">
                {m.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Active Module Details */}
      <div className="bento-card p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-2xl border ${modules[selectedModule].color}`}>
              {React.createElement(modules[selectedModule].icon, { className: 'w-6 h-6' })}
            </span>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                Stage {selectedModule + 1} Pipeline Detail
              </span>
              <h2 className="text-lg font-black text-white">{modules[selectedModule].title}</h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-950 text-neutral-300 border border-neutral-800 self-start sm:self-auto">
            {modules[selectedModule].badge}
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed max-w-4xl">
          {modules[selectedModule].description}
        </p>

        {/* Mathematical Foundation Box */}
        <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-2.5">
          <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            Mathematical Formulations & Model Foundations:
          </div>
          <div className="space-y-2 text-xs font-mono text-cyan-300">
            {modules[selectedModule].keyEquations.map((eq, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                {eq}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Output */}
        <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Stage Deliverables:</strong> {modules[selectedModule].deliverables}
          </span>
        </div>
      </div>
    </div>
  );
};
