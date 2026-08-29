/**
 * OCEANEYE - Historical Incidents Logbook
 */

import React, { useState } from 'react';
import { Incident } from '../../types';
import {
  FileSpreadsheet,
  Radar,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Download
} from 'lucide-react';

interface IncidentLogbookProps {
  incidents: Incident[];
  currentIncident: Incident;
  onSelectIncident: (inc: Incident) => void;
  onNavigateToDashboard: () => void;
  onNavigateToReport: () => void;
}

export const IncidentLogbook: React.FC<IncidentLogbookProps> = ({
  incidents,
  currentIncident,
  onSelectIncident,
  onNavigateToDashboard,
  onNavigateToReport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('ALL');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch =
      inc.incidentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'ALL' || inc.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleSelect = (inc: Incident) => {
    onSelectIncident(inc);
    onNavigateToDashboard();
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1720px] mx-auto">
      {/* Bento Header */}
      <div className="bento-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-white">
                Maritime Pollution Incident Logbook
              </h1>
              <p className="text-xs text-neutral-400">
                Centralized registry of detected satellite oil slicks, backward drift origins, and correlated vessel attributions
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          Total Logged Incidents: <strong className="text-white">{incidents.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bento-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by incident code, location, or title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-neutral-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-cyan-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Region:
          </span>
          <select
            value={filterRegion}
            onChange={e => setFilterRegion(e.target.value)}
            className="bg-black/60 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 outline-none"
          >
            <option value="ALL">All Maritime Zones ({incidents.length})</option>
            {Array.from(new Set(incidents.map(i => i.region))).map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Incidents Table Bento Card */}
      <div className="bento-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase text-[10px] border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4">Incident ID</th>
                <th className="py-3.5 px-4">Title / Region</th>
                <th className="py-3.5 px-4">Detection Time</th>
                <th className="py-3.5 px-4">Spill Area</th>
                <th className="py-3.5 px-4">SAR Confidence</th>
                <th className="py-3.5 px-4">Top Attributed Vessel</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredIncidents.map(inc => {
                const top = inc.candidateVessels.find(v => v.attributionRank === 1);
                const isSelected = inc.id === currentIncident.id;

                return (
                  <tr
                    key={inc.id}
                    className={`hover:bg-neutral-800/40 transition-colors ${
                      isSelected ? 'bg-cyan-950/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-xs">
                      {inc.incidentCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{inc.title}</div>
                      <div className="text-[11px] text-neutral-400">{inc.region} • {inc.subRegion}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-300 text-[11px]">
                      {new Date(inc.detectionTimestamp).toUTCString().slice(5, 22)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {inc.slick.areaKm2} km²
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      {inc.detectionConfidence}%
                    </td>
                    <td className="py-3.5 px-4">
                      {top ? (
                        <div>
                          <span className="font-bold text-rose-300">{top.vesselName}</span>
                          <div className="text-[10px] text-neutral-400">{top.vesselType} ({top.flag})</div>
                        </div>
                      ) : (
                        <span className="text-neutral-500">None correlated</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-black text-rose-400 font-mono text-sm">
                      {top ? `${top.attributionScore}%` : '-'}
                    </td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSelect(inc)}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
