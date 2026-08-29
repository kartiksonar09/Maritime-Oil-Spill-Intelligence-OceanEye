/**
 * OCEANEYE - Main Tactical Dashboard
 * Command center with maritime map, KPI summary cards, candidate attribution, and alert stream
 */

import React, { useState } from 'react';
import { Incident, AISVessel, AlertItem } from '../../types';
import { MaritimeMap } from '../map/MaritimeMap';
import {
  ShieldAlert,
  Ship,
  Wind,
  Radar,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { NavTab } from '../layout/Sidebar';

interface MainDashboardProps {
  currentIncident: Incident;
  incidents: Incident[];
  alerts: AlertItem[];
  onSelectIncident: (inc: Incident) => void;
  onNavigateTab: (tab: NavTab) => void;
  onSelectVessel: (vessel: AISVessel) => void;
  onOpenReviewModal: () => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  currentIncident,
  incidents,
  alerts,
  onSelectIncident,
  onNavigateTab,
  onSelectVessel,
  onOpenReviewModal
}) => {
  const [selectedMapVessel, setSelectedMapVessel] = useState<AISVessel | null>(
    currentIncident.candidateVessels[0] || null
  );

  const topVessel = currentIncident.candidateVessels.find(v => v.attributionRank === 1);
  const totalSlickArea = incidents.reduce((acc, inc) => acc + inc.slick.areaKm2, 0).toFixed(1);
  const totalVesselsTracked = incidents.reduce((acc, inc) => acc + inc.candidateVessels.length, 0);

  const handleVesselClick = (vessel: AISVessel) => {
    setSelectedMapVessel(vessel);
    onSelectVessel(vessel);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Top Banner: Incident Title & Fast Action Bar (Bento Master Header) */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/80 text-xs font-bold font-mono">
              INCIDENT: {currentIncident.incidentCode}
            </span>
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {currentIncident.region} ({currentIncident.subRegion})
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              SAR Confidence: {currentIncident.detectionConfidence}%
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {currentIncident.title}
          </h1>
          <p className="text-xs text-neutral-400">
            Detected via {currentIncident.satellite.satelliteName} at {new Date(currentIncident.detectionTimestamp).toUTCString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="dash-run-detection-btn"
            onClick={() => onNavigateTab('detection')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-all shadow-sm hover:border-neutral-700"
          >
            <Radar className="w-4 h-4 text-cyan-400" />
            <span>AI SAR Detection</span>
          </button>

          <button
            id="dash-run-drift-btn"
            onClick={() => onNavigateTab('drift')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-all shadow-sm hover:border-neutral-700"
          >
            <Wind className="w-4 h-4 text-amber-400" />
            <span>Drift Hindcast</span>
          </button>

          <button
            id="dash-run-attribution-btn"
            onClick={() => onNavigateTab('attribution')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-all shadow-sm hover:border-neutral-700"
          >
            <Ship className="w-4 h-4 text-rose-400" />
            <span>Vessel Attribution</span>
          </button>

          <button
            id="dash-open-report-btn"
            onClick={() => onNavigateTab('reports')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Bento KPI Grid Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* KPI 1: Active Slick Area */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Observed Spill Area</span>
            <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-400">
              <Radar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-white">{currentIncident.slick.areaKm2} <span className="text-sm font-normal text-neutral-400">km²</span></div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              Est. Volume: ~{currentIncident.slick.estimatedVolumeM3} m³
            </div>
          </div>
        </div>

        {/* KPI 2: Detection Confidence */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Detection Confidence</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-emerald-400">{currentIncident.detectionConfidence}%</div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              U-Net SAR Backscatter Match
            </div>
          </div>
        </div>

        {/* KPI 3: Probable Origin Confidence */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Origin Estimation</span>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-amber-400">
              {currentIncident.drift.probableOrigin.confidencePercent}%
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              Hindcast Radius: ±{currentIncident.drift.probableOrigin.uncertaintyRadiusKm} km
            </div>
          </div>
        </div>

        {/* KPI 4: Top Vessel Attribution */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Top Suspect Attribution</span>
            <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-400">
              <Ship className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-rose-500">
              {topVessel ? `${topVessel.attributionScore}%` : 'N/A'}
            </div>
            <div className="text-[11px] text-neutral-300 font-medium truncate mt-1">
              {topVessel ? topVessel.vesselName : 'None correlated'}
            </div>
          </div>
        </div>

        {/* KPI 5: Vessels Correlated */}
        <div className="bento-card p-5 space-y-2 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>AIS Candidate Vessels</span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-black text-cyan-400">
              {currentIncident.candidateVessels.length} <span className="text-xs font-normal text-neutral-400">in AoI</span>
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              Spatio-Temporal Screened
            </div>
          </div>
        </div>
      </div>

      {/* Main Map + Right Side Panel Bento Grid (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Interactive Maritime GIS Map Bento Tile */}
        <div className="lg:col-span-8 bento-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-100">
                Maritime Surveillance GIS View
              </h2>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">| Integrated SAR, Drift & AIS</span>
            </div>
            <button
              onClick={() => onNavigateTab('live_monitoring')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all"
            >
              <span>Full Screen View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-neutral-800">
            <MaritimeMap
              incident={currentIncident}
              selectedVessel={selectedMapVessel}
              onSelectVessel={handleVesselClick}
              className="h-[480px] xl:h-[520px]"
            />
          </div>

          {/* Environmental Telemetry Bento Sub-Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Surface Wind</div>
              <div className="font-semibold text-neutral-200 mt-1">
                {currentIncident.environmental.windSpeedKts} kts @ {currentIncident.environmental.windDirectionDeg}°
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Ocean Current</div>
              <div className="font-semibold text-neutral-200 mt-1">
                {currentIncident.environmental.currentSpeedKts} kts @ {currentIncident.environmental.currentDirectionDeg}°
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Sea State</div>
              <div className="font-semibold text-neutral-200 mt-1">
                {currentIncident.environmental.seaState} ({currentIncident.environmental.waveHeightM}m)
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Sea Surface Temp</div>
              <div className="font-semibold text-neutral-200 mt-1">
                {currentIncident.environmental.seaSurfaceTempC}°C (ρ: {currentIncident.environmental.waterDensityKgM3} kg/m³)
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Ranked Candidate Vessels & Attribution Explainer Bento Tile */}
        <div className="lg:col-span-4 space-y-5">
          {/* Header */}
          <div className="bento-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-100 flex items-center gap-2">
                <Ship className="w-4 h-4 text-rose-400" />
                Candidate Vessels Ranking
              </h2>
              <button
                onClick={() => onNavigateTab('attribution')}
                className="text-xs text-cyan-400 hover:underline font-medium"
              >
                Deep Dive
              </button>
            </div>

            {/* Candidate Vessels List with Scrollbar */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1.5">
              {currentIncident.candidateVessels.map(vessel => {
                const isSelected = selectedMapVessel?.mmsi === vessel.mmsi;
                const isRankOne = vessel.attributionRank === 1;

                return (
                  <div
                    key={vessel.mmsi}
                    onClick={() => handleVesselClick(vessel)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg'
                        : isRankOne
                          ? 'bg-neutral-900/80 border-rose-900/80 hover:border-rose-700'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isRankOne ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {isRankOne ? '★' : `#${vessel.attributionRank}`}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm flex items-center gap-1.5">
                            {vessel.vesselName}
                            <span className="text-[10px] text-neutral-400 font-normal">({vessel.flag})</span>
                          </div>
                          <div className="text-[11px] text-neutral-400">{vessel.vesselType} • MMSI: {vessel.mmsi}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-base font-black ${
                          vessel.attributionScore >= 80 ? 'text-rose-400' : vessel.attributionScore >= 60 ? 'text-amber-400' : 'text-neutral-400'
                        }`}>
                          {vessel.attributionScore}%
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                          Attribution
                        </div>
                      </div>
                    </div>

                    {/* Proximity and Approach metric */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-neutral-800 text-[11px] text-neutral-300">
                      <div>
                        <span className="text-neutral-400">Closest Approach:</span>{' '}
                        <strong className="text-white">{vessel.minDistanceToOriginKm} km</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400">Time Delta:</span>{' '}
                        <strong className="text-white">{vessel.closestApproachDeltaHours.toFixed(2)}h</strong>
                      </div>
                    </div>

                    {/* Highlight factor */}
                    <div className="mt-2.5 text-[11px] text-neutral-300 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800/80 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{vessel.explainableSummary[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Vessel Deep Explainability Bento Tile */}
          {selectedMapVessel && (
            <div className="bento-card p-5 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Why {selectedMapVessel.vesselName}?
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Rank #{selectedMapVessel.attributionRank}</span>
              </div>

              {/* Attribution Factor Mini Gauges */}
              <div className="space-y-2.5 text-xs">
                {selectedMapVessel.factors.map(factor => (
                  <div key={factor.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-300">{factor.name}</span>
                      <span className="font-bold text-white font-mono">{factor.score}/100</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          factor.score >= 85 ? 'bg-rose-500' : factor.score >= 70 ? 'bg-amber-500' : 'bg-neutral-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legal Disclaimer */}
              <p className="text-[10px] text-neutral-400 italic bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/90 leading-tight">
                * Note: Attribution scores represent probabilistic spatial-temporal correlation based on available SAR & AIS feeds, not definitive legal proof of liability.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Recent Incidents Table & Tactical Alerts Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-start">
        {/* Recent Incidents (8 cols) Bento Tile */}
        <div className="lg:col-span-8 bento-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active Surveillance Incidents
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                {incidents.length} Regions Active
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('incidents')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              View All Logbooks
            </button>
          </div>

          <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-2xl border border-neutral-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase text-[10px] border-b border-neutral-800 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3.5 bg-neutral-950">Incident ID</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Location</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Detection Time</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Area (km²)</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Confidence</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Top Suspect</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Score</th>
                  <th className="py-3 px-3.5 bg-neutral-950">Status</th>
                  <th className="py-3 px-3.5 bg-neutral-950 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {incidents.map(inc => {
                  const top = inc.candidateVessels.find(v => v.attributionRank === 1);
                  const isCurrent = inc.id === currentIncident.id;

                  return (
                    <tr
                      key={inc.id}
                      className={`hover:bg-neutral-800/50 transition-colors ${
                        isCurrent ? 'bg-cyan-950/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3.5 font-mono font-bold text-white">{inc.incidentCode}</td>
                      <td className="py-3 px-3.5 text-neutral-300">{inc.region}</td>
                      <td className="py-3 px-3.5 text-neutral-400 font-mono text-[11px]">
                        {new Date(inc.detectionTimestamp).toISOString().slice(0, 16).replace('T', ' ')}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-white font-mono">{inc.slick.areaKm2}</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-400">{inc.detectionConfidence}%</td>
                      <td className="py-3 px-3.5 font-semibold text-rose-300 truncate max-w-[120px]">
                        {top ? top.vesselName : 'None'}
                      </td>
                      <td className="py-3 px-3.5 font-black text-rose-400 font-mono">
                        {top ? `${top.attributionScore}%` : '-'}
                      </td>
                      <td className="py-3 px-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inc.status === 'CONFIRMED_INVESTIGATION'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : inc.status === 'UNDER_REVIEW'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {inc.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <button
                          onClick={() => onSelectIncident(inc)}
                          className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-cyan-400 text-[11px] font-semibold transition-all"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Priority Alerts Bento Tile (4 cols) */}
        <div className="lg:col-span-4 bento-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Priority Alerts Stream
            </h3>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              All Alerts ({alerts.length})
            </button>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1.5">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-950/20 border-rose-900/60 text-rose-200'
                    : alert.severity === 'HIGH'
                      ? 'bg-amber-950/20 border-amber-900/60 text-amber-200'
                      : 'bg-neutral-800/40 border-neutral-700/60 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span className="font-mono">{alert.incidentCode}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                    alert.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-neutral-950'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="font-bold text-white text-xs">{alert.title}</div>
                <p className="text-[11px] text-neutral-400 leading-snug">{alert.summary}</p>
                <div className="pt-2 border-t border-neutral-800 text-[10px] text-cyan-400 flex items-center justify-between font-mono">
                  <span>Action: {alert.recommendedAction.slice(0, 36)}...</span>
                  <span className="text-neutral-400">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
