/**
 * Maritime Oil Spill Intelligence - Official Maritime Investigation Dossier & Report View
 * Comprehensive printable/downloadable investigation report
 */

import React, { useState } from 'react';
import { Incident } from '../../types';
import {
  FileText,
  Download,
  Shield,
  CheckCircle2,
  Check
} from 'lucide-react';

interface InvestigationReportViewProps {
  currentIncident: Incident;
}

export const InvestigationReportView: React.FC<InvestigationReportViewProps> = ({
  currentIncident
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const topVessel = currentIncident.candidateVessels.find(v => v.attributionRank === 1);

  const handleDownloadReport = () => {
    const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpillTrace AI Report - ${currentIncident.incidentCode}</title>
  <style>
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --bg: #0a0f1d;
      --card-bg: #111827;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --border: #374151;
      --rose: #f43f5e;
      --emerald: #10b981;
      --amber: #f59e0b;
    }
    @media print {
      body { background: #ffffff !important; color: #111827 !important; padding: 0 !important; font-size: 11pt !important; }
      .no-print { display: none !important; }
      .card { border: 1px solid #e5e7eb !important; background: #f9fafb !important; page-break-inside: avoid; }
      .text-cyan { color: #0284c7 !important; }
      .text-rose { color: #be123c !important; }
      .text-emerald { color: #047857 !important; }
      .badge { border: 1px solid #000 !important; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #0d1117;
      color: #e6edf3;
      padding: 30px 20px;
      line-height: 1.5;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 36px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #30363d;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #58a6ff;
    }
    .tagline {
      font-size: 12px;
      color: #8b949e;
      margin-top: 2px;
    }
    .meta-box {
      text-align: right;
      font-family: monospace;
      font-size: 12px;
      color: #8b949e;
    }
    .meta-box strong { color: #f0f6fc; }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #79c0ff;
      border-bottom: 1px solid #30363d;
      padding-bottom: 6px;
      margin: 24px 0 12px 0;
    }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 16px; }
    .card {
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 14px;
    }
    .card-label { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #8b949e; }
    .card-val { font-size: 16px; font-weight: bold; color: #f0f6fc; margin-top: 4px; }
    .table-container {
      overflow-x: auto;
      border: 1px solid #30363d;
      border-radius: 8px;
      margin: 12px 0;
    }
    table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
    th {
      background: #0d1117;
      color: #8b949e;
      font-size: 10px;
      text-transform: uppercase;
      padding: 10px 12px;
      border-bottom: 1px solid #30363d;
    }
    td { padding: 10px 12px; border-bottom: 1px solid #21262d; }
    tr:last-child td { border-bottom: none; }
    .top-rank { background: rgba(244, 63, 94, 0.12); font-weight: bold; }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .badge-rose { background: #4c0519; color: #fda4af; border: 1px solid #9f1239; }
    .badge-emerald { background: #064e3b; color: #6ee7b7; border: 1px solid #065f46; }
    .badge-amber { background: #451a03; color: #fcd34d; border: 1px solid #78350f; }
    .text-sm { font-size: 12px; }
    .text-xs { font-size: 11px; }
    .text-muted { color: #8b949e; }
    .lead-text { font-size: 12px; line-height: 1.6; color: #c9d1d9; margin-bottom: 12px; }
    .disclaimer {
      margin-top: 30px;
      padding-top: 16px;
      border-top: 1px solid #30363d;
      font-size: 10px;
      color: #8b949e;
      line-height: 1.5;
    }
    .print-btn {
      background: #1f6feb;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 12px;
      margin-bottom: 16px;
    }
    .print-btn:hover { background: #388bfd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF from Browser</button>
      <span style="font-size: 11px; color: #8b949e;">Official Document • SIH26143</span>
    </div>

    <!-- Official Header -->
    <div class="header">
      <div>
        <div class="brand-title">SpillTrace AI</div>
        <div class="tagline">AI Powered Maritime Oil Spill Detection & Vessel Attribution</div>
        <div style="margin-top: 6px;">
          <span class="badge badge-emerald">SIH26143 SURVEILLANCE</span>
          <span class="badge badge-rose" style="margin-left: 6px;">CONFIDENTIAL / OFFICIAL</span>
        </div>
      </div>
      <div class="meta-box">
        <div><strong>DOSSIER ID:</strong> ${currentIncident.incidentCode}</div>
        <div><strong>GENERATED:</strong> ${new Date().toUTCString()}</div>
        <div><strong>INCIDENT STATUS:</strong> ${currentIncident.status.replace('_', ' ')}</div>
      </div>
    </div>

    <!-- 1. Executive Summary -->
    <div class="section-title">1. Executive Surveillance Summary</div>
    <div class="grid-4">
      <div class="card">
        <div class="card-label">Detection Status</div>
        <div class="card-val">${currentIncident.status.replace('_', ' ')}</div>
      </div>
      <div class="card">
        <div class="card-label">Observed Spill Area</div>
        <div class="card-val">${currentIncident.slick.areaKm2} km²</div>
      </div>
      <div class="card">
        <div class="card-label">SAR Confidence</div>
        <div class="card-val" style="color: #3fb950;">${currentIncident.detectionConfidence}%</div>
      </div>
      <div class="card">
        <div class="card-label">Top Vessel Correlated</div>
        <div class="card-val" style="color: #f85149; font-size: 14px;">${topVessel ? topVessel.vesselName : 'None'} (${topVessel?.attributionScore}%)</div>
      </div>
    </div>
    <p class="lead-text">
      On <strong>${new Date(currentIncident.detectionTimestamp).toUTCString()}</strong>, synthetic aperture radar (SAR) from satellite sensor <strong>${currentIncident.satellite.satelliteName}</strong> detected a <strong>${currentIncident.slick.areaKm2} km²</strong> suspected oil slick in the ${currentIncident.region} (${currentIncident.coordinates.lat.toFixed(4)}°N, ${currentIncident.coordinates.lng.toFixed(4)}°E). Hydrodynamic backward drift Lagrangian particle modeling estimated the release origin at ${currentIncident.drift.probableOrigin.center.lat.toFixed(4)}°N, ${currentIncident.drift.probableOrigin.center.lng.toFixed(4)}°E. AIS trajectory correlation ranked vessel <strong>${topVessel?.vesselName}</strong> (${topVessel?.mmsi}) as the primary candidate with a <strong>${topVessel?.attributionScore}%</strong> attribution probability score.
    </p>

    <!-- 2. Satellite & Slick Quantitative Characterization -->
    <div class="section-title">2. Satellite Sensor & Slick Quantitative Characterization</div>
    <div class="grid-2">
      <div class="card" style="font-family: monospace; font-size: 11px;">
        <div style="font-family: sans-serif; font-weight: bold; margin-bottom: 8px; color: #f0f6fc;">Satellite Sensor Telemetry</div>
        <div>Sensor Platform: <strong>${currentIncident.satellite.satelliteName}</strong></div>
        <div>Scene ID: <span style="color: #79c0ff;">${currentIncident.satellite.sceneId}</span></div>
        <div>Acquisition Time: ${new Date(currentIncident.satellite.acquisitionTime).toUTCString()}</div>
        <div>Polarization / Orbit: ${currentIncident.satellite.polarization} (${currentIncident.satellite.orbitPass})</div>
      </div>
      <div class="card" style="font-family: monospace; font-size: 11px;">
        <div style="font-family: sans-serif; font-weight: bold; margin-bottom: 8px; color: #f0f6fc;">Oil Slick Geometrical Parameters</div>
        <div>Centroid: ${currentIncident.slick.center.lat.toFixed(4)}°N, ${currentIncident.slick.center.lng.toFixed(4)}°E</div>
        <div>Surface Area: <strong>${currentIncident.slick.areaKm2} km²</strong> (Perimeter: ${currentIncident.slick.perimeterKm} km)</div>
        <div>Discharge Volume Est: ~${currentIncident.slick.estimatedVolumeM3} m³ (Thickness: ${currentIncident.slick.estimatedThicknessUm} µm)</div>
        <div>Classification: <strong>${currentIncident.characterization.spillType}</strong></div>
      </div>
    </div>

    <!-- 3. MetOcean Environmental Forcing & Drift Origin -->
    <div class="section-title">3. Hydrodynamic Drift Modeling & Reconstructed Spill Origin</div>
    <div class="grid-2">
      <div class="card" style="font-family: monospace; font-size: 11px;">
        <div style="font-family: sans-serif; font-weight: bold; margin-bottom: 8px; color: #f0f6fc;">MetOcean Environmental Forcing</div>
        <div>Surface Wind: <strong>${currentIncident.environmental.windSpeedKts} kts @ ${currentIncident.environmental.windDirectionDeg}°</strong></div>
        <div>Ocean Current: <strong>${currentIncident.environmental.currentSpeedKts} kts @ ${currentIncident.environmental.currentDirectionDeg}°</strong></div>
        <div>Sea State: ${currentIncident.environmental.seaState} (SWH: ${currentIncident.environmental.waveHeightM}m)</div>
        <div>Sea Surface Temp: ${currentIncident.environmental.seaSurfaceTempC}°C (Density: ${currentIncident.environmental.waterDensityKgM3} kg/m³)</div>
      </div>
      <div class="card" style="font-family: monospace; font-size: 11px;">
        <div style="font-family: sans-serif; font-weight: bold; margin-bottom: 8px; color: #f0f6fc;">Backward Hindcast Origin Zone</div>
        <div>Origin Centroid: <strong style="color: #d29922;">${currentIncident.drift.probableOrigin.center.lat.toFixed(4)}°N, ${currentIncident.drift.probableOrigin.center.lng.toFixed(4)}°E</strong></div>
        <div>Uncertainty Radius: ±${currentIncident.drift.probableOrigin.uncertaintyRadiusKm} km</div>
        <div>Discharge Window: ${currentIncident.drift.probableOrigin.estimatedTime}</div>
        <div>Origin Model Confidence: <strong style="color: #3fb950;">${currentIncident.drift.probableOrigin.confidencePercent}%</strong></div>
      </div>
    </div>

    <!-- 4. Ranked Candidate Vessels Attribution Table -->
    <div class="section-title">4. Spatio-Temporal AIS Candidate Vessels Correlation</div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Vessel Name</th>
            <th>MMSI / IMO</th>
            <th>Type / Flag</th>
            <th>Min Distance</th>
            <th>Time Delta</th>
            <th style="text-align: right;">Attribution Score</th>
          </tr>
        </thead>
        <tbody>
          ${currentIncident.candidateVessels.map(v => `
            <tr class="${v.attributionRank === 1 ? 'top-rank' : ''}">
              <td>#${v.attributionRank}</td>
              <td><strong>${v.vesselName}</strong></td>
              <td style="font-family: monospace;">${v.mmsi} / ${v.imo}</td>
              <td>${v.vesselType} (${v.flag})</td>
              <td style="font-family: monospace;">${v.minDistanceToOriginKm} km</td>
              <td style="font-family: monospace;">${v.closestApproachDeltaHours.toFixed(2)}h</td>
              <td style="text-align: right; font-weight: 900; color: #f85149; font-family: monospace; font-size: 13px;">
                ${v.attributionScore}%
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 5. Explainability Evidence Factors -->
    ${topVessel ? `
    <div class="section-title">5. Explainable Attribution Findings: ${topVessel.vesselName}</div>
    <div class="card" style="font-size: 12px; line-height: 1.6;">
      <div style="font-weight: bold; margin-bottom: 6px; color: #f0f6fc;">Primary Corroborating Evidence Factors:</div>
      <ul style="padding-left: 20px; color: #c9d1d9;">
        ${topVessel.explainableSummary.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- 6. Human Investigator Review -->
    <div class="section-title">6. Human Investigator Review & Chain of Custody</div>
    <div class="card" style="font-size: 12px;">
      ${currentIncident.expertReview ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <div>Reviewing Officer: <strong>${currentIncident.expertReview.reviewedBy}</strong> (${currentIncident.expertReview.reviewerRole})</div>
          <div style="color: #3fb950; font-weight: bold; font-family: monospace;">DECISION: ${currentIncident.expertReview.decision} (${currentIncident.expertReview.confidenceRating}/5 Stars)</div>
        </div>
        <div style="background: #0d1117; border: 1px solid #30363d; border-radius: 6px; padding: 10px; font-style: italic; color: #e6edf3; margin-bottom: 8px;">
          "${currentIncident.expertReview.comments}"
        </div>
        <div style="font-family: monospace; font-size: 10px; color: #8b949e; display: flex; justify-content: space-between;">
          <span>Digital Signature Hash: ${currentIncident.expertReview.digitalSignatureHash}</span>
          <span>Timestamp: ${currentIncident.expertReview.reviewTimestamp}</span>
        </div>
      ` : `
        <div style="color: #d29922; font-style: italic;">
          * Automated intelligence system analysis complete. Pending formal review and endorsement by duty surveillance officer.
        </div>
      `}
    </div>

    <!-- Legal Disclaimer -->
    <div class="disclaimer">
      <strong>LEGAL DISCLAIMER:</strong> This document represents an automated decision-support intelligence dossier generated by SpillTrace AI. Attribution scores are probabilistic estimations based on satellite synthetic aperture radar (SAR) backscatter analysis, Lagrangian hydrodynamic leeway drift, and AIS spatiotemporal correlation. This report is intended to guide Coast Guard aerial reconnaissance and port state inspections and does not constitute definitive proof of legal liability.
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `SpillTrace_AI_Investigation_Report_${currentIncident.incidentCode}.html`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1280px] mx-auto">
      {/* Top Action Bar (hidden in print) */}
      <div className="no-print bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-400" />
            Official Maritime Pollution Investigation Dossier
          </h1>
          <p className="text-xs text-neutral-400">
            Automated intelligence report generated for incident {currentIncident.incidentCode}
          </p>
        </div>

        <div>
          <button
            id="btn-download-report"
            onClick={handleDownloadReport}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.02]"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Report Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Printable Report Bento Container */}
      <div className="bento-card p-6 sm:p-10 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:p-0 print:shadow-none">
        {/* Report Official Header */}
        <div className="border-b-2 border-neutral-800 print:border-slate-300 pb-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white print:text-black">
                SpillTrace AI
              </span>
              <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-neutral-900 text-neutral-300 font-bold border border-neutral-800 print:border-black print:text-black">
                MARITIME SURVEILLANCE DOSSIER
              </span>
            </div>
            <p className="text-xs text-neutral-400 print:text-slate-600">
              AI Powered Maritime Oil Spill Detection & Vessel Attribution
            </p>
          </div>

          <div className="text-right font-mono text-xs text-neutral-300 print:text-slate-800 space-y-0.5">
            <div><strong>DOSSIER ID:</strong> {currentIncident.incidentCode}</div>
            <div><strong>GENERATED:</strong> {new Date().toUTCString()}</div>
            <div><strong>CLASSIFICATION:</strong> OFFICIAL SENSITIVE</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
            1. Executive Surveillance Summary
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300">
              <span className="text-neutral-400 uppercase font-bold text-[10px]">Detection Status</span>
              <div className="font-bold text-white print:text-black mt-0.5 text-sm">{currentIncident.status.replace('_', ' ')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300">
              <span className="text-neutral-400 uppercase font-bold text-[10px]">Observed Area</span>
              <div className="font-bold text-white print:text-black mt-0.5 text-sm">{currentIncident.slick.areaKm2} km²</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300">
              <span className="text-neutral-400 uppercase font-bold text-[10px]">SAR Confidence</span>
              <div className="font-bold text-emerald-400 print:text-emerald-700 mt-0.5 text-sm">{currentIncident.detectionConfidence}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300">
              <span className="text-neutral-400 uppercase font-bold text-[10px]">Top Attributed Vessel</span>
              <div className="font-bold text-rose-400 print:text-rose-700 mt-0.5 text-sm">{topVessel ? topVessel.vesselName : 'None'} ({topVessel?.attributionScore}%)</div>
            </div>
          </div>

          <p className="text-xs text-neutral-300 print:text-slate-800 leading-relaxed">
            On {new Date(currentIncident.detectionTimestamp).toUTCString()}, synthetic aperture radar from <strong>{currentIncident.satellite.satelliteName}</strong> detected a <strong>{currentIncident.slick.areaKm2} km²</strong> suspected oil slick in the {currentIncident.region} ({currentIncident.coordinates.lat.toFixed(4)}°N, {currentIncident.coordinates.lng.toFixed(4)}°E). Hydrodynamic backward drift modeling estimated the release origin at {currentIncident.drift.probableOrigin.center.lat.toFixed(4)}°N, {currentIncident.drift.probableOrigin.center.lng.toFixed(4)}°E. AIS trajectory correlation ranked vessel <strong>{topVessel?.vesselName}</strong> as the primary candidate with a <strong>{topVessel?.attributionScore}%</strong> attribution score.
          </p>
        </div>

        {/* Satellite & Slick Quantitative Parameters */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
            2. Satellite Sensor & Slick Quantitative Characterization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 space-y-1.5">
              <div className="font-bold text-white print:text-black uppercase text-[11px] font-sans pb-1.5 border-b border-neutral-800">
                Satellite Sensor Telemetry
              </div>
              <div className="flex justify-between"><span className="text-neutral-400">Platform:</span> <span className="text-white print:text-black">{currentIncident.satellite.satelliteName}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Scene ID:</span> <span className="text-cyan-400 print:text-cyan-700 truncate max-w-[200px]">{currentIncident.satellite.sceneId}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Acquisition Time:</span> <span>{new Date(currentIncident.satellite.acquisitionTime).toUTCString()}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Polarization / Mode:</span> <span>{currentIncident.satellite.polarization} ({currentIncident.satellite.orbitPass})</span></div>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 space-y-1.5">
              <div className="font-bold text-white print:text-black uppercase text-[11px] font-sans pb-1.5 border-b border-neutral-800">
                Oil Slick Geometrical Parameters
              </div>
              <div className="flex justify-between"><span className="text-neutral-400">Centroid Coordinates:</span> <span className="text-white print:text-black">{currentIncident.slick.center.lat.toFixed(4)}°N, {currentIncident.slick.center.lng.toFixed(4)}°E</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Surface Area:</span> <span>{currentIncident.slick.areaKm2} km² (Perimeter: {currentIncident.slick.perimeterKm} km)</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Est. Discharge Volume:</span> <span>~{currentIncident.slick.estimatedVolumeM3} m³ (Thickness: {currentIncident.slick.estimatedThicknessUm} µm)</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Classification:</span> <span>{currentIncident.characterization.spillType}</span></div>
            </div>
          </div>
        </div>

        {/* Environmental & Drift Reconstructed Origin */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
            3. Hydrodynamic Drift Modeling & Reconstructed Spill Origin
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 space-y-1.5">
              <div className="font-bold text-white print:text-black uppercase text-[11px] font-sans pb-1.5 border-b border-neutral-800">
                MetOcean Environmental Forcing
              </div>
              <div className="flex justify-between"><span className="text-neutral-400">Surface Wind:</span> <span>{currentIncident.environmental.windSpeedKts} kts @ {currentIncident.environmental.windDirectionDeg}°</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Ocean Current:</span> <span>{currentIncident.environmental.currentSpeedKts} kts @ {currentIncident.environmental.currentDirectionDeg}°</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Sea State:</span> <span>{currentIncident.environmental.seaState} (SWH: {currentIncident.environmental.waveHeightM}m)</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Sea Surface Temp:</span> <span>{currentIncident.environmental.seaSurfaceTempC}°C</span></div>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 space-y-1.5">
              <div className="font-bold text-white print:text-black uppercase text-[11px] font-sans pb-1.5 border-b border-neutral-800">
                Backward Hindcast Origin Zone
              </div>
              <div className="flex justify-between"><span className="text-neutral-400">Origin Centroid:</span> <span className="text-amber-400 print:text-amber-700 font-bold">{currentIncident.drift.probableOrigin.center.lat.toFixed(4)}°N, {currentIncident.drift.probableOrigin.center.lng.toFixed(4)}°E</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Uncertainty Radius:</span> <span>±{currentIncident.drift.probableOrigin.uncertaintyRadiusKm} km</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Discharge Window:</span> <span>{currentIncident.drift.probableOrigin.estimatedTime}</span></div>
              <div className="flex justify-between"><span className="text-neutral-400">Origin Confidence:</span> <span className="text-emerald-400 print:text-emerald-700 font-bold">{currentIncident.drift.probableOrigin.confidencePercent}%</span></div>
            </div>
          </div>
        </div>

        {/* Ranked Candidate Vessels Attribution Table */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
            4. Spatio-Temporal AIS Candidate Vessels Correlation
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 print:border-slate-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 print:bg-slate-100 font-bold uppercase text-[10px] border-b border-neutral-800 print:border-slate-300 text-neutral-400 print:text-black">
                <tr>
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Vessel Name</th>
                  <th className="py-2.5 px-3">MMSI / IMO</th>
                  <th className="py-2.5 px-3">Type / Flag</th>
                  <th className="py-2.5 px-3">Min Distance</th>
                  <th className="py-2.5 px-3">Time Delta</th>
                  <th className="py-2.5 px-3 text-right">Attribution Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 print:divide-slate-300">
                {currentIncident.candidateVessels.map(vessel => (
                  <tr key={vessel.mmsi} className={vessel.attributionRank === 1 ? 'bg-rose-950/20 print:bg-rose-50 font-semibold' : ''}>
                    <td className="py-2.5 px-3 font-bold">#{vessel.attributionRank}</td>
                    <td className="py-2.5 px-3 font-bold text-white print:text-black">{vessel.vesselName}</td>
                    <td className="py-2.5 px-3 font-mono">{vessel.mmsi} / {vessel.imo}</td>
                    <td className="py-2.5 px-3">{vessel.vesselType} ({vessel.flag})</td>
                    <td className="py-2.5 px-3 font-mono">{vessel.minDistanceToOriginKm} km</td>
                    <td className="py-2.5 px-3 font-mono">{vessel.closestApproachDeltaHours.toFixed(2)}h</td>
                    <td className="py-2.5 px-3 text-right font-black text-rose-400 print:text-rose-700 font-mono text-sm">
                      {vessel.attributionScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explainable Attribution Findings */}
        {topVessel && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
              5. Explainable Attribution Findings: {topVessel.vesselName}
            </h2>

            <div className="bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 p-4 rounded-2xl space-y-2.5 text-xs">
              <div className="font-bold text-white print:text-black">Primary Corroborating Evidence Factors:</div>
              <ul className="space-y-1.5 text-neutral-300 print:text-slate-800">
                {topVessel.explainableSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Human Expert Investigator Sign-off */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 border-b border-neutral-800 pb-1">
            6. Human Investigator Review & Chain of Custody
          </h2>

          <div className="p-4 rounded-2xl bg-black/60 print:bg-slate-100 border border-neutral-800 print:border-slate-300 space-y-2 text-xs">
            {currentIncident.expertReview ? (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-neutral-400">Reviewing Officer:</span>{' '}
                    <strong className="text-white print:text-black">{currentIncident.expertReview.reviewedBy}</strong> ({currentIncident.expertReview.reviewerRole})
                  </div>
                  <div className="font-mono text-emerald-400 print:text-emerald-700 font-bold">
                    DECISION: {currentIncident.expertReview.decision} (Rating: {currentIncident.expertReview.confidenceRating}/5)
                  </div>
                </div>

                <p className="text-neutral-300 print:text-slate-800 italic bg-neutral-900 print:bg-white p-3 rounded-xl border border-neutral-800 print:border-slate-300">
                  "{currentIncident.expertReview.comments}"
                </p>

                <div className="font-mono text-[10px] text-neutral-500 flex justify-between pt-1 border-t border-neutral-800">
                  <span>Digital Signature Hash: {currentIncident.expertReview.digitalSignatureHash}</span>
                  <span>Timestamp: {currentIncident.expertReview.reviewTimestamp}</span>
                </div>
              </div>
            ) : (
              <div className="text-amber-400 italic">
                * Automated system analysis complete. Pending formal review and sign-off by duty surveillance officer.
              </div>
            )}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-4 border-t border-neutral-800 print:border-slate-300 text-[10px] text-neutral-500 print:text-slate-600 leading-relaxed">
          <strong>LEGAL DISCLAIMER:</strong> This document represents an automated decision-support intelligence dossier generated by SpillTrace AI. Attribution scores are probabilistic estimations based on satellite synthetic aperture radar (SAR) backscatter analysis, Lagrangian hydrodynamic leeway drift, and AIS spatiotemporal correlation. This report is intended to guide Coast Guard aerial reconnaissance and port state inspections and does not constitute definitive proof of legal liability.
        </div>
      </div>
    </div>
  );
};
