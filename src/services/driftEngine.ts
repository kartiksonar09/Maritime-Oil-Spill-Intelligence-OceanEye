/**
 * OCEANEYE - Drift Engine
 * Hydrodynamic Lagrangian particle drift modeling for oil slick hindcasting & forecasting
 */

import { GeoCoordinate, DriftPoint, DriftProfile, EnvironmentalConditions } from '../types';

// Approximate nautical mile to degrees conversion
const DEG_LAT_PER_NM = 1 / 60; // 1 nm = 1 min of latitude

export interface DriftSimulationParams {
  slickCenter: GeoCoordinate;
  detectionTimeIso: string;
  environmental: EnvironmentalConditions;
  leewayCoefficient?: number; // default 0.03 (3% wind leeway)
  coriolisAngleDeg?: number; // default 10° right deflection in Northern Hemisphere
  hindcastHours?: number; // default 3.5h
  forecastHours?: number[]; // default [6, 12, 24]
}

/**
 * Calculates drift vector from wind & current components
 */
export function calculateDriftVector(
  windSpeedKts: number,
  windDirectionDeg: number, // coming from
  currentSpeedKts: number,
  currentDirectionDeg: number, // flowing towards
  leeway = 0.03,
  coriolisDeflection = 10
): { uKts: number; vKts: number; totalSpeedKts: number; driftBearingDeg: number } {
  // Wind blows TOWARDS (windDirectionDeg + 180) with Coriolis deflection
  const windTargetBearing = (windDirectionDeg + 180 + coriolisDeflection) % 360;
  const windRad = (windTargetBearing * Math.PI) / 180;
  const windLeewaySpeed = windSpeedKts * leeway;

  // Ocean current flows towards currentDirectionDeg
  const currentRad = (currentDirectionDeg * Math.PI) / 180;

  // Components (East: u, North: v)
  const uWind = windLeewaySpeed * Math.sin(windRad);
  const vWind = windLeewaySpeed * Math.cos(windRad);

  const uCurrent = currentSpeedKts * Math.sin(currentRad);
  const vCurrent = currentSpeedKts * Math.cos(currentRad);

  const uTotal = uWind + uCurrent;
  const vTotal = vWind + vCurrent;

  const totalSpeedKts = Math.sqrt(uTotal * uTotal + vTotal * vTotal);
  let driftBearingDeg = (Math.atan2(uTotal, vTotal) * 180) / Math.PI;
  if (driftBearingDeg < 0) driftBearingDeg += 360;

  return {
    uKts: uTotal,
    vKts: vTotal,
    totalSpeedKts,
    driftBearingDeg
  };
}

/**
 * Displaces a lat/lng coordinate given speed in knots, bearing in degrees, and hours
 */
export function displaceCoordinate(
  start: GeoCoordinate,
  speedKts: number,
  bearingDeg: number,
  hours: number
): GeoCoordinate {
  const distanceNm = speedKts * hours;
  const bearingRad = (bearingDeg * Math.PI) / 180;

  const deltaLat = (distanceNm * Math.cos(bearingRad)) * DEG_LAT_PER_NM;
  // Adjust longitude for latitude convergence
  const avgLatRad = ((start.lat + (start.lat + deltaLat)) / 2 * Math.PI) / 180;
  const degLngPerNm = DEG_LAT_PER_NM / Math.cos(avgLatRad);
  const deltaLng = (distanceNm * Math.sin(bearingRad)) * degLngPerNm;

  return {
    lat: Number((start.lat + deltaLat).toFixed(5)),
    lng: Number((start.lng + deltaLng).toFixed(5))
  };
}

/**
 * Computes full backward hindcasting and forward forecasting profiles
 */
export function computeDriftProfile(params: DriftSimulationParams): DriftProfile {
  const {
    slickCenter,
    detectionTimeIso,
    environmental,
    leewayCoefficient = 0.03,
    coriolisAngleDeg = 10,
    hindcastHours = 3.5,
    forecastHours = [6, 12, 24]
  } = params;

  const detectionDate = new Date(detectionTimeIso);
  const drift = calculateDriftVector(
    environmental.windSpeedKts,
    environmental.windDirectionDeg,
    environmental.currentSpeedKts,
    environmental.currentDirectionDeg,
    leewayCoefficient,
    coriolisAngleDeg
  );

  // Hindcast points: Move BACKWARDS (opposite of drift direction)
  const reverseBearing = (drift.driftBearingDeg + 180) % 360;
  const hindcastSteps = [0, 1, 2, 3, hindcastHours];
  
  const hindcastPoints: DriftPoint[] = hindcastSteps.map(hoursAgo => {
    const ptDate = new Date(detectionDate.getTime() - hoursAgo * 3600 * 1000);
    const coords = hoursAgo === 0 
      ? slickCenter 
      : displaceCoordinate(slickCenter, drift.totalSpeedKts, reverseBearing, hoursAgo);
    
    // Uncertainty expands with time into the past
    const uncertaintyRadiusKm = Number((0.5 + Math.sqrt(hoursAgo) * 1.7).toFixed(2));

    return {
      hourOffset: -hoursAgo,
      timestamp: ptDate.toISOString(),
      lat: coords.lat,
      lng: coords.lng,
      uncertaintyRadiusKm,
      windContributionKts: Number((environmental.windSpeedKts * leewayCoefficient).toFixed(2)),
      currentContributionKts: environmental.currentSpeedKts,
      label: hoursAgo === 0 
        ? 'Observed Slick Center (T=0)' 
        : hoursAgo === hindcastHours 
          ? 'Probable Origin Zone' 
          : `Hindcast T - ${hoursAgo}h`
    };
  });

  const probableOriginPoint = hindcastPoints[hindcastPoints.length - 1];

  // Forecast points: Move FORWARD (in drift direction)
  const forecastPoints: DriftPoint[] = [
    {
      hourOffset: 0,
      timestamp: detectionDate.toISOString(),
      lat: slickCenter.lat,
      lng: slickCenter.lng,
      uncertaintyRadiusKm: 0.5,
      windContributionKts: Number((environmental.windSpeedKts * leewayCoefficient).toFixed(2)),
      currentContributionKts: environmental.currentSpeedKts,
      label: 'Observed Center'
    },
    ...forecastHours.map(hoursAhead => {
      const ptDate = new Date(detectionDate.getTime() + hoursAhead * 3600 * 1000);
      const coords = displaceCoordinate(slickCenter, drift.totalSpeedKts, drift.driftBearingDeg, hoursAhead);
      const uncertaintyRadiusKm = Number((0.5 + Math.sqrt(hoursAhead) * 2.3).toFixed(2));

      return {
        hourOffset: hoursAhead,
        timestamp: ptDate.toISOString(),
        lat: coords.lat,
        lng: coords.lng,
        uncertaintyRadiusKm,
        windContributionKts: Number((environmental.windSpeedKts * leewayCoefficient).toFixed(2)),
        currentContributionKts: environmental.currentSpeedKts,
        label: `Forecast +${hoursAhead}h`
      };
    })
  ];

  // Estimate distance to nearest major coastline / sensitive zone
  const nearestCoastlineKm = Math.max(12, Number((60 - drift.totalSpeedKts * 18).toFixed(1)));
  const willImpactCoast = nearestCoastlineKm < 15;

  return {
    hindcastPoints,
    probableOrigin: {
      center: { lat: probableOriginPoint.lat, lng: probableOriginPoint.lng },
      uncertaintyRadiusKm: probableOriginPoint.uncertaintyRadiusKm,
      estimatedTime: `${new Date(detectionDate.getTime() - (hindcastHours + 0.5) * 3600 * 1000).toISOString().slice(11, 16)} - ${new Date(detectionDate.getTime() - (hindcastHours - 0.5) * 3600 * 1000).toISOString().slice(11, 16)} UTC`,
      confidencePercent: Math.max(65, Math.min(92, Math.round(95 - hindcastHours * 3.5))),
      searchRadiusNm: Number((probableOriginPoint.uncertaintyRadiusKm / 1.852 * 1.5).toFixed(1))
    },
    forecastPoints,
    coastalImpactRisk: {
      willImpactCoast,
      estimatedImpactTime: willImpactCoast ? new Date(detectionDate.getTime() + 18 * 3600 * 1000).toISOString() : undefined,
      nearestCoastlineKm,
      threatenedSensitiveZones: willImpactCoast 
        ? ['Coastal Mangrove Buffers', 'Inshore Fishery Breeding Grounds'] 
        : ['Open Sea Shipping Corridor', 'Offshore Marine Buffer Zone']
    }
  };
}
