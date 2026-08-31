/**
 * Maritime Oil Spill Intelligence - Tactical Command Header
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Bell,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { Incident, AlertItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  incidents: Incident[];
  currentIncident: Incident;
  onSelectIncident: (incident: Incident) => void;
  alerts: AlertItem[];
  onOpenAlerts: () => void;
  onOpenReviewModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  incidents,
  currentIncident,
  onSelectIncident,
  alerts,
  onOpenAlerts,
  onOpenReviewModal
}) => {
  const { theme, toggleTheme } = useTheme();
  const [utcTime, setUtcTime] = useState<string>('');
  const [showIncidentDropdown, setShowIncidentDropdown] = useState(false);
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <header className="h-16 border-b border-neutral-800/80 bg-black/80 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0 transition-colors duration-200">
      {/* Left: Project Branding & Incident Quick Switcher */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-black text-base sm:text-lg tracking-tight text-white leading-tight">
              SpillTrace AI
            </h1>
            <p className="text-[11px] text-neutral-400 font-medium leading-tight mt-0.5">
              AI Powered Maritime Oil Spill Detection & Vessel Attribution
            </p>
          </div>
        </div>

        <div className="hidden lg:block h-7 w-px bg-neutral-800" />

        {/* Active Incident Selector Bento Pill */}
        <div className="relative">
          <button
            id="incident-selector-btn"
            onClick={() => setShowIncidentDropdown(!showIncidentDropdown)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-200 transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="font-bold text-white font-mono">{currentIncident.incidentCode}</span>
            <span className="text-neutral-400 truncate max-w-[160px] hidden md:inline">{currentIncident.region}</span>
            <span className="text-neutral-500 text-[10px]">▼</span>
          </button>

          {showIncidentDropdown && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl p-2.5 z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] font-bold text-neutral-400 px-2 py-1 uppercase tracking-widest">
                Select Active Surveillance Incident ({incidents.length})
              </div>
              <div className="space-y-1.5 mt-1.5 max-h-[380px] overflow-y-auto pr-1">
                {incidents.map(inc => (
                  <button
                    key={inc.id}
                    onClick={() => {
                      onSelectIncident(inc);
                      setShowIncidentDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      inc.id === currentIncident.id
                        ? 'bg-neutral-800/90 border border-cyan-500/50 text-white shadow-sm'
                        : 'hover:bg-neutral-800/50 text-neutral-300 border border-transparent'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white flex items-center justify-between gap-2">
                        <span className="font-mono">{inc.incidentCode}</span>
                        <span className="text-[10px] text-emerald-400 font-medium">{inc.detectionConfidence}% Conf.</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">{inc.title}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{inc.slick.areaKm2} km² • {inc.region}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme Toggle, Live Feed Status, UTC Clock, Alerts, Investigator Sign-off */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Light / Dark Mode Switcher */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-all shadow-sm"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[11px]">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline text-[11px]">Dark Mode</span>
            </>
          )}
        </button>

        {/* Live Simulation Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
          <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Live Sentinel AIS</span>
        </div>

        {/* Live UTC Clock */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-neutral-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{utcTime || 'UTC Live'}</span>
        </div>

        {/* Human Expert Review Quick Action */}
        <button
          id="header-expert-review-btn"
          onClick={onOpenReviewModal}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
            currentIncident.expertReview?.decision === 'ACCEPTED'
              ? 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300'
              : 'bg-rose-950/80 hover:bg-rose-900 border border-rose-700/80 text-rose-200'
          }`}
        >
          {currentIncident.expertReview?.decision === 'ACCEPTED' ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Signed Off</span>
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Review Finding</span>
            </>
          )}
        </button>

        {/* Tactical Alerts Dropdown Toggle */}
        <div className="relative">
          <button
            id="header-alerts-btn"
            onClick={() => setShowAlertDropdown(!showAlertDropdown)}
            className="relative p-2 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
            title="Maritime Priority Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {showAlertDropdown && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl p-3.5 z-50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Tactical Priority Alerts ({alerts.length})
                </span>
                <button
                  onClick={() => {
                    setShowAlertDropdown(false);
                    onOpenAlerts();
                  }}
                  className="text-[11px] text-cyan-400 hover:underline font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2 mt-2.5 max-h-72 overflow-y-auto pr-1">
                {alerts.slice(0, 4).map(alert => (
                  <div
                    key={alert.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-950/30 border-rose-900/60 text-rose-200'
                        : alert.severity === 'HIGH'
                          ? 'bg-amber-950/30 border-amber-900/60 text-amber-200'
                          : 'bg-neutral-800/40 border-neutral-700/60 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span className="font-mono">{alert.incidentCode}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        alert.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-black'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="font-bold text-white mt-1 text-[11px] leading-tight">{alert.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-1 line-clamp-2">{alert.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
