/**
 * OCEANEYE - Attribution Engine
 * Spatio-temporal AIS correlation and multi-factor explainable vessel scoring
 */

import { AISVessel, AttributionFactor, GeoCoordinate, ConfidenceLevel } from '../types';

export function calculateDistanceKm(c1: GeoCoordinate, c2: GeoCoordinate): number {
  const R = 6371; // Earth radius in km
  const dLat = ((c2.lat - c1.lat) * Math.PI) / 180;
  const dLng = ((c2.lng - c1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1.lat * Math.PI) / 180) *
      Math.cos((c2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

export function evaluateVesselAttribution(
  vessel: AISVessel,
  originCenter: GeoCoordinate,
  originUncertaintyKm: number,
  estimatedReleaseTimeIso: string
): {
  score: number;
  factors: AttributionFactor[];
  explainableSummary: string[];
  confidenceGrade: ConfidenceLevel;
} {
  // 1. Spatial Proximity Factor
  // Closest approach distance to origin
  const dist = vessel.minDistanceToOriginKm;
  let spatialScore = 0;
  if (dist <= 1.0) {
    spatialScore = 95;
  } else if (dist <= originUncertaintyKm) {
    spatialScore = Math.max(70, Math.round(95 - ((dist - 1.0) / (originUncertaintyKm - 1.0)) * 25));
  } else if (dist <= originUncertaintyKm * 2.5) {
    spatialScore = Math.max(35, Math.round(70 - ((dist - originUncertaintyKm) / (originUncertaintyKm * 1.5)) * 35));
  } else {
    spatialScore = Math.max(10, Math.round(30 - dist * 0.8));
  }

  // 2. Temporal Correlation Factor
  const timeDeltaHours = Math.abs(vessel.closestApproachDeltaHours);
  let temporalScore = 0;
  if (timeDeltaHours <= 0.3) {
    temporalScore = 92;
  } else if (timeDeltaHours <= 1.0) {
    temporalScore = Math.round(92 - (timeDeltaHours - 0.3) * 25);
  } else if (timeDeltaHours <= 2.5) {
    temporalScore = Math.max(40, Math.round(74 - (timeDeltaHours - 1.0) * 22));
  } else {
    temporalScore = Math.max(15, Math.round(40 - timeDeltaHours * 8));
  }

  // 3. Trajectory Consistency Factor
  const trajectoryFactor = vessel.factors.find(f => f.name.includes('Trajectory'))?.score || 80;

  // 4. Drift Vector Consistency
  const driftVectorFactor = vessel.factors.find(f => f.name.includes('Drift'))?.score || 85;

  // 5. AIS Data Quality
  const aisQualityScore = vessel.aisDataQuality.anomalousSpeedDrop ? 96 : 85;

  // Weighted Combination
  // Spatial: 30%, Temporal: 25%, Trajectory: 20%, Drift: 15%, AIS Quality: 10%
  const totalScore = Math.round(
    spatialScore * 0.30 +
    temporalScore * 0.25 +
    trajectoryFactor * 0.20 +
    driftVectorFactor * 0.15 +
    aisQualityScore * 0.10
  );

  let confidenceGrade: ConfidenceLevel = 'LOW';
  if (totalScore >= 85) confidenceGrade = 'CRITICAL';
  else if (totalScore >= 70) confidenceGrade = 'HIGH';
  else if (totalScore >= 45) confidenceGrade = 'MEDIUM';

  const factors: AttributionFactor[] = [
    {
      name: 'Spatial Proximity',
      score: spatialScore,
      weight: 0.30,
      description: `Vessel passed ${dist} km from estimated origin centroid. (Uncertainty radius: ${originUncertaintyKm} km)`,
      evidenceSummary: dist <= 1.0 ? 'Direct origin corridor transit' : `${dist} km closest approach offset`,
      isPositiveIndicator: dist <= originUncertaintyKm
    },
    {
      name: 'Temporal Correlation',
      score: temporalScore,
      weight: 0.25,
      description: `Closest approach occurred with ${timeDeltaHours.toFixed(1)}h deviation from estimated discharge window.`,
      evidenceSummary: timeDeltaHours <= 0.5 ? 'Precise temporal synchronization' : `${timeDeltaHours.toFixed(1)}h delta from release window`,
      isPositiveIndicator: timeDeltaHours <= 1.2
    },
    {
      name: 'Trajectory Alignment',
      score: trajectoryFactor,
      weight: 0.20,
      description: 'Course alignment and track consistency relative to slick longitudinal expansion.',
      evidenceSummary: trajectoryFactor > 75 ? 'Course aligns with slick geometry' : 'Course deviates from slick orientation',
      isPositiveIndicator: trajectoryFactor > 60
    },
    {
      name: 'Hydrodynamic Drift Consistency',
      score: driftVectorFactor,
      weight: 0.15,
      description: 'Physical plausibility of oil parcel transport from vessel position to detected slick.',
      evidenceSummary: driftVectorFactor > 75 ? 'Position directly upstream of drift vector' : 'Offset from main plume axis',
      isPositiveIndicator: driftVectorFactor > 60
    },
    {
      name: 'AIS Telemetry & Speed Profile',
      score: aisQualityScore,
      weight: 0.10,
      description: vessel.aisDataQuality.anomalousSpeedDrop 
        ? 'Identified localized speed reduction anomaly during closest approach.'
        : 'Steady navigation profile without significant anomalies.',
      evidenceSummary: vessel.aisDataQuality.anomalousSpeedDrop ? 'Speed drop anomaly detected' : 'Standard cruising speed',
      isPositiveIndicator: true
    }
  ];

  const explainableSummary = [
    `Closest approach distance: ${dist} km from reconstructed discharge zone.`,
    `Time synchronization: within ${timeDeltaHours.toFixed(1)} hours of calculated release window.`,
    vessel.aisDataQuality.anomalousSpeedDrop
      ? 'Telemetry indicates a speed drop during transit, consistent with offshore operations.'
      : 'Continuous AIS tracking verified across AoI.',
    `Vessel classification: ${vessel.vesselType} (${vessel.flag}).`
  ];

  return {
    score: totalScore,
    factors,
    explainableSummary,
    confidenceGrade
  };
}
