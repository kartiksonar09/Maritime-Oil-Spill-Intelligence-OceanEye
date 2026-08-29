/**
 * OCEANEYE - Tactical Alerts Manager
 */

import React, { useState } from 'react';
import { AlertItem, Incident } from '../../types';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Filter,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface AlertsManagerProps {
  alerts: AlertItem[];
  incidents: Incident[];
  onSelectIncident: (inc: Incident) => void;
  onMarkRead: (alertId: string) => void;
  onMarkAllRead: () => void;
  onNavigateToDashboard: () => void;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({
  alerts,
  incidents,
  onSelectIncident,
  onMarkRead,
  onMarkAllRead,
  onNavigateToDashboard
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity === 'ALL') return true;
    return alert.severity === filterSeverity;
  });

  const handleDrilldown = (incidentCode: string) => {
    const inc = incidents.find(i => i.incidentCode === incidentCode || i.id === incidentCode);
    if (inc) {
      onSelectIncident(inc);
      onNavigateToDashboard();
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-rose-950/80 text-rose-400 border border-rose-800/80">
              <Bell className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                Tactical Priority Alerts Manager
              </h1>
              <p className="text-xs text-neutral-400">
                Live maritime alerts for suspected oil discharges, high-attribution vessels, and coastal impact warnings
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllRead}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-all flex items-center gap-2 shadow-sm hover:border-neutral-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark All as Acknowledged</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-neutral-400 font-semibold flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5" /> Severity Filter:
        </span>
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filterSeverity === sev
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alerts Bento Cards List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`bento-card p-5 space-y-3 transition-all ${
              alert.severity === 'CRITICAL'
                ? 'border-rose-900/80 hover:border-rose-700'
                : alert.severity === 'HIGH'
                  ? 'border-amber-900/80 hover:border-amber-700'
                  : 'hover:border-neutral-700'
            } ${!alert.isRead ? 'ring-2 ring-cyan-500/30' : 'opacity-90'}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : alert.severity === 'HIGH'
                      ? 'bg-amber-600 text-neutral-950 shadow-md shadow-amber-600/30'
                      : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {alert.severity} PRIORITY
                </span>
                <span className="font-mono text-xs font-bold text-white">{alert.incidentCode}</span>
                <span className="text-neutral-600 text-xs">•</span>
                <span className="text-neutral-400 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {alert.location}
                </span>
              </div>

              <div className="text-neutral-400 font-mono text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{new Date(alert.timestamp).toUTCString()}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-white text-base">{alert.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{alert.summary}</p>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-amber-300 font-mono flex items-center gap-1.5">
                <span className="text-neutral-500 font-sans">Recommended Action:</span>
                <span>{alert.recommendedAction}</span>
              </div>

              <div className="flex items-center gap-2">
                {!alert.isRead && (
                  <button
                    onClick={() => onMarkRead(alert.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium transition-all hover:border-neutral-700"
                  >
                    Acknowledge
                  </button>
                )}
                <button
                  onClick={() => handleDrilldown(alert.incidentCode)}
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20"
                >
                  <span>Investigate Incident</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
