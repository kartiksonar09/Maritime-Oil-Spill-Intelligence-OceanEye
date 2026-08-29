/**
 * OCEANEYE - Live Maritime GIS Surveillance Workspace
 */

import React, { useState } from 'react';
import { Incident, AISVessel } from '../../types';
import { MaritimeMap } from '../map/MaritimeMap';
import {
  Compass,
  Ship,
  Radar,
  Wind,
  ShieldAlert,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';

interface LiveMonitoringViewProps {
  currentIncident: Incident;
  selectedVessel: AISVessel | null;
  onSelectVessel: (vessel: AISVessel) => void;
  onNavigateToAttribution: () => void;
}

export const LiveMonitoringView: React.FC<LiveMonitoringViewProps> = ({
  currentIncident,
  selectedVessel,
  onSelectVessel,
  onNavigateToAttribution
}) => {
  const [activeVessel, setActiveVessel] = useState<AISVessel | null>(
    selectedVessel || currentIncident.candidateVessels[0] || null
  );

  const handleVesselClick = (v: AISVessel) => {
    setActiveVessel(v);
    onSelectVessel(v);
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1720px] mx-auto">
      {/* Top Bento Header */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-lg lg:text-xl font-black text-white">
              Tactical Live GIS Surveillance Workspace
            </h1>
            <p className="text-xs text-neutral-400">
              Active Incident: <strong className="text-white font-mono">{currentIncident.incidentCode}</strong> • {currentIncident.region}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToAttribution}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-600/20"
          >
            <Ship className="w-4 h-4" />
            <span>View Vessel Attribution Matrix</span>
          </button>
        </div>
      </div>

      {/* Main Full-Size Map Bento Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-9">
          <div className="bento-card p-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden border border-neutral-800">
              <MaritimeMap
                incident={currentIncident}
                selectedVessel={activeVessel}
                onSelectVessel={handleVesselClick}
                className="h-[640px]"
              />
            </div>
          </div>
        </div>

        {/* Tactical Telemetry Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Incident Summary */}
          <div className="bento-card p-4 space-y-3 text-xs">
            <div className="font-bold text-white uppercase text-[11px] pb-2 border-b border-neutral-800 flex items-center justify-between">
              <span>Slick Parameters</span>
              <span className="text-emerald-400 font-mono">{currentIncident.detectionConfidence}% Conf</span>
            </div>
            <div className="space-y-1.5 text-neutral-300 text-[11px]">
              <div className="flex justify-between"><span className="text-neutral-400">Area:</span> <span className="font-bold text-white">{currentIncident.slick.areaKm2} km²</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Volume:</span> <span>~{currentIncident.slick.estimatedVolumeM3} m³</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Perimeter:</span> <span>{currentIncident.slick.perimeterKm} km</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Sensor:</span> <span className="text-cyan-400 font-mono">{currentIncident.satellite.sensor.replace('_', ' ')}</span></div>
            </div>
          </div>

          {/* Candidate Vessels List */}
          <div className="bento-card p-4 space-y-3 text-xs">
            <div className="font-bold text-white uppercase text-[11px] pb-2 border-b border-neutral-800 flex items-center justify-between">
              <span>Candidate Vessels</span>
              <span className="text-neutral-400 font-mono">{currentIncident.candidateVessels.length} tracked</span>
            </div>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {currentIncident.candidateVessels.map(vessel => (
                <div
                  key={vessel.mmsi}
                  onClick={() => handleVesselClick(vessel)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeVessel?.mmsi === vessel.mmsi
                      ? 'bg-neutral-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-lg'
                      : vessel.attributionRank === 1
                        ? 'bg-neutral-900/80 border-rose-900/80 hover:border-rose-700'
                        : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-white text-[11px]">
                    <span className="truncate max-w-[130px]">{vessel.vesselName}</span>
                    <span className={`font-mono ${vessel.attributionScore >= 80 ? 'text-rose-400' : 'text-amber-400'}`}>
                      {vessel.attributionScore}%
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{vessel.vesselType} ({vessel.flag})</div>
                  <div className="text-[10px] text-neutral-400 mt-1.5 flex justify-between">
                    <span>Approach: {vessel.minDistanceToOriginKm} km</span>
                    <span className="font-semibold text-white">Rank #{vessel.attributionRank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
