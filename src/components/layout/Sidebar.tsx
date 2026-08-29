/**
 * Maritime Oil Spill Intelligence - Persistent Tactical Sidebar
 */

import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Radar,
  Wind,
  Ship,
  Clock,
  Bell,
  FileSpreadsheet,
  FileText,
  Cpu,
  ShieldCheck
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'live_monitoring'
  | 'detection'
  | 'drift'
  | 'attribution'
  | 'timeline'
  | 'alerts'
  | 'incidents'
  | 'reports'
  | 'architecture';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadAlertsCount
}) => {
  const menuItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Main Dashboard',
      subtitle: 'Command Center & Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'live_monitoring' as NavTab,
      label: 'Live GIS Monitoring',
      subtitle: 'Full Maritime Geospatial View',
      icon: Compass,
      badge: 'Live'
    },
    {
      id: 'detection' as NavTab,
      label: 'SAR Oil Spill Detection',
      subtitle: 'Satellite SAR & AI Inference',
      icon: Radar,
      badge: 'U-Net'
    },
    {
      id: 'drift' as NavTab,
      label: 'Drift Hindcast & Forecast',
      subtitle: 'Lagrangian Hydrodynamic Models',
      icon: Wind,
      badge: 'Physics'
    },
    {
      id: 'attribution' as NavTab,
      label: 'AIS Vessel Attribution',
      subtitle: 'Spatio-Temporal Ranking',
      icon: Ship,
      badge: 'Correlate'
    },
    {
      id: 'timeline' as NavTab,
      label: 'Evidence Timeline',
      subtitle: 'Multi-Sensor Chronology',
      icon: Clock,
      badge: null
    },
    {
      id: 'alerts' as NavTab,
      label: 'Tactical Alerts',
      subtitle: 'Spill & AIS Anomalies',
      icon: Bell,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount.toString() : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    {
      id: 'incidents' as NavTab,
      label: 'Incident Logbook',
      subtitle: 'Historical Surveillance Cases',
      icon: FileSpreadsheet,
      badge: '3 Cases'
    },
    {
      id: 'reports' as NavTab,
      label: 'Investigation Reports',
      subtitle: 'Legal Dossier & Download',
      icon: FileText,
      badge: 'Report'
    },
    {
      id: 'architecture' as NavTab,
      label: 'System Architecture',
      subtitle: 'Pipeline & Algorithmic Design',
      icon: Cpu,
      badge: 'Model'
    }
  ];

  return (
    <aside className="w-64 border-r border-neutral-800/80 bg-black/60 backdrop-blur-xl flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20 transition-colors duration-200">
      {/* Top: Nav items */}
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
          Surveillance & Attribution
        </div>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-neutral-900 border border-neutral-700/80 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-neutral-300'}`} />
                <div>
                  <div className={`font-semibold ${isActive ? 'text-white' : 'text-neutral-300'}`}>{item.label}</div>
                  <div className="text-[10px] text-neutral-400 group-hover:text-neutral-300 leading-none mt-0.5">{item.subtitle}</div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-neutral-800/80 text-neutral-300 border border-neutral-700/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom: System Verification & Security Stamp Bento Tile */}
      <div className="p-3.5 border-t border-neutral-800/80 bg-neutral-950/40">
        <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-3 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-bold text-neutral-200">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Surveillance Engine
            </span>
            <span className="text-[9px] text-emerald-400 font-mono px-1.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60">ACTIVE</span>
          </div>
          <p className="text-[10px] text-neutral-400 leading-tight">
            Deterministic SAR Segmentation, Lagrangian Particle Drift, Spatio-Temporal AIS Vector Analysis.
          </p>
          <div className="pt-1.5 border-t border-neutral-800 flex items-center justify-between text-[9px] text-neutral-400 font-mono">
            <span>VER: 2026.4.1</span>
            <span>EEZ MARITIME ZONE</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
