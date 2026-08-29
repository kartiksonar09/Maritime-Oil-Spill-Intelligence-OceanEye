/**
 * OCEANEYE - AIS Spatio-Temporal Vessel Attribution Studio
 * Probabilistic candidate ranking, multi-factor explainability & trajectory reconstruction
 */

import React, { useState } from 'react';
import { Incident, AISVessel } from '../../types';
import { MaritimeMap } from '../map/MaritimeMap';
import {
  Ship,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  ArrowRight,
  TrendingDown,
  Clock,
  Compass,
  Layers,
  Info,
  Radio
} from 'lucide-react';

interface VesselAttributionStudioProps {
  currentIncident: Incident;
  selectedVessel: AISVessel | null;
  onSelectVessel: (vessel: AISVessel) => void;
  onNavigateToReport: () => void;
  onOpenReviewModal: () => void;
}

export const VesselAttributionStudio: React.FC<VesselAttributionStudioProps> = ({
  currentIncident,
  selectedVessel: propSelectedVessel,
  onSelectVessel,
  onNavigateToReport,
  onOpenReviewModal
}) => {
  const [activeVessel, setActiveVessel] = useState<AISVessel>(
    propSelectedVessel || currentIncident.candidateVessels[0]
  );
  const [activeTab, setActiveTab] = useState<'explain' | 'factors' | 'telemetry' | 'track_points'>('explain');

  const handleVesselSelect = (v: AISVessel) => {
    setActiveVessel(v);
    onSelectVessel(v);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-800/80">
              <Ship className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                AIS Spatio-Temporal Vessel Attribution Studio
              </h1>
              <p className="text-xs text-neutral-400">
                Multi-criteria correlation between reconstructed spill origin and historical AIS trajectories
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenReviewModal}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-all hover:border-neutral-700 shadow-sm"
          >
            Investigator Sign-off
          </button>
          <button
            onClick={onNavigateToReport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official Report</span>
          </button>
        </div>
      </div>

      {/* Main Studio Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Ranked Candidate Vessels List Bento Tile */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bento-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                Ranked Potential Culprit Vessels
              </h3>
              <span className="text-[10px] text-neutral-400 font-mono">
                {currentIncident.candidateVessels.length} Evaluated
              </span>
            </div>

            <div className="space-y-3">
              {currentIncident.candidateVessels.map(vessel => {
                const isSelected = activeVessel.mmsi === vessel.mmsi;
                const isRankOne = vessel.attributionRank === 1;

                return (
                  <div
                    key={vessel.mmsi}
                    onClick={() => handleVesselSelect(vessel)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl'
                        : isRankOne
                          ? 'bg-neutral-900/80 border-rose-900/80 hover:border-rose-700'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          isRankOne ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {isRankOne ? '★' : `#${vessel.attributionRank}`}
                        </div>
                        <div>
                          <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                            {vessel.vesselName}
                            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-neutral-800 text-neutral-300 font-mono font-normal">
                              {vessel.flagCode}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400">{vessel.vesselType} • IMO: {vessel.imo}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-lg font-black font-mono ${
                          vessel.attributionScore >= 80 ? 'text-rose-400' : vessel.attributionScore >= 60 ? 'text-amber-400' : 'text-neutral-400'
                        }`}>
                          {vessel.attributionScore}%
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          vessel.attributionScore >= 80 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {vessel.confidenceGrade}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-neutral-800 text-[11px] text-neutral-300">
                      <div>
                        <span className="text-neutral-400">Min Approach:</span>{' '}
                        <strong className="text-white">{vessel.minDistanceToOriginKm} km</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400">Time Delta:</span>{' '}
                        <strong className="text-white">{vessel.closestApproachDeltaHours.toFixed(2)}h</strong>
                      </div>
                    </div>

                    {vessel.aisDataQuality.anomalousSpeedDrop && (
                      <div className="mt-2.5 text-[10px] text-amber-300 bg-amber-950/40 p-2 rounded-xl border border-amber-900/60 flex items-center gap-1.5 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Speed anomaly detected (14.2 kts → 8.1 kts) during corridor transit.</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Deep Explainability & Interactive Geospatial Correlation Bento Tile */}
        <div className="lg:col-span-8 space-y-5">
          {/* Tactical Map Bento Container */}
          <div className="bento-card p-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden border border-neutral-800">
              <MaritimeMap
                incident={currentIncident}
                selectedVessel={activeVessel}
                onSelectVessel={handleVesselSelect}
                className="h-[380px]"
              />
            </div>
          </div>

          {/* Deep Attribution Dossier Bento Card */}
          <div className="bento-card overflow-hidden shadow-xl space-y-0">
            {/* Header Tabs */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Attribution Analysis: {activeVessel.vesselName} (Rank #{activeVessel.attributionRank})
                </span>
              </div>

              {/* Subtabs */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-neutral-800 text-xs">
                <button
                  onClick={() => setActiveTab('explain')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'explain' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Why This Vessel?
                </button>
                <button
                  onClick={() => setActiveTab('factors')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'factors' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Factor Scores ({activeVessel.factors.length})
                </button>
                <button
                  onClick={() => setActiveTab('track_points')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'track_points' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  AIS Track Points ({activeVessel.track.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-5 space-y-4">
              {/* Tab 1: Explainable Bullet Points */}
              {activeTab === 'explain' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800">
                      <span className="text-neutral-400 text-[10px] uppercase font-bold">Overall Attribution Score</span>
                      <div className="text-2xl font-black text-rose-400 font-mono mt-1">{activeVessel.attributionScore}%</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Probabilistic Confidence: {activeVessel.confidenceGrade}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800">
                      <span className="text-neutral-400 text-[10px] uppercase font-bold">Closest Approach to Origin</span>
                      <div className="text-2xl font-black text-white font-mono mt-1">{activeVessel.minDistanceToOriginKm} km</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">At {new Date(activeVessel.timeAtClosestApproach).toUTCString().slice(17, 22)} UTC</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800">
                      <span className="text-neutral-400 text-[10px] uppercase font-bold">Time Delta from Release Window</span>
                      <div className="text-2xl font-black text-amber-400 font-mono mt-1">{activeVessel.closestApproachDeltaHours.toFixed(2)}h</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Temporal Overlap: High</div>
                    </div>
                  </div>

                  {/* Explainable Evidence Factors */}
                  <div className="bg-black/60 p-4 rounded-2xl border border-neutral-800 space-y-2.5">
                    <div className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Corroborating Evidence Points:
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {activeVessel.explainableSummary.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Factor Breakdown */}
              {activeTab === 'factors' && (
                <div className="space-y-3">
                  {activeVessel.factors.map(factor => (
                    <div key={factor.name} className="p-4 rounded-2xl bg-black/60 border border-neutral-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{factor.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 text-[11px]">Weight: {(factor.weight * 100).toFixed(0)}%</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black font-mono ${
                            factor.score >= 85 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            {factor.score}/100
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            factor.score >= 85 ? 'bg-rose-500' : factor.score >= 70 ? 'bg-amber-500' : 'bg-neutral-500'
                          }`}
                          style={{ width: `${factor.score}%` }}
                        />
                      </div>

                      <p className="text-neutral-300 text-[11px] leading-relaxed">{factor.description}</p>
                      <div className="text-[10px] text-cyan-400 font-mono">Evidence: {factor.evidenceSummary}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: AIS Waypoints & Telemetry Table */}
              {activeTab === 'track_points' && (
                <div className="overflow-x-auto rounded-2xl border border-neutral-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="py-2.5 px-3.5">Timestamp (UTC)</th>
                        <th className="py-2.5 px-3.5">Latitude</th>
                        <th className="py-2.5 px-3.5">Longitude</th>
                        <th className="py-2.5 px-3.5">Speed (kts)</th>
                        <th className="py-2.5 px-3.5">Course / Heading</th>
                        <th className="py-2.5 px-3.5">Nav Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-[11px]">
                      {activeVessel.track.map((pt, i) => (
                        <tr key={i} className={`hover:bg-neutral-800/40 ${pt.speedKts < 10 ? 'bg-amber-950/20 text-amber-300' : 'text-neutral-300'}`}>
                          <td className="py-2 px-3.5 font-sans text-neutral-400">{new Date(pt.timestamp).toUTCString().slice(5, 22)}</td>
                          <td className="py-2 px-3.5">{pt.lat.toFixed(4)}°N</td>
                          <td className="py-2 px-3.5">{pt.lng.toFixed(4)}°E</td>
                          <td className="py-2 px-3.5 font-bold">{pt.speedKts} kts</td>
                          <td className="py-2 px-3.5">{pt.courseDeg}° / {pt.headingDeg}°</td>
                          <td className="py-2 px-3.5 font-sans text-[10px] text-neutral-400">{pt.navStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Honest Scientific Disclaimer */}
              <div className="p-3.5 bg-black/60 border border-neutral-800 rounded-2xl text-[11px] text-neutral-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Legal & Scientific Notice:</strong> Attribution scoring is a decision-support metric calculated by fusing synthetic aperture radar observations, backward hydrodynamic leeway drift, and AIS spatiotemporal trajectory intersections. It establishes <strong>probable candidate ranking</strong> and does not constitute definitive proof of legal liability.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
