/**
 * OCEANEYE - Hydrodynamic Drift Hindcasting & Forecasting Studio
 * Real-time Lagrangian trajectory modeling, origin zone reconstruction & coastal impact analysis
 */

import React, { useState, useMemo } from 'react';
import { Incident } from '../../types';
import { MaritimeMap } from '../map/MaritimeMap';
import { computeDriftProfile } from '../../services/driftEngine';
import {
  Wind,
  Compass,
  RotateCcw,
  Navigation,
  Clock,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface DriftStudioProps {
  currentIncident: Incident;
  onNavigateToAttribution: () => void;
}

export const DriftStudio: React.FC<DriftStudioProps> = ({
  currentIncident,
  onNavigateToAttribution
}) => {
  // Environmental Tuning State
  const [windSpeed, setWindSpeed] = useState<number>(currentIncident.environmental.windSpeedKts);
  const [windDirection, setWindDirection] = useState<number>(currentIncident.environmental.windDirectionDeg);
  const [currentSpeed, setCurrentSpeed] = useState<number>(currentIncident.environmental.currentSpeedKts);
  const [currentDirection, setCurrentDirection] = useState<number>(currentIncident.environmental.currentDirectionDeg);
  const [leewayFactor, setLeewayFactor] = useState<number>(0.03); // 3%
  const [hindcastHours, setHindcastHours] = useState<number>(3.5);

  // Dynamically recompute drift profile based on state
  const dynamicDriftProfile = useMemo(() => {
    return computeDriftProfile({
      slickCenter: currentIncident.slick.center,
      detectionTimeIso: currentIncident.detectionTimestamp,
      environmental: {
        ...currentIncident.environmental,
        windSpeedKts: windSpeed,
        windDirectionDeg: windDirection,
        currentSpeedKts: currentSpeed,
        currentDirectionDeg: currentDirection
      },
      leewayCoefficient: leewayFactor,
      hindcastHours: hindcastHours
    });
  }, [currentIncident, windSpeed, windDirection, currentSpeed, currentDirection, leewayFactor, hindcastHours]);

  // Synthetic incident with updated drift profile for map rendering
  const liveIncident: Incident = useMemo(() => {
    return {
      ...currentIncident,
      drift: dynamicDriftProfile,
      environmental: {
        ...currentIncident.environmental,
        windSpeedKts: windSpeed,
        windDirectionDeg: windDirection,
        currentSpeedKts: currentSpeed,
        currentDirectionDeg: currentDirection
      }
    };
  }, [currentIncident, dynamicDriftProfile, windSpeed, windDirection, currentSpeed, currentDirection]);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-800/80">
              <Wind className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                Drift Hindcasting & Forward Forecasting Studio
              </h1>
              <p className="text-xs text-neutral-400">
                Lagrangian particle tracking using surface wind leeway & hydrodynamic ocean current vectors
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToAttribution}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
        >
          <span>Correlate AIS Vessels at Origin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bento Summary Gauges Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Probable Origin Point */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-400">
              <RotateCcw className="w-4 h-4" />
              Reconstructed Spill Origin
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
              Conf: {dynamicDriftProfile.probableOrigin.confidencePercent}%
            </span>
          </div>
          <div className="text-xl font-black text-white font-mono">
            {dynamicDriftProfile.probableOrigin.center.lat.toFixed(4)}°N, {dynamicDriftProfile.probableOrigin.center.lng.toFixed(4)}°E
          </div>
          <p className="text-[11px] text-neutral-400">
            Estimated Discharge: <strong className="text-amber-300">{dynamicDriftProfile.probableOrigin.estimatedTime}</strong> (±{dynamicDriftProfile.probableOrigin.uncertaintyRadiusKm} km)
          </p>
        </div>

        {/* Drift Velocity Vector */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Navigation className="w-4 h-4" />
              Resultant Drift Velocity
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">Eulerian Vector</span>
          </div>
          <div className="text-xl font-black text-white font-mono">
            {(currentSpeed + windSpeed * leewayFactor).toFixed(2)} kts @ {currentDirection}°
          </div>
          <p className="text-[11px] text-neutral-400">
            Current: {currentSpeed} kts • Wind Leeway: {(windSpeed * leewayFactor).toFixed(2)} kts ({(leewayFactor * 100).toFixed(1)}%)
          </p>
        </div>

        {/* Coastal Vulnerability Impact */}
        <div className="bento-card p-5 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              Coastal Vulnerability Status
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${dynamicDriftProfile.coastalImpactRisk.willImpactCoast ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}`}>
              {dynamicDriftProfile.coastalImpactRisk.willImpactCoast ? 'COASTAL RISK' : 'LOW RISK'}
            </span>
          </div>
          <div className="text-xl font-black text-white">
            {dynamicDriftProfile.coastalImpactRisk.nearestCoastlineKm} km <span className="text-xs text-neutral-400 font-normal">to shoreline</span>
          </div>
          <p className="text-[11px] text-neutral-400 truncate">
            {dynamicDriftProfile.coastalImpactRisk.threatenedSensitiveZones[0]}
          </p>
        </div>
      </div>

      {/* Main Bento Grid: Hydrodynamic Controls + Tactical Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Real-time Hydrodynamic Parameter Controls Bento Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bento-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Environmental Vector Tuning
              </h3>
              <button
                onClick={() => {
                  setWindSpeed(currentIncident.environmental.windSpeedKts);
                  setWindDirection(currentIncident.environmental.windDirectionDeg);
                  setCurrentSpeed(currentIncident.environmental.currentSpeedKts);
                  setCurrentDirection(currentIncident.environmental.currentDirectionDeg);
                  setLeewayFactor(0.03);
                  setHindcastHours(3.5);
                }}
                className="text-[10px] text-cyan-400 hover:underline font-semibold"
              >
                Reset MetOcean
              </button>
            </div>

            {/* Wind Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Surface Wind Velocity</span>
                <span className="text-cyan-400 font-mono font-bold">{windSpeed} kts</span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                step="0.5"
                value={windSpeed}
                onChange={e => setWindSpeed(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Wind Direction */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Wind Coming From</span>
                <span className="text-cyan-400 font-mono font-bold">{windDirection}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                step="5"
                value={windDirection}
                onChange={e => setWindDirection(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Ocean Current Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Surface Current Speed</span>
                <span className="text-amber-400 font-mono font-bold">{currentSpeed} kts</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.5"
                step="0.05"
                value={currentSpeed}
                onChange={e => setCurrentSpeed(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Ocean Current Direction */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Current Flowing Towards</span>
                <span className="text-amber-400 font-mono font-bold">{currentDirection}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                step="5"
                value={currentDirection}
                onChange={e => setCurrentDirection(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Wind Leeway Factor Slider */}
            <div className="space-y-1.5 pt-2.5 border-t border-neutral-800">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Wind Leeway Factor (α)</span>
                <span className="text-white font-mono font-bold">{(leewayFactor * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.05"
                step="0.005"
                value={leewayFactor}
                onChange={e => setLeewayFactor(parseFloat(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <span className="text-[10px] text-neutral-500">Standard heavy fuel oil leeway is 3.0% with Coriolis deflection</span>
            </div>

            {/* Hindcast Duration Window */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Hindcast Horizon</span>
                <span className="text-amber-400 font-mono font-bold">{hindcastHours} Hours Backward</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                value={hindcastHours}
                onChange={e => setHindcastHours(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Interactive Map & Step Chronology Table Bento Card */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bento-card p-4 overflow-hidden">
            <div className="rounded-2xl overflow-hidden border border-neutral-800">
              <MaritimeMap
                incident={liveIncident}
                className="h-[460px]"
              />
            </div>
          </div>

          {/* Hindcast and Forecast Points Chronology */}
          <div className="bento-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Drift Trajectory Step Matrix</span>
              <span className="text-[10px] text-neutral-400 font-mono">Lagrangian Particles</span>
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="py-2.5 px-3.5">Stage / Offset</th>
                    <th className="py-2.5 px-3.5">Timestamp (UTC)</th>
                    <th className="py-2.5 px-3.5">Coordinates</th>
                    <th className="py-2.5 px-3.5">Uncertainty Radius</th>
                    <th className="py-2.5 px-3.5">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 font-mono text-[11px]">
                  {/* Probable Origin row */}
                  <tr className="bg-amber-950/30 text-amber-200">
                    <td className="py-2.5 px-3.5 font-bold">T - {hindcastHours}h (Origin)</td>
                    <td className="py-2.5 px-3.5 font-sans">{dynamicDriftProfile.probableOrigin.estimatedTime}</td>
                    <td className="py-2.5 px-3.5 font-bold text-white">
                      {dynamicDriftProfile.probableOrigin.center.lat.toFixed(4)}°N, {dynamicDriftProfile.probableOrigin.center.lng.toFixed(4)}°E
                    </td>
                    <td className="py-2.5 px-3.5 font-bold">±{dynamicDriftProfile.probableOrigin.uncertaintyRadiusKm} km</td>
                    <td className="py-2.5 px-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase">
                        Origin Area
                      </span>
                    </td>
                  </tr>

                  {/* Hindcast intermediate points */}
                  {dynamicDriftProfile.hindcastPoints.map(pt => (
                    <tr key={pt.hourOffset} className="text-neutral-300 hover:bg-neutral-900/40">
                      <td className="py-2 px-3.5">{pt.label}</td>
                      <td className="py-2 px-3.5 text-neutral-400 font-sans">{new Date(pt.timestamp).toUTCString().slice(17, 22)} UTC</td>
                      <td className="py-2 px-3.5">{pt.lat.toFixed(4)}°N, {pt.lng.toFixed(4)}°E</td>
                      <td className="py-2 px-3.5 text-neutral-400">±{pt.uncertaintyRadiusKm} km</td>
                      <td className="py-2 px-3.5 text-amber-400 font-sans text-[10px]">Hindcast</td>
                    </tr>
                  ))}

                  {/* Forecast points */}
                  {dynamicDriftProfile.forecastPoints.filter(p => p.hourOffset > 0).map(pt => (
                    <tr key={pt.hourOffset} className="text-cyan-200 bg-cyan-950/20 hover:bg-cyan-950/30">
                      <td className="py-2 px-3.5 font-semibold">{pt.label}</td>
                      <td className="py-2 px-3.5 text-neutral-400 font-sans">{new Date(pt.timestamp).toUTCString().slice(5, 22)}</td>
                      <td className="py-2 px-3.5 font-bold">{pt.lat.toFixed(4)}°N, {pt.lng.toFixed(4)}°E</td>
                      <td className="py-2 px-3.5 text-cyan-300">±{pt.uncertaintyRadiusKm} km</td>
                      <td className="py-2 px-3.5 text-cyan-400 font-sans text-[10px]">Forecast</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
