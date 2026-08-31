/**
 * OCEANEYE - Interactive Maritime Map Component
 * High-performance Leaflet-based geospatial display for Slicks, Drift Trajectories, and AIS Tracks
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Incident, AISVessel, GeoCoordinate } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Layers, Eye, EyeOff, Maximize2, Compass, ShieldAlert, Navigation, Anchor } from 'lucide-react';

interface MaritimeMapProps {
  incident: Incident;
  selectedVessel?: AISVessel | null;
  onSelectVessel?: (vessel: AISVessel) => void;
  activeLayers?: {
    slick: boolean;
    hindcast: boolean;
    forecast: boolean;
    origin: boolean;
    aisTracks: boolean;
    vessels: boolean;
    coastalRisk: boolean;
  };
  className?: string;
  enableControls?: boolean;
}

export const MaritimeMap: React.FC<MaritimeMapProps> = ({
  incident,
  selectedVessel,
  onSelectVessel,
  activeLayers: propActiveLayers,
  className = 'h-[540px]',
  enableControls = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupsRef = useRef<{
    slick: L.LayerGroup;
    hindcast: L.LayerGroup;
    forecast: L.LayerGroup;
    origin: L.LayerGroup;
    aisTracks: L.LayerGroup;
    vessels: L.LayerGroup;
    coastalRisk: L.LayerGroup;
  } | null>(null);

  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'oceans'>(() => (theme === 'light' ? 'oceans' : 'dark'));

  // Sync map style with global theme if user hasn't explicitly customized to satellite
  useEffect(() => {
    if (theme === 'light' && mapStyle === 'dark') {
      setMapStyle('oceans');
    } else if (theme === 'dark' && mapStyle === 'oceans') {
      setMapStyle('dark');
    }
  }, [theme]);
  const [layers, setLayers] = useState(
    propActiveLayers || {
      slick: true,
      hindcast: true,
      forecast: true,
      origin: true,
      aisTracks: true,
      vessels: true,
      coastalRisk: true
    }
  );
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [cursorCoords, setCursorCoords] = useState<GeoCoordinate | null>(null);

  // Sync prop changes
  useEffect(() => {
    if (propActiveLayers) {
      setLayers(propActiveLayers);
    }
  }, [propActiveLayers]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Clear any stale Leaflet reference on the container
      const container = mapContainerRef.current as HTMLDivElement & { _leaflet_id?: string | number | null };
      if (container._leaflet_id) {
        container._leaflet_id = null;
      }

      // Fix default Leaflet icon paths
      try {
        delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      } catch (iconErr) {
        console.warn('Leaflet icon path config non-fatal notice:', iconErr);
      }

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [incident.coordinates.lat, incident.coordinates.lng],
          zoom: 9,
          zoomControl: false,
          attributionControl: true
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Layer groups
        layerGroupsRef.current = {
          slick: L.layerGroup().addTo(map),
          hindcast: L.layerGroup().addTo(map),
          forecast: L.layerGroup().addTo(map),
          origin: L.layerGroup().addTo(map),
          aisTracks: L.layerGroup().addTo(map),
          vessels: L.layerGroup().addTo(map),
          coastalRisk: L.layerGroup().addTo(map),
        };

        map.on('mousemove', (e: L.LeafletMouseEvent) => {
          if (e && e.latlng) {
            setCursorCoords({
              lat: Number(e.latlng.lat.toFixed(4)),
              lng: Number(e.latlng.lng.toFixed(4))
            });
          }
        });

        mapInstanceRef.current = map;
      }

      // Handle dynamic resize
      const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      if (mapContainerRef.current) {
        resizeObserver.observe(mapContainerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch (removeErr) {
            console.warn('Map cleanup notice:', removeErr);
          }
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      console.error('Maritime map initialization error:', err);
    }
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      // Remove existing tile layers
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer);
        }
      });

      if (mapStyle === 'dark') {
        // High-contrast tactical dark canvas without watermarks
        const darkBase = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxNativeZoom: 16,
            maxZoom: 18
          }
        );
        const darkRef = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: '',
            maxNativeZoom: 16,
            maxZoom: 18
          }
        );
        darkBase.addTo(map);
        darkRef.addTo(map);
      } else if (mapStyle === 'satellite') {
        // High-resolution satellite imagery
        L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
            maxNativeZoom: 18,
            maxZoom: 19
          }
        ).addTo(map);
      } else {
        // High-definition Nautical Light (Ocean bathymetry & marine chart base)
        const oceanBase = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; GEBCO, NOAA, CHS, National Geographic',
            maxNativeZoom: 13,
            maxZoom: 18
          }
        );
        const oceanRef = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: '',
            maxNativeZoom: 13,
            maxZoom: 18
          }
        );
        oceanBase.addTo(map);
        oceanRef.addTo(map);
      }
    } catch (tileErr) {
      console.warn('Base tile layer switch warning:', tileErr);
    }
  }, [mapStyle]);

  // Render Incident Features & Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const lg = layerGroupsRef.current;
    if (!map || !lg || !incident) return;

    try {
      // Clear all layers
      lg.slick.clearLayers();
      lg.hindcast.clearLayers();
      lg.forecast.clearLayers();
      lg.origin.clearLayers();
      lg.aisTracks.clearLayers();
      lg.vessels.clearLayers();
      lg.coastalRisk.clearLayers();


    // 1. Detected Slick Polygon
    if (layers.slick && incident.slick) {
      const polygonCoords: L.LatLngExpression[] = incident.slick.coordinates.map(c => [c[0], c[1]]);
      const slickPolygon = L.polygon(polygonCoords, {
        color: '#f43f5e',
        weight: 2.5,
        opacity: 0.95,
        fillColor: '#881337',
        fillOpacity: 0.55,
        dashArray: '3, 3'
      });

      slickPolygon.bindPopup(`
        <div class="p-1 text-xs">
          <div class="flex items-center gap-1.5 font-bold text-rose-400 mb-1 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            Suspected Oil Slick (${incident.incidentCode})
          </div>
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 mt-2 border-t border-slate-700 pt-2">
            <div><span class="text-slate-400">Area:</span> <strong class="text-white">${incident.slick.areaKm2} km²</strong></div>
            <div><span class="text-slate-400">Confidence:</span> <strong class="text-emerald-400">${incident.detectionConfidence}%</strong></div>
            <div><span class="text-slate-400">Sensor:</span> ${incident.satellite.sensor.replace('_', ' ')}</div>
            <div><span class="text-slate-400">Type:</span> ${incident.characterization.spillType}</div>
            <div class="col-span-2 text-[11px] text-slate-400 mt-1">Detected at: ${new Date(incident.detectionTimestamp).toUTCString()}</div>
          </div>
        </div>
      `);
      lg.slick.addLayer(slickPolygon);

      // Centroid marker with pulsing radar
      const customSlickIcon = L.divIcon({
        className: 'relative',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4">
            <div class="absolute w-8 h-8 rounded-full bg-rose-500/30 radar-ping"></div>
            <div class="w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white shadow-lg"></div>
          </div>
        `,
        iconSize: [32, 32]
      });
      const centerMarker = L.marker([incident.slick.center.lat, incident.slick.center.lng], { icon: customSlickIcon });
      centerMarker.bindPopup(`<div class="text-xs font-semibold text-rose-300">Observed Slick Centroid (T=0)<br/><span class="text-slate-400 font-normal">${incident.slick.center.lat.toFixed(4)}°N, ${incident.slick.center.lng.toFixed(4)}°E</span></div>`);
      lg.slick.addLayer(centerMarker);
    }

    // 2. Probable Origin Zone
    if (layers.origin && incident.drift?.probableOrigin) {
      const { center, uncertaintyRadiusKm, estimatedTime, confidencePercent } = incident.drift.probableOrigin;
      
      // Uncertainty circle
      const originCircle = L.circle([center.lat, center.lng], {
        radius: uncertaintyRadiusKm * 1000,
        color: '#f59e0b',
        weight: 2,
        dashArray: '6, 6',
        fillColor: '#d97706',
        fillOpacity: 0.2
      });
      
      originCircle.bindPopup(`
        <div class="p-1 text-xs">
          <div class="flex items-center gap-1.5 font-bold text-amber-400 mb-1 text-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Probable Spill Origin Zone
          </div>
          <div class="space-y-1 text-slate-300 border-t border-slate-700 pt-2 mt-1">
            <div><span class="text-slate-400">Centroid:</span> <strong>${center.lat.toFixed(4)}°N, ${center.lng.toFixed(4)}°E</strong></div>
            <div><span class="text-slate-400">Uncertainty Radius:</span> <strong>±${uncertaintyRadiusKm} km</strong></div>
            <div><span class="text-slate-400">Estimated Window:</span> <strong class="text-amber-300">${estimatedTime}</strong></div>
            <div><span class="text-slate-400">Origin Confidence:</span> <strong class="text-emerald-400">${confidencePercent}%</strong></div>
          </div>
        </div>
      `);
      lg.origin.addLayer(originCircle);

      const originIcon = L.divIcon({
        className: 'relative',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4">
            <div class="w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-200 shadow-md flex items-center justify-center text-[9px] font-black text-slate-950">O</div>
          </div>
        `,
        iconSize: [32, 32]
      });
      const originMarker = L.marker([center.lat, center.lng], { icon: originIcon });
      lg.origin.addLayer(originMarker);
    }

    // 3. Backward Drift Hindcast
    if (layers.hindcast && incident.drift?.hindcastPoints?.length) {
      const latlngs: [number, number][] = incident.drift.hindcastPoints.map(p => [p.lat, p.lng]);
      const hindcastPolyline = L.polyline(latlngs, {
        color: '#f59e0b',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '8, 6'
      });
      hindcastPolyline.bindPopup(`
        <div class="text-xs">
          <strong class="text-amber-400">Backward Drift Hindcast Trajectory</strong>
          <p class="text-slate-300 mt-1 text-[11px]">Reconstructed backward path from observation (T=0) to estimated source release window using Lagrangian drift modeling.</p>
        </div>
      `);
      lg.hindcast.addLayer(hindcastPolyline);

      // Hourly breadcrumbs
      incident.drift.hindcastPoints.forEach(pt => {
        if (pt.hourOffset !== 0) {
          const ptMarker = L.circleMarker([pt.lat, pt.lng], {
            radius: 4.5,
            color: '#f59e0b',
            weight: 2,
            fillColor: '#78350f',
            fillOpacity: 0.9
          });
          ptMarker.bindPopup(`
            <div class="text-xs">
              <span class="font-bold text-amber-300">${pt.label || `T - ${Math.abs(pt.hourOffset)}h`}</span>
              <div class="text-[11px] text-slate-300 mt-1">
                Time: ${new Date(pt.timestamp).toUTCString()}<br/>
                Position: ${pt.lat.toFixed(4)}°N, ${pt.lng.toFixed(4)}°E<br/>
                Drift Error: ±${pt.uncertaintyRadiusKm} km
              </div>
            </div>
          `);
          lg.hindcast.addLayer(ptMarker);
        }
      });
    }

    // 4. Forward Drift Forecast
    if (layers.forecast && incident.drift?.forecastPoints?.length) {
      const latlngs: [number, number][] = incident.drift.forecastPoints.map(p => [p.lat, p.lng]);
      const forecastPolyline = L.polyline(latlngs, {
        color: '#06b6d4',
        weight: 3,
        opacity: 0.85,
        dashArray: '4, 4'
      });
      forecastPolyline.bindPopup(`
        <div class="text-xs">
          <strong class="text-cyan-400">Forward Drift Forecast</strong>
          <p class="text-slate-300 mt-1 text-[11px]">Projected trajectory across +6h, +12h, and +24h forecasting horizons.</p>
        </div>
      `);
      lg.forecast.addLayer(forecastPolyline);

      incident.drift.forecastPoints.forEach(pt => {
        if (pt.hourOffset !== 0) {
          const coneCircle = L.circle([pt.lat, pt.lng], {
            radius: pt.uncertaintyRadiusKm * 1000,
            color: '#06b6d4',
            weight: 1.5,
            fillColor: '#0891b2',
            fillOpacity: 0.15,
            dashArray: '3, 3'
          });
          lg.forecast.addLayer(coneCircle);

          const ptMarker = L.circleMarker([pt.lat, pt.lng], {
            radius: 4,
            color: '#06b6d4',
            weight: 2,
            fillColor: '#164e63',
            fillOpacity: 0.9
          });
          ptMarker.bindPopup(`
            <div class="text-xs">
              <span class="font-bold text-cyan-300">${pt.label || `+${pt.hourOffset}h Forecast`}</span>
              <div class="text-[11px] text-slate-300 mt-1">
                Time: ${new Date(pt.timestamp).toUTCString()}<br/>
                Position: ${pt.lat.toFixed(4)}°N, ${pt.lng.toFixed(4)}°E<br/>
                Dispersal Cone: ±${pt.uncertaintyRadiusKm} km
              </div>
            </div>
          `);
          lg.forecast.addLayer(ptMarker);
        }
      });
    }

    // 5. AIS Tracks & Candidate Vessels
    if (incident.candidateVessels) {
      incident.candidateVessels.forEach(vessel => {
        const isSelected = selectedVessel?.mmsi === vessel.mmsi;
        const isTopSuspect = vessel.attributionRank === 1;

        // Color coding by rank / selection
        const trackColor = isSelected 
          ? '#ec4899' 
          : isTopSuspect 
            ? '#ef4444' 
            : vessel.attributionRank === 2 
              ? '#f97316' 
              : '#64748b';

        // Add Track
        if (layers.aisTracks && vessel.track?.length) {
          const trackLatLngs: [number, number][] = vessel.track.map(t => [t.lat, t.lng]);
          const trackLine = L.polyline(trackLatLngs, {
            color: trackColor,
            weight: isSelected ? 3.5 : isTopSuspect ? 3 : 1.8,
            opacity: isSelected || isTopSuspect ? 0.95 : 0.6,
            dashArray: isSelected ? '5, 5' : undefined
          });

          trackLine.bindPopup(`
            <div class="text-xs p-1">
              <div class="font-bold text-white flex items-center justify-between">
                <span>${vessel.vesselName}</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] ${isTopSuspect ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-300'}">Rank #${vessel.attributionRank}</span>
              </div>
              <div class="text-slate-400 text-[11px] mt-1">
                Type: ${vessel.vesselType} (${vessel.flag})<br/>
                Attribution Score: <strong class="${vessel.attributionScore > 80 ? 'text-rose-400' : 'text-amber-400'}">${vessel.attributionScore}%</strong><br/>
                Closest Approach: ${vessel.minDistanceToOriginKm} km
              </div>
            </div>
          `);
          lg.aisTracks.addLayer(trackLine);
        }

        // Add Vessel Marker
        if (layers.vessels && vessel.currentPosition) {
          const vesselIcon = L.divIcon({
            className: 'relative cursor-pointer',
            html: `
              <div class="relative flex items-center justify-center w-7 h-7 -ml-3.5 -mt-3.5 transition-transform hover:scale-125">
                ${isTopSuspect ? '<div class="absolute w-7 h-7 rounded-full bg-rose-500/30 radar-ping"></div>' : ''}
                <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-pink-500 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : isTopSuspect ? 'bg-rose-600 ring-2 ring-rose-300' : 'bg-slate-700 border border-slate-400'} flex items-center justify-center text-white shadow-lg text-[10px] font-bold">
                  ${isTopSuspect ? '★' : `#${vessel.attributionRank}`}
                </div>
              </div>
            `,
            iconSize: [28, 28]
          });

          const vMarker = L.marker([vessel.currentPosition.lat, vessel.currentPosition.lng], { icon: vesselIcon });
          vMarker.on('click', () => {
            if (onSelectVessel) {
              onSelectVessel(vessel);
            }
          });

          vMarker.bindPopup(`
            <div class="p-1 text-xs">
              <div class="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-1.5">
                <span class="font-bold text-white text-sm">${vessel.vesselName}</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${isTopSuspect ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'}">
                  ${isTopSuspect ? 'TOP SUSPECT' : `RANK #${vessel.attributionRank}`}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-1.5 text-slate-300 text-[11px]">
                <div><span class="text-slate-400">MMSI:</span> ${vessel.mmsi}</div>
                <div><span class="text-slate-400">Flag:</span> ${vessel.flag}</div>
                <div><span class="text-slate-400">Type:</span> ${vessel.vesselType}</div>
                <div><span class="text-slate-400">Destination:</span> ${vessel.destination}</div>
                <div><span class="text-slate-400">Attribution:</span> <strong class="${vessel.attributionScore > 80 ? 'text-rose-400' : 'text-amber-400'} text-xs">${vessel.attributionScore}%</strong></div>
                <div><span class="text-slate-400">Min Distance:</span> <strong>${vessel.minDistanceToOriginKm} km</strong></div>
              </div>
              <div class="mt-2 text-[10px] text-amber-300 bg-amber-950/40 p-1 rounded border border-amber-900/50">
                ${vessel.explainableSummary[0] || 'Correlated with spill trajectory.'}
              </div>
            </div>
          `);
          lg.vessels.addLayer(vMarker);
        }
      });
    }

    // Auto fit bounds on initial load or incident switch
    const bounds = L.latLngBounds([
      [incident.coordinates.lat - 0.35, incident.coordinates.lng - 0.45],
      [incident.coordinates.lat + 0.35, incident.coordinates.lng + 0.45]
    ]);
    map.fitBounds(bounds, { padding: [30, 30] });
    } catch (layerErr) {
      console.warn('Error updating map layers:', layerErr);
    }
  }, [incident, layers, selectedVessel, onSelectVessel]);

  // Center map on selected vessel
  useEffect(() => {
    if (selectedVessel && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([selectedVessel.currentPosition.lat, selectedVessel.currentPosition.lng], {
        animate: true,
        duration: 0.8
      });
    }
  }, [selectedVessel]);

  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const resetView = () => {
    if (mapInstanceRef.current && incident) {
      mapInstanceRef.current.setView([incident.coordinates.lat, incident.coordinates.lng], 9);
    }
  };

  return (
    <div id="oceaneye-tactical-map" className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl ${className}`}>
      {/* Map Target */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Tactical Map Header & Controls Overlay (Unified & Non-overlapping) */}
      {enableControls && (
        <div className="absolute top-2.5 inset-x-2.5 z-[400] flex items-start justify-between gap-2 pointer-events-none">
          {/* Tactical HUD Header (Stacked with Coordinates & AIS status below title) */}
          <div className="flex flex-col gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-lg text-xs pointer-events-auto">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">
              <Compass className="w-3.5 h-3.5 animate-spin text-cyan-400 shrink-0" style={{ animationDuration: '12s' }} />
              <span className="whitespace-nowrap font-bold">Maritime GIS Engine</span>
            </div>
            <div className="flex items-center gap-2 text-[10.5px] text-slate-300 font-mono">
              <span className="whitespace-nowrap">
                {cursorCoords ? `${cursorCoords.lat.toFixed(4)}°N, ${cursorCoords.lng.toFixed(4)}°E` : `${incident.coordinates.lat.toFixed(4)}°N, ${incident.coordinates.lng.toFixed(4)}°E`}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium font-sans flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                AIS Live Feed
              </span>
            </div>
          </div>

          {/* Tactical Map Controls & Layer Selector (Top aligned) */}
          <div className="relative flex flex-col items-end pointer-events-auto ml-auto">
            <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1 rounded-lg shadow-lg">
              {/* Basemap Switcher */}
              <button
                id="map-style-dark-btn"
                onClick={() => setMapStyle('dark')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all whitespace-nowrap ${mapStyle === 'dark' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Tactical Dark
              </button>
              <button
                id="map-style-satellite-btn"
                onClick={() => setMapStyle('satellite')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all whitespace-nowrap ${mapStyle === 'satellite' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                SAR / Satellite
              </button>
              <button
                id="map-style-oceans-btn"
                onClick={() => setMapStyle('oceans')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-all whitespace-nowrap ${mapStyle === 'oceans' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Nautical Light
              </button>

              <span className="text-slate-700">|</span>

              {/* Layer Filter Toggle */}
              <button
                id="map-layer-menu-toggle"
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                className={`p-1.5 rounded transition-all ${showLayerMenu ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                title="Toggle GIS Layers"
              >
                <Layers className="w-4 h-4" />
              </button>

              {/* Reset View */}
              <button
                id="map-reset-view-btn"
                onClick={resetView}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                title="Recenter Map"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Layer Menu Dropdown */}
            {showLayerMenu && (
              <div className="absolute top-full right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-2xl w-60 text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="font-bold text-slate-200 pb-1.5 border-b border-slate-800 flex items-center justify-between">
                  <span>Active GIS Layers</span>
                  <span className="text-[10px] text-slate-500 font-normal">GIS Multi-Layer</span>
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
                      Suspected Oil Slick
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.slick}
                      onChange={() => toggleLayer('slick')}
                      className="accent-rose-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Probable Spill Origin
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.origin}
                      onChange={() => toggleLayer('origin')}
                      className="accent-amber-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-0.5 bg-amber-400"></span>
                      Drift Hindcast Path
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.hindcast}
                      onChange={() => toggleLayer('hindcast')}
                      className="accent-amber-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-0.5 bg-cyan-400"></span>
                      Forecast Plume Cone
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.forecast}
                      onChange={() => toggleLayer('forecast')}
                      className="accent-cyan-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-0.5 bg-pink-500"></span>
                      AIS Vessel Trajectories
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.aisTracks}
                      onChange={() => toggleLayer('aisTracks')}
                      className="accent-pink-500 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                      Vessel Positions & Rank
                    </span>
                    <input
                      type="checkbox"
                      checked={layers.vessels}
                      onChange={() => toggleLayer('vessels')}
                      className="accent-rose-500 rounded"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tactical Map Legend Overlay */}
      {enableControls && (
        <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-800/90 px-3.5 py-2.5 rounded-lg shadow-xl text-[11px] space-y-1.5 pointer-events-auto max-w-[280px]">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Tactical Map Legend</span>
            <span className="text-[9px] text-cyan-400">AIS / SAR</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-rose-600/60 border border-rose-400"></span>
              <span>Observed Slick</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-200">O</span>
              <span>Probable Origin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-0.5 bg-amber-400 inline-block border-t border-dashed border-amber-300"></span>
              <span>Hindcast (Back)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-0.5 bg-cyan-400 inline-block border-t border-dashed border-cyan-200"></span>
              <span>Forecast (Ahead)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[8px] font-black">★</span>
              <span>Top Suspect Vessel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[8px]">#2</span>
              <span>Candidate Vessel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
