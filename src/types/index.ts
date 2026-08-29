/**
 * OCEANEYE - Type Definitions
 * Maritime Intelligence & Oil Spill Attribution System (SIH26143)
 */

export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type IncidentStatus = 
  | 'DETECTED' 
  | 'UNDER_ANALYSIS' 
  | 'UNDER_REVIEW' 
  | 'CONFIRMED_INVESTIGATION' 
  | 'FALSE_POSITIVE' 
  | 'CLOSED';

export type SatelliteSensor = 'SENTINEL_1_SAR' | 'SENTINEL_2_MSI' | 'RADARSAT_2' | 'TERRASAR_X' | 'LANDSAT_9';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface SlickPolygon {
  type: 'Polygon';
  coordinates: [number, number][]; // [lat, lng] array
  center: GeoCoordinate;
  areaKm2: number;
  perimeterKm: number;
  majorAxisKm: number;
  minorAxisKm: number;
  orientationDeg: number;
  estimatedThicknessUm: number; // micrometers
  estimatedVolumeM3: number; // cubic meters
}

export interface EnvironmentalConditions {
  windSpeedKts: number;
  windDirectionDeg: number; // coming from (meteorological convention)
  currentSpeedKts: number;
  currentDirectionDeg: number; // flowing towards (oceanographic convention)
  waveHeightM: number;
  seaState: string; // e.g. "Slight (Beaufort 3)"
  seaSurfaceTempC: number;
  waterDensityKgM3: number;
  tidePhase: string;
}

export interface DriftPoint {
  hourOffset: number; // e.g. -4 for 4 hours ago, +6 for 6 hours ahead
  timestamp: string;
  lat: number;
  lng: number;
  uncertaintyRadiusKm: number;
  windContributionKts: number;
  currentContributionKts: number;
  label?: string;
}

export interface DriftProfile {
  hindcastPoints: DriftPoint[]; // Backward path (T-0 to T-origin)
  probableOrigin: {
    center: GeoCoordinate;
    uncertaintyRadiusKm: number;
    estimatedTime: string;
    confidencePercent: number;
    searchRadiusNm: number;
  };
  forecastPoints: DriftPoint[]; // Forward path (T-0 to T+24h)
  coastalImpactRisk: {
    willImpactCoast: boolean;
    estimatedImpactTime?: string;
    nearestCoastlineKm: number;
    threatenedSensitiveZones: string[];
  };
}

export interface AISPoint {
  timestamp: string;
  lat: number;
  lng: number;
  speedKts: number;
  courseDeg: number;
  headingDeg: number;
  navStatus: string;
}

export interface AttributionFactor {
  name: string;
  score: number; // 0 to 100
  weight: number; // e.g. 0.3
  description: string;
  evidenceSummary: string;
  isPositiveIndicator: boolean;
}

export interface AISVessel {
  mmsi: string;
  imo: string;
  vesselName: string;
  callsign: string;
  vesselType: 'Crude Oil Tanker' | 'Chemical Tanker' | 'Bulk Carrier' | 'Container Ship' | 'Cargo' | 'Tug / Supply' | 'Fishing';
  flag: string;
  flagCode: string;
  lengthM: number;
  beamM: number;
  draughtM: number;
  destination: string;
  eta: string;
  
  // Track and spatial metrics
  track: AISPoint[];
  currentPosition: GeoCoordinate;
  minDistanceToOriginKm: number;
  timeAtClosestApproach: string;
  closestApproachDeltaHours: number;
  
  // Attribution evaluation
  attributionScore: number; // 0 to 100
  attributionRank: number; // 1 = highest suspect
  confidenceGrade: ConfidenceLevel;
  factors: AttributionFactor[];
  explainableSummary: string[];
  aisDataQuality: {
    pingCount: number;
    gapDetected: boolean;
    gapDurationHours?: number;
    anomalousSpeedDrop: boolean;
    spoofingProbabilityPercent: number;
  };
}

export interface EvidenceTimelineEvent {
  id: string;
  timestamp: string;
  timeRelative: string; // e.g. "-2h 45m"
  category: 'SATELLITE' | 'AIS' | 'DRIFT' | 'AI_DETECTION' | 'CORRELATION' | 'REVIEW' | 'ALERT';
  title: string;
  description: string;
  severity?: 'INFO' | 'WARNING' | 'ALERT' | 'CRITICAL';
  vesselMmsi?: string;
  coordinates?: GeoCoordinate;
  metadata?: Record<string, string | number>;
}

export interface ExpertReview {
  reviewedBy: string;
  reviewerRole: string;
  reviewTimestamp: string;
  decision: 'ACCEPTED' | 'REJECTED_FALSE_POSITIVE' | 'REQUEST_REANALYSIS' | 'PENDING';
  confidenceRating: number; // 1 to 5
  comments: string;
  digitalSignatureHash: string;
  recommendedAction: string;
}

export interface Incident {
  id: string;
  incidentCode: string; // e.g. "OS-2026-001"
  title: string;
  region: string;
  subRegion: string;
  coordinates: GeoCoordinate;
  detectionTimestamp: string;
  status: IncidentStatus;
  
  // Satellite metadata
  satellite: {
    sensor: SatelliteSensor;
    satelliteName: string;
    orbitPass: 'Ascending' | 'Descending';
    resolutionMeters: number;
    polarization: 'VV + VH' | 'HH + HV' | 'Multi-spectral';
    sceneId: string;
    acquisitionTime: string;
    imageUrl?: string;
    sarMaskUrl?: string;
  };
  
  // Detection results
  detectionConfidence: number; // 0 - 100%
  slick: SlickPolygon;
  characterization: {
    spillType: 'Suspected Mineral Heavy Fuel Oil' | 'Suspected Crude Oil Wash' | 'Suspected Bilge / Sludge Discharge' | 'Biogenic Film (Look-alike)';
    slickCategory: 'Continuous Dark Patch' | 'Feathered Streak' | 'Windrow Dispersion';
    weatheringStage: 'Fresh Discharge' | 'Moderate Emulsification' | 'Dispersed Sheen';
    estimatedSpillWindowStart: string;
    estimatedSpillWindowEnd: string;
  };
  
  // Environmental & Drift
  environmental: EnvironmentalConditions;
  drift: DriftProfile;
  
  // AIS & Attribution
  candidateVessels: AISVessel[];
  topCandidateMmsi?: string;
  
  // Timeline & Review
  evidenceTimeline: EvidenceTimelineEvent[];
  expertReview?: ExpertReview;
  
  // System flags
  isDemoData: boolean;
  isSimulated: boolean;
  lastUpdated: string;
}

export interface AlertItem {
  id: string;
  incidentId: string;
  incidentCode: string;
  title: string;
  category: 'NEW_SPILL_DETECTED' | 'HIGH_ATTRIBUTION' | 'COASTAL_RISK' | 'AIS_ANOMALY' | 'REVIEW_REQUIRED';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  location: string;
  coordinates: GeoCoordinate;
  summary: string;
  recommendedAction: string;
  isRead: boolean;
  attributionCandidate?: string;
  attributionScore?: number;
}
