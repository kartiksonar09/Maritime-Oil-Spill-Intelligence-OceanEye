/**
 * OCEANEYE - Multi-Sensor Evidence Timeline
 * Chronological fusion of Satellite SAR passes, AIS vessel trajectories, discharge estimations, and attribution
 */

import React from 'react';
import { Incident } from '../../types';
import {
  Clock,
  Radar,
  Ship,
  Wind,
  Cpu,
  UserCheck,
  AlertTriangle,
  FileText,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface EvidenceTimelineViewProps {
  currentIncident: Incident;
  onNavigateToReport: () => void;
}

export const EvidenceTimelineView: React.FC<EvidenceTimelineViewProps> = ({
  currentIncident,
  onNavigateToReport
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SATELLITE':
        return <Radar className="w-4 h-4 text-cyan-400" />;
      case 'AIS':
        return <Ship className="w-4 h-4 text-rose-400" />;
      case 'DRIFT':
        return <Wind className="w-4 h-4 text-amber-400" />;
      case 'AI_DETECTION':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'REVIEW':
        return <UserCheck className="w-4 h-4 text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-950 text-rose-300 border border-rose-800';
      case 'ALERT':
        return 'bg-amber-950 text-amber-300 border border-amber-800';
      case 'WARNING':
        return 'bg-yellow-950 text-yellow-300 border border-yellow-800';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                Multi-Sensor Evidence Timeline
              </h1>
              <p className="text-xs text-neutral-400">
                Chronological fusion of SAR observations, AIS track events, and hydrodynamic calculations for {currentIncident.incidentCode}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToReport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Export Timeline Dossier</span>
        </button>
      </div>

      {/* Timeline Stream Bento Card */}
      <div className="bento-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Reconstructed Event Chronology
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {currentIncident.evidenceTimeline.length} Authenticated Chain-of-Custody Events
          </div>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
          {currentIncident.evidenceTimeline.map((event) => (
            <div key={event.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-neutral-950 border-2 border-cyan-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              </div>

              {/* Event Card */}
              <div className="bg-black/60 border border-neutral-800 hover:border-neutral-700 p-4 rounded-2xl space-y-2.5 transition-all shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
                      {getCategoryIcon(event.category)}
                    </span>
                    <span className="font-bold text-white text-sm">{event.title}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-cyan-400 font-semibold">{event.timeRelative}</span>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-400">{new Date(event.timestamp).toUTCString().slice(0, 22)}</span>
                    {event.severity && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getSeverityBadge(event.severity)}`}>
                        {event.severity}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{event.description}</p>

                {event.coordinates && (
                  <div className="pt-2 border-t border-neutral-900 flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Coordinates: {event.coordinates.lat.toFixed(4)}°N, {event.coordinates.lng.toFixed(4)}°E</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
