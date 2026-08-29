/**
 * OCEANEYE - Data Service & Mock Database Layer
 * Provides robust simulated maritime datasets, SAR scenes, and persistence
 */

import { Incident, AlertItem, GeoCoordinate, AISVessel, EvidenceTimelineEvent, ExpertReview } from '../types';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    incidentCode: 'OS-2026-001',
    title: 'Offshore Mumbai Tanker Corridor Slick',
    region: 'Arabian Sea',
    subRegion: 'Mumbai High Offshore Zone (EEZ Sector 4)',
    coordinates: { lat: 18.960, lng: 72.180 },
    detectionTimestamp: '2026-08-28T14:32:00Z',
    status: 'CONFIRMED_INVESTIGATION',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1C Synthetic Aperture Radar (C-Band)',
      orbitPass: 'Descending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1C_IW_GRDH_1SDV_20260828T143210_045231_056B3A',
      acquisitionTime: '2026-08-28T14:32:10Z',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    },
    detectionConfidence: 94,
    slick: {
      type: 'Polygon',
      coordinates: [
        [18.980, 72.150],
        [18.995, 72.190],
        [18.965, 72.225],
        [18.935, 72.195],
        [18.940, 72.155],
        [18.960, 72.140],
        [18.980, 72.150],
      ],
      center: { lat: 18.960, lng: 72.180 },
      areaKm2: 18.4,
      perimeterKm: 19.8,
      majorAxisKm: 6.8,
      minorAxisKm: 2.9,
      orientationDeg: 62,
      estimatedThicknessUm: 45,
      estimatedVolumeM3: 828,
    },
    characterization: {
      spillType: 'Suspected Mineral Heavy Fuel Oil',
      slickCategory: 'Continuous Dark Patch',
      weatheringStage: 'Fresh Discharge',
      estimatedSpillWindowStart: '2026-08-28T13:40:00Z',
      estimatedSpillWindowEnd: '2026-08-28T14:15:00Z',
    },
    environmental: {
      windSpeedKts: 14.5,
      windDirectionDeg: 240, // From WSW
      currentSpeedKts: 0.85,
      currentDirectionDeg: 65, // Towards ENE
      waveHeightM: 1.3,
      seaState: 'Moderate (Beaufort 4)',
      seaSurfaceTempC: 28.6,
      waterDensityKgM3: 1024.5,
      tidePhase: 'Ebb (Falling tide, +1.2m)',
    },
    drift: {
      hindcastPoints: [
        {
          hourOffset: 0,
          timestamp: '2026-08-28T14:32:00Z',
          lat: 18.960,
          lng: 72.180,
          uncertaintyRadiusKm: 0.5,
          windContributionKts: 0.44,
          currentContributionKts: 0.85,
          label: 'Observed Slick Center (T=0)'
        },
        {
          hourOffset: -1,
          timestamp: '2026-08-28T13:32:00Z',
          lat: 18.922,
          lng: 72.115,
          uncertaintyRadiusKm: 1.2,
          windContributionKts: 0.44,
          currentContributionKts: 0.85,
          label: 'Hindcast T - 1h'
        },
        {
          hourOffset: -2,
          timestamp: '2026-08-28T12:32:00Z',
          lat: 18.884,
          lng: 72.050,
          uncertaintyRadiusKm: 2.1,
          windContributionKts: 0.43,
          currentContributionKts: 0.84,
          label: 'Hindcast T - 2h'
        },
        {
          hourOffset: -3,
          timestamp: '2026-08-28T11:32:00Z',
          lat: 18.845,
          lng: 71.988,
          uncertaintyRadiusKm: 3.2,
          windContributionKts: 0.42,
          currentContributionKts: 0.83,
          label: 'Estimated Spill Window (-3.0h)'
        },
        {
          hourOffset: -3.5,
          timestamp: '2026-08-28T11:02:00Z',
          lat: 18.825,
          lng: 71.955,
          uncertaintyRadiusKm: 3.8,
          windContributionKts: 0.42,
          currentContributionKts: 0.82,
          label: 'Probable Origin Zone'
        }
      ],
      probableOrigin: {
        center: { lat: 18.825, lng: 71.955 },
        uncertaintyRadiusKm: 4.2,
        estimatedTime: '2026-08-28T11:05:00Z to 11:45:00Z',
        confidencePercent: 81,
        searchRadiusNm: 6.5,
      },
      forecastPoints: [
        {
          hourOffset: 0,
          timestamp: '2026-08-28T14:32:00Z',
          lat: 18.960,
          lng: 72.180,
          uncertaintyRadiusKm: 0.5,
          windContributionKts: 0.44,
          currentContributionKts: 0.85,
        },
        {
          hourOffset: 6,
          timestamp: '2026-08-28T20:32:00Z',
          lat: 19.185,
          lng: 72.550,
          uncertaintyRadiusKm: 3.6,
          windContributionKts: 0.45,
          currentContributionKts: 0.88,
          label: 'Forecast +6h'
        },
        {
          hourOffset: 12,
          timestamp: '2026-08-29T02:32:00Z',
          lat: 19.410,
          lng: 72.890,
          uncertaintyRadiusKm: 6.8,
          windContributionKts: 0.46,
          currentContributionKts: 0.90,
          label: 'Forecast +12h'
        },
        {
          hourOffset: 24,
          timestamp: '2026-08-29T14:32:00Z',
          lat: 19.820,
          lng: 73.280,
          uncertaintyRadiusKm: 12.5,
          windContributionKts: 0.48,
          currentContributionKts: 0.92,
          label: 'Forecast +24h'
        }
      ],
      coastalImpactRisk: {
        willImpactCoast: false,
        nearestCoastlineKm: 48.2,
        threatenedSensitiveZones: ['Alibaug Marine Sanctuary (Low Risk)', 'Mumbai Harbor Anchorage Zone (Monitor)'],
      }
    },
    topCandidateMmsi: '352981000',
    candidateVessels: [
      {
        mmsi: '352981000',
        imo: '9482154',
        vesselName: 'MV Ocean Star',
        callsign: '3FYH9',
        vesselType: 'Crude Oil Tanker',
        flag: 'Panama',
        flagCode: 'PA',
        lengthM: 274,
        beamM: 48,
        draughtM: 16.2,
        destination: 'JNPT / SIKKA',
        eta: '2026-08-29T08:00:00Z',
        currentPosition: { lat: 19.310, lng: 72.350 },
        minDistanceToOriginKm: 0.72,
        timeAtClosestApproach: '2026-08-28T11:22:00Z',
        closestApproachDeltaHours: 0.28,
        attributionScore: 91,
        attributionRank: 1,
        confidenceGrade: 'CRITICAL',
        factors: [
          {
            name: 'Spatial Proximity',
            score: 95,
            weight: 0.30,
            description: 'Vessel track passed within 0.72 km of the backward hindcasted spill origin.',
            evidenceSummary: 'Passed 720m from centroid at 11:22 UTC',
            isPositiveIndicator: true
          },
          {
            name: 'Temporal Correlation',
            score: 92,
            weight: 0.25,
            description: 'Passage time aligns precisely with estimated oil discharge time window (11:05 - 11:45 UTC).',
            evidenceSummary: 'Time delta of only 17 minutes from estimated release',
            isPositiveIndicator: true
          },
          {
            name: 'Trajectory Consistency',
            score: 89,
            weight: 0.20,
            description: 'Vessel course (042°) corresponds with the elongating slick tail orientation.',
            evidenceSummary: 'Course heading 042° aligns with longitudinal axis of dispersion',
            isPositiveIndicator: true
          },
          {
            name: 'Drift Vector Consistency',
            score: 90,
            weight: 0.15,
            description: 'The vessel was positioned directly upstream of the current/wind drift trajectory at T-discharge.',
            evidenceSummary: 'Direct upstream positioning confirmed by hydrodynamic back-projection',
            isPositiveIndicator: true
          },
          {
            name: 'AIS Data Quality & Speed Profile',
            score: 96,
            weight: 0.10,
            description: 'Continuous AIS transmission with a temporary speed reduction (14.2 kts to 8.1 kts) during corridor transit.',
            evidenceSummary: 'Temporary speed drop anomaly observed during closest approach window',
            isPositiveIndicator: true
          }
        ],
        explainableSummary: [
          'Passed within 720 meters of the backward drift reconstructed spill origin.',
          'Transit timestamp (11:22 UTC) falls directly inside the physical release window.',
          'Trajectory alignment correlates with slick elongation angle (62°).',
          'Vessel is a crude oil tanker with active ballast/cargo operations heading to Sikka.',
          'Detected speed variation (14.2 kts → 8.1 kts → 13.8 kts) consistent with localized bilge/tank wash discharge operations.'
        ],
        aisDataQuality: {
          pingCount: 142,
          gapDetected: false,
          anomalousSpeedDrop: true,
          spoofingProbabilityPercent: 2.1,
        },
        track: [
          { timestamp: '2026-08-28T09:00:00Z', lat: 18.520, lng: 71.650, speedKts: 14.4, courseDeg: 42, headingDeg: 42, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T10:00:00Z', lat: 18.670, lng: 71.800, speedKts: 14.1, courseDeg: 42, headingDeg: 43, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T11:00:00Z', lat: 18.800, lng: 71.930, speedKts: 11.2, courseDeg: 41, headingDeg: 42, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T11:22:00Z', lat: 18.830, lng: 71.960, speedKts: 8.1, courseDeg: 42, headingDeg: 42, navStatus: 'Underway using engine' }, // Closest approach point!
          { timestamp: '2026-08-28T12:00:00Z', lat: 18.910, lng: 72.040, speedKts: 12.8, courseDeg: 43, headingDeg: 43, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T13:00:00Z', lat: 19.090, lng: 72.180, speedKts: 13.8, courseDeg: 44, headingDeg: 44, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T14:00:00Z', lat: 19.240, lng: 72.290, speedKts: 14.0, courseDeg: 42, headingDeg: 42, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T15:00:00Z', lat: 19.410, lng: 72.420, speedKts: 14.2, courseDeg: 42, headingDeg: 42, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '636019550',
        imo: '9604128',
        vesselName: 'MV Sea Pearl',
        callsign: 'A8ZN4',
        vesselType: 'Chemical Tanker',
        flag: 'Liberia',
        flagCode: 'LR',
        lengthM: 183,
        beamM: 32,
        draughtM: 11.5,
        destination: 'MUMBAI ANCHORAGE',
        eta: '2026-08-28T18:00:00Z',
        currentPosition: { lat: 18.920, lng: 72.480 },
        minDistanceToOriginKm: 5.4,
        timeAtClosestApproach: '2026-08-28T12:45:00Z',
        closestApproachDeltaHours: 1.45,
        attributionScore: 72,
        attributionRank: 2,
        confidenceGrade: 'HIGH',
        factors: [
          {
            name: 'Spatial Proximity',
            score: 74,
            weight: 0.30,
            description: 'Vessel track passed within 5.4 km of the estimated spill origin zone.',
            evidenceSummary: 'Passed 5.4 km south-east of origin centroid',
            isPositiveIndicator: true
          },
          {
            name: 'Temporal Correlation',
            score: 70,
            weight: 0.25,
            description: 'Passage timestamp is 1 hour 20 mins after the primary estimated release window.',
            evidenceSummary: '1.45h delta from estimated discharge time',
            isPositiveIndicator: true
          },
          {
            name: 'Trajectory Consistency',
            score: 76,
            weight: 0.20,
            description: 'Crossed the peripheral drift envelope at course 088°.',
            evidenceSummary: 'Cross-cutting course intersects intermediate drift plume',
            isPositiveIndicator: true
          },
          {
            name: 'Drift Vector Consistency',
            score: 68,
            weight: 0.15,
            description: 'Position is partially offset from prime upstream current vector.',
            evidenceSummary: 'Lateral offset of 3.8 km from primary drift axis',
            isPositiveIndicator: false
          },
          {
            name: 'AIS Data Quality & Speed Profile',
            score: 82,
            weight: 0.10,
            description: 'Consistent cruising speed with no abnormal speed dips.',
            evidenceSummary: 'Maintained steady 12.4 kts',
            isPositiveIndicator: true
          }
        ],
        explainableSummary: [
          'Transited within 5.4 km of origin corridor, but timestamp is slightly later than primary discharge estimate.',
          'Course trajectory intersected the outer boundary of the hindcast uncertainty cone.',
          'Vessel type (Chemical Tanker) has high risk profile, ranking it as a secondary suspect vessel.'
        ],
        aisDataQuality: {
          pingCount: 118,
          gapDetected: false,
          anomalousSpeedDrop: false,
          spoofingProbabilityPercent: 4.8,
        },
        track: [
          { timestamp: '2026-08-28T10:00:00Z', lat: 18.720, lng: 71.600, speedKts: 12.5, courseDeg: 88, headingDeg: 88, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T11:00:00Z', lat: 18.750, lng: 71.790, speedKts: 12.4, courseDeg: 88, headingDeg: 88, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T12:00:00Z', lat: 18.780, lng: 71.990, speedKts: 12.3, courseDeg: 87, headingDeg: 88, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T12:45:00Z', lat: 18.810, lng: 72.120, speedKts: 12.2, courseDeg: 88, headingDeg: 88, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T14:00:00Z', lat: 18.860, lng: 72.320, speedKts: 11.9, courseDeg: 85, headingDeg: 86, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '563048200',
        imo: '9518742',
        vesselName: 'MV Eastern Wind',
        callsign: '9V821',
        vesselType: 'Bulk Carrier',
        flag: 'Singapore',
        flagCode: 'SG',
        lengthM: 225,
        beamM: 32,
        draughtM: 14.1,
        destination: 'GOA / MORMUGAO',
        eta: '2026-08-29T12:00:00Z',
        currentPosition: { lat: 18.350, lng: 72.100 },
        minDistanceToOriginKm: 14.8,
        timeAtClosestApproach: '2026-08-28T10:15:00Z',
        closestApproachDeltaHours: 1.15,
        attributionScore: 49,
        attributionRank: 3,
        confidenceGrade: 'MEDIUM',
        factors: [
          {
            name: 'Spatial Proximity',
            score: 48,
            weight: 0.30,
            description: 'Track maintained 14.8 km distance from reconstructed origin.',
            evidenceSummary: 'Outside the 95% confidence origin radius (4.2 km)',
            isPositiveIndicator: false
          },
          {
            name: 'Temporal Correlation',
            score: 62,
            weight: 0.25,
            description: 'Transit time was within 1.15 hours of discharge window.',
            evidenceSummary: 'Temporal overlap exists but spatial separation is high',
            isPositiveIndicator: true
          },
          {
            name: 'Trajectory Consistency',
            score: 44,
            weight: 0.20,
            description: 'Southbound heading (164°) diverges from drift axis.',
            evidenceSummary: 'Course heading 164° does not match slick formation',
            isPositiveIndicator: false
          },
          {
            name: 'Drift Vector Consistency',
            score: 38,
            weight: 0.15,
            description: 'Downwind position at T-discharge makes attribution physically improbable.',
            evidenceSummary: 'Downwind displacement from slick origin',
            isPositiveIndicator: false
          },
          {
            name: 'AIS Data Quality & Speed Profile',
            score: 88,
            weight: 0.10,
            description: 'Steady 13.5 kts transit without speed anomalies.',
            evidenceSummary: 'Normal cruising profile',
            isPositiveIndicator: true
          }
        ],
        explainableSummary: [
          'Spatial distance (14.8 km) is outside the probable discharge envelope.',
          'Downwind trajectory makes it physically improbable for discharge from this vessel to form the observed slick.',
          'Low probability suspect; retains ranking only due to temporal corridor presence.'
        ],
        aisDataQuality: {
          pingCount: 96,
          gapDetected: false,
          anomalousSpeedDrop: false,
          spoofingProbabilityPercent: 1.2,
        },
        track: [
          { timestamp: '2026-08-28T09:00:00Z', lat: 19.100, lng: 71.850, speedKts: 13.6, courseDeg: 164, headingDeg: 165, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T10:15:00Z', lat: 18.820, lng: 71.930, speedKts: 13.5, courseDeg: 164, headingDeg: 164, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T12:00:00Z', lat: 18.510, lng: 72.010, speedKts: 13.4, courseDeg: 165, headingDeg: 164, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T14:00:00Z', lat: 18.150, lng: 72.120, speedKts: 13.5, courseDeg: 164, headingDeg: 165, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '538007120',
        imo: '9714521',
        vesselName: 'MT Al-Baraka',
        callsign: 'V7XQ2',
        vesselType: 'Chemical Tanker',
        flag: 'Marshall Islands',
        flagCode: 'MH',
        lengthM: 175,
        beamM: 28,
        draughtM: 9.8,
        destination: 'FUJAIRAH',
        eta: '2026-08-31T04:00:00Z',
        currentPosition: { lat: 19.650, lng: 71.100 },
        minDistanceToOriginKm: 28.4,
        timeAtClosestApproach: '2026-08-28T08:30:00Z',
        closestApproachDeltaHours: 2.8,
        attributionScore: 28,
        attributionRank: 4,
        confidenceGrade: 'LOW',
        factors: [
          {
            name: 'Spatial Proximity',
            score: 22,
            weight: 0.30,
            description: 'Distance exceeds 28 km from probable spill origin.',
            evidenceSummary: 'Far outside boundary',
            isPositiveIndicator: false
          },
          {
            name: 'Temporal Correlation',
            score: 30,
            weight: 0.25,
            description: 'Transited area nearly 3 hours prior to release window.',
            evidenceSummary: '2.8h temporal deviation',
            isPositiveIndicator: false
          },
          {
            name: 'Trajectory Consistency',
            score: 32,
            weight: 0.20,
            description: 'North-westbound course unrelated to spill axis.',
            evidenceSummary: 'Course 310° divergent',
            isPositiveIndicator: false
          },
          {
            name: 'Drift Vector Consistency',
            score: 25,
            weight: 0.15,
            description: 'Hydrodynamic model does not support plume transport from this track.',
            evidenceSummary: 'Non-matching drift trajectory',
            isPositiveIndicator: false
          },
          {
            name: 'AIS Data Quality',
            score: 94,
            weight: 0.10,
            description: 'High quality track telemetry.',
            evidenceSummary: 'Clean AIS stream',
            isPositiveIndicator: true
          }
        ],
        explainableSummary: [
          'Vessel track and timing are incompatible with the oil slick detection.',
          'Excluded from active investigative priority.'
        ],
        aisDataQuality: {
          pingCount: 88,
          gapDetected: false,
          anomalousSpeedDrop: false,
          spoofingProbabilityPercent: 0.8,
        },
        track: [
          { timestamp: '2026-08-28T07:00:00Z', lat: 18.400, lng: 71.800, speedKts: 15.0, courseDeg: 310, headingDeg: 310, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T08:30:00Z', lat: 18.750, lng: 71.450, speedKts: 14.8, courseDeg: 310, headingDeg: 310, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T11:00:00Z', lat: 19.300, lng: 71.200, speedKts: 15.1, courseDeg: 312, headingDeg: 312, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      {
        id: 'evt-01',
        timestamp: '2026-08-28T09:00:00Z',
        timeRelative: '-5h 32m',
        category: 'AIS',
        title: 'MV Ocean Star Enters Mumbai Offshore Corridor',
        description: 'Vessel AIS registered entering Area of Interest (AoI) moving at 14.4 kts on course 042°.',
        severity: 'INFO',
        vesselMmsi: '352981000',
        coordinates: { lat: 18.520, lng: 71.650 }
      },
      {
        id: 'evt-02',
        timestamp: '2026-08-28T11:05:00Z',
        timeRelative: '-3h 27m',
        category: 'DRIFT',
        title: 'Estimated Hydrodynamic Discharge Window Begins',
        description: 'Backward drift hindcasting algorithm identifies earliest likely timestamp of illegal discharge.',
        severity: 'WARNING',
        coordinates: { lat: 18.820, lng: 71.950 }
      },
      {
        id: 'evt-03',
        timestamp: '2026-08-28T11:22:00Z',
        timeRelative: '-3h 10m',
        category: 'AIS',
        title: 'MV Ocean Star Closest Approach & Speed Anomaly',
        description: 'MV Ocean Star passes 720m from hindcast origin centroid while reducing speed from 14.2 kts to 8.1 kts.',
        severity: 'CRITICAL',
        vesselMmsi: '352981000',
        coordinates: { lat: 18.830, lng: 71.960 }
      },
      {
        id: 'evt-04',
        timestamp: '2026-08-28T12:45:00Z',
        timeRelative: '-1h 47m',
        category: 'AIS',
        title: 'MV Sea Pearl Transits Peripheral Corridor',
        description: 'Secondary candidate MV Sea Pearl passes 5.4 km south-east of origin at 12.2 kts.',
        severity: 'INFO',
        vesselMmsi: '636019550',
        coordinates: { lat: 18.810, lng: 72.120 }
      },
      {
        id: 'evt-05',
        timestamp: '2026-08-28T14:32:00Z',
        timeRelative: '0h 00m (Detection)',
        category: 'SATELLITE',
        title: 'Sentinel-1C SAR Imagery Ingestion',
        description: 'ESA Sentinel-1C synthetic aperture radar pass acquired over Mumbai offshore coordinates.',
        severity: 'INFO',
        coordinates: { lat: 18.960, lng: 72.180 }
      },
      {
        id: 'evt-06',
        timestamp: '2026-08-28T14:35:00Z',
        timeRelative: '+3m',
        category: 'AI_DETECTION',
        title: 'AI Slick Segmentation & Characterization',
        description: 'Deep U-Net segmentation identified suspected oil slick spanning 18.4 km² with 94% confidence.',
        severity: 'ALERT',
        coordinates: { lat: 18.960, lng: 72.180 }
      },
      {
        id: 'evt-07',
        timestamp: '2026-08-28T14:40:00Z',
        timeRelative: '+8m',
        category: 'DRIFT',
        title: 'Lagrangian Hindcast & Forecast Simulation Completed',
        description: 'Drift trajectory reconstructed using 14.5 kt wind and 0.85 kt current vectors. Probable origin located at 18.825°N, 71.955°E.',
        severity: 'INFO',
        coordinates: { lat: 18.825, lng: 71.955 }
      },
      {
        id: 'evt-08',
        timestamp: '2026-08-28T14:45:00Z',
        timeRelative: '+13m',
        category: 'CORRELATION',
        title: 'Spatio-Temporal AIS Attribution Ranking Generated',
        description: 'Correlated 14 vessels in AoI. MV Ocean Star ranked #1 suspect with 91% Attribution Score.',
        severity: 'CRITICAL',
        vesselMmsi: '352981000'
      }
    ],
    expertReview: {
      reviewedBy: 'Cdr. R. K. Sharma',
      reviewerRole: 'Principal Maritime Pollution Intelligence Officer',
      reviewTimestamp: '2026-08-28T15:10:00Z',
      decision: 'ACCEPTED',
      confidenceRating: 5,
      comments: 'SAR signature demonstrates classic low-backscatter dampening typical of heavy fuel oil. Hindcast physics strongly align with MV Ocean Star speed variation anomaly. Case flagged for Coast Guard intercept & port state inspection at Sikka anchorage.',
      digitalSignatureHash: '0x9f8b4c2781dae327110bc8429910d65b',
      recommendedAction: 'Dispatch CG Dornier-228 for aerial verification and notify Sikka Port State Control to initiate MARPOL Annex I inspection upon arrival.'
    },
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-28T15:10:00Z'
  },
  {
    id: 'inc-002',
    incidentCode: 'OS-2026-002',
    title: 'Bay of Bengal Chennai Shipping Lane Discharge',
    region: 'Bay of Bengal',
    subRegion: 'Coromandel Coastal Corridor (EEZ Sector 2)',
    coordinates: { lat: 13.240, lng: 80.520 },
    detectionTimestamp: '2026-08-28T08:15:00Z',
    status: 'UNDER_REVIEW',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1B Synthetic Aperture Radar',
      orbitPass: 'Ascending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1B_IW_GRDH_1SDV_20260828T081512_038102_04D11E',
      acquisitionTime: '2026-08-28T08:15:12Z',
    },
    detectionConfidence: 88,
    slick: {
      type: 'Polygon',
      coordinates: [
        [13.220, 80.490],
        [13.260, 80.525],
        [13.250, 80.550],
        [13.210, 80.520],
        [13.220, 80.490],
      ],
      center: { lat: 13.240, lng: 80.520 },
      areaKm2: 12.1,
      perimeterKm: 14.5,
      majorAxisKm: 5.2,
      minorAxisKm: 2.1,
      orientationDeg: 35,
      estimatedThicknessUm: 30,
      estimatedVolumeM3: 363,
    },
    characterization: {
      spillType: 'Suspected Bilge / Sludge Discharge',
      slickCategory: 'Feathered Streak',
      weatheringStage: 'Moderate Emulsification',
      estimatedSpillWindowStart: '2026-08-28T05:30:00Z',
      estimatedSpillWindowEnd: '2026-08-28T06:45:00Z',
    },
    environmental: {
      windSpeedKts: 11.2,
      windDirectionDeg: 195,
      currentSpeedKts: 0.65,
      currentDirectionDeg: 30,
      waveHeightM: 1.0,
      seaState: 'Smooth to Slight',
      seaSurfaceTempC: 29.2,
      waterDensityKgM3: 1023.8,
      tidePhase: 'Flood tide (+0.8m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T08:15:00Z', lat: 13.240, lng: 80.520, uncertaintyRadiusKm: 0.4, windContributionKts: 0.33, currentContributionKts: 0.65, label: 'Observed Slick Center' },
        { hourOffset: -1.5, timestamp: '2026-08-28T06:45:00Z', lat: 13.180, lng: 80.470, uncertaintyRadiusKm: 1.4, windContributionKts: 0.33, currentContributionKts: 0.65, label: 'Hindcast -1.5h' },
        { hourOffset: -2.5, timestamp: '2026-08-28T05:45:00Z', lat: 13.135, lng: 80.435, uncertaintyRadiusKm: 2.5, windContributionKts: 0.32, currentContributionKts: 0.64, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 13.135, lng: 80.435 },
        uncertaintyRadiusKm: 2.8,
        estimatedTime: '2026-08-28T05:45:00Z',
        confidencePercent: 78,
        searchRadiusNm: 4.5,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T08:15:00Z', lat: 13.240, lng: 80.520, uncertaintyRadiusKm: 0.4, windContributionKts: 0.33, currentContributionKts: 0.65 },
        { hourOffset: 6, timestamp: '2026-08-28T14:15:00Z', lat: 13.380, lng: 80.640, uncertaintyRadiusKm: 2.8, windContributionKts: 0.34, currentContributionKts: 0.66, label: 'Forecast +6h' },
        { hourOffset: 12, timestamp: '2026-08-28T20:15:00Z', lat: 13.520, lng: 80.760, uncertaintyRadiusKm: 5.4, windContributionKts: 0.35, currentContributionKts: 0.67, label: 'Forecast +12h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: false,
        nearestCoastlineKm: 24.5,
        threatenedSensitiveZones: ['Pulicat Lake Bird Sanctuary (Buffer Zone)'],
      }
    },
    topCandidateMmsi: '419001240',
    candidateVessels: [
      {
        mmsi: '419001240',
        imo: '9398840',
        vesselName: 'MT Gulf Vanguard',
        callsign: 'VTKG',
        vesselType: 'Chemical Tanker',
        flag: 'India',
        flagCode: 'IN',
        lengthM: 145,
        beamM: 24,
        draughtM: 8.9,
        destination: 'ENNORE',
        eta: '2026-08-28T16:00:00Z',
        currentPosition: { lat: 13.310, lng: 80.480 },
        minDistanceToOriginKm: 1.1,
        timeAtClosestApproach: '2026-08-28T05:50:00Z',
        closestApproachDeltaHours: 0.1,
        attributionScore: 86,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 90, weight: 0.30, description: '1.1 km from origin centroid.', evidenceSummary: 'Close passage at 05:50 UTC', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 88, weight: 0.25, description: 'Directly inside the 05:30-06:45 window.', evidenceSummary: 'Delta < 10 mins', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 84, weight: 0.20, description: 'Northbound heading parallel to slick.', evidenceSummary: 'Course 020° aligns with dispersion', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 85, weight: 0.15, description: 'Direct upstream point at estimated release time.', evidenceSummary: 'Upstream match', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 79, weight: 0.10, description: 'Good AIS continuity.', evidenceSummary: 'Clean pings', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'Vessel passed within 1.1 km of reconstructed discharge origin at 05:50 UTC.',
          'High risk profile (Chemical Tanker preparing for port entry at Ennore).',
          'Primary suspect identified for pollution response investigation.'
        ],
        aisDataQuality: { pingCount: 74, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 1.5 },
        track: [
          { timestamp: '2026-08-28T04:30:00Z', lat: 12.980, lng: 80.350, speedKts: 11.8, courseDeg: 22, headingDeg: 22, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T05:50:00Z', lat: 13.140, lng: 80.440, speedKts: 11.5, courseDeg: 21, headingDeg: 22, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T07:15:00Z', lat: 13.290, lng: 80.500, speedKts: 10.2, courseDeg: 20, headingDeg: 21, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '311000854',
        imo: '9420011',
        vesselName: 'MV Northern Aurora',
        callsign: 'C6XYZ',
        vesselType: 'Container Ship',
        flag: 'Bahamas',
        flagCode: 'BS',
        lengthM: 294,
        beamM: 32,
        draughtM: 12.2,
        destination: 'COLOMBO',
        eta: '2026-08-29T18:00:00Z',
        currentPosition: { lat: 12.950, lng: 80.650 },
        minDistanceToOriginKm: 12.4,
        timeAtClosestApproach: '2026-08-28T06:15:00Z',
        closestApproachDeltaHours: 0.5,
        attributionScore: 54,
        attributionRank: 2,
        confidenceGrade: 'MEDIUM',
        factors: [
          { name: 'Spatial Proximity', score: 50, weight: 0.30, description: '12.4 km offset.', evidenceSummary: 'Far offset', isPositiveIndicator: false },
          { name: 'Temporal Correlation', score: 68, weight: 0.25, description: 'Present during time window.', evidenceSummary: 'Temporal match', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 52, weight: 0.20, description: 'Southbound lane.', evidenceSummary: 'Divergent', isPositiveIndicator: false },
          { name: 'Drift Vector Consistency', score: 45, weight: 0.15, description: 'Downstream of slick formation.', evidenceSummary: 'Incompatible', isPositiveIndicator: false },
          { name: 'AIS Data Quality', score: 92, weight: 0.10, description: 'Steady container cruising.', evidenceSummary: 'Normal profile', isPositiveIndicator: true }
        ],
        explainableSummary: ['Maintained distance from origin. Secondary priority.'],
        aisDataQuality: { pingCount: 92, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.5 },
        track: [
          { timestamp: '2026-08-28T05:00:00Z', lat: 13.350, lng: 80.580, speedKts: 18.2, courseDeg: 195, headingDeg: 195, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T06:15:00Z', lat: 13.120, lng: 80.530, speedKts: 18.0, courseDeg: 195, headingDeg: 195, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-b1', timestamp: '2026-08-28T05:50:00Z', timeRelative: '-2h 25m', category: 'AIS', title: 'MT Gulf Vanguard Passes Origin Centroid', description: 'Chemical tanker transit recorded within 1.1 km of back-projected origin.', severity: 'WARNING', vesselMmsi: '419001240' },
      { id: 'evt-b2', timestamp: '2026-08-28T08:15:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-1B SAR Detection', description: 'Slick detected in Chennai shipping approach (12.1 km²).', severity: 'ALERT' },
      { id: 'evt-b3', timestamp: '2026-08-28T08:25:00Z', timeRelative: '+10m', category: 'CORRELATION', title: 'Attribution Matrix Generated', description: 'MT Gulf Vanguard attributed 86% probability.', severity: 'CRITICAL', vesselMmsi: '419001240' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-28T08:45:00Z'
  },
  {
    id: 'inc-003',
    incidentCode: 'OS-2026-003',
    title: 'Gulf of Kachchh Marine Ecological Zone Plume',
    region: 'Arabian Sea',
    subRegion: 'Gulf of Kachchh Ecological Buffer',
    coordinates: { lat: 22.450, lng: 69.180 },
    detectionTimestamp: '2026-08-27T19:40:00Z',
    status: 'DETECTED',
    satellite: {
      sensor: 'SENTINEL_2_MSI',
      satelliteName: 'Sentinel-2B Multi-Spectral Instrument (Optical / NIR)',
      orbitPass: 'Descending',
      resolutionMeters: 10,
      polarization: 'Multi-spectral',
      sceneId: 'S2B_MSIL2A_20260827T194021_N0500_R084',
      acquisitionTime: '2026-08-27T19:40:21Z',
    },
    detectionConfidence: 79,
    slick: {
      type: 'Polygon',
      coordinates: [
        [22.430, 69.150],
        [22.470, 69.180],
        [22.460, 69.210],
        [22.420, 69.180],
        [22.430, 69.150],
      ],
      center: { lat: 22.450, lng: 69.180 },
      areaKm2: 8.6,
      perimeterKm: 11.2,
      majorAxisKm: 4.1,
      minorAxisKm: 1.8,
      orientationDeg: 78,
      estimatedThicknessUm: 15,
      estimatedVolumeM3: 129,
    },
    characterization: {
      spillType: 'Suspected Crude Oil Wash',
      slickCategory: 'Windrow Dispersion',
      weatheringStage: 'Dispersed Sheen',
      estimatedSpillWindowStart: '2026-08-27T17:00:00Z',
      estimatedSpillWindowEnd: '2026-08-27T18:30:00Z',
    },
    environmental: {
      windSpeedKts: 8.5,
      windDirectionDeg: 270,
      currentSpeedKts: 1.4,
      currentDirectionDeg: 95,
      waveHeightM: 0.8,
      seaState: 'Smooth',
      seaSurfaceTempC: 30.1,
      waterDensityKgM3: 1025.2,
      tidePhase: 'High Spring Tide (+3.4m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-27T19:40:00Z', lat: 22.450, lng: 69.180, uncertaintyRadiusKm: 0.4, windContributionKts: 0.25, currentContributionKts: 1.4, label: 'Observed Slick Center' },
        { hourOffset: -2, timestamp: '2026-08-27T17:40:00Z', lat: 22.420, lng: 69.090, uncertaintyRadiusKm: 2.1, windContributionKts: 0.25, currentContributionKts: 1.4, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 22.420, lng: 69.090 },
        uncertaintyRadiusKm: 2.4,
        estimatedTime: '2026-08-27T17:40:00Z',
        confidencePercent: 74,
        searchRadiusNm: 3.8,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-27T19:40:00Z', lat: 22.450, lng: 69.180, uncertaintyRadiusKm: 0.4, windContributionKts: 0.25, currentContributionKts: 1.4 },
        { hourOffset: 6, timestamp: '2026-08-28T01:40:00Z', lat: 22.490, lng: 69.320, uncertaintyRadiusKm: 3.2, windContributionKts: 0.26, currentContributionKts: 1.42, label: 'Forecast +6h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: true,
        estimatedImpactTime: '2026-08-28T03:00:00Z',
        nearestCoastlineKm: 7.2,
        threatenedSensitiveZones: ['Marine National Park & Sanctuary (Coral & Mangrove Reefs)', 'Vadinar Single Point Mooring (SPM) Zone'],
      }
    },
    topCandidateMmsi: '255806010',
    candidateVessels: [
      {
        mmsi: '255806010',
        imo: '9588320',
        vesselName: 'MT Baltic Chemist',
        callsign: 'CQPB',
        vesselType: 'Chemical Tanker',
        flag: 'Portugal',
        flagCode: 'PT',
        lengthM: 160,
        beamM: 26,
        draughtM: 9.2,
        destination: 'VADINAR',
        eta: '2026-08-28T06:00:00Z',
        currentPosition: { lat: 22.480, lng: 69.240 },
        minDistanceToOriginKm: 0.85,
        timeAtClosestApproach: '2026-08-27T17:48:00Z',
        closestApproachDeltaHours: 0.13,
        attributionScore: 82,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 88, weight: 0.30, description: '850m from origin point.', evidenceSummary: 'High spatial match', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 84, weight: 0.25, description: 'Transit during release period.', evidenceSummary: 'Good temporal match', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 78, weight: 0.20, description: 'Eastward channel navigation.', evidenceSummary: 'Channel transit', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 80, weight: 0.15, description: 'Direct tidal current vector alignment.', evidenceSummary: 'Strong tidal alignment', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 80, weight: 0.10, description: 'Regular position reports.', evidenceSummary: 'Normal stream', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'Vessel navigated through high-current tidal gateway at 17:48 UTC.',
          'Threatens Marine National Park coral/mangrove sensitive coast within 6 hours.'
        ],
        aisDataQuality: { pingCount: 65, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 2.0 },
        track: [
          { timestamp: '2026-08-27T16:30:00Z', lat: 22.380, lng: 68.950, speedKts: 12.0, courseDeg: 78, headingDeg: 78, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-27T17:48:00Z', lat: 22.425, lng: 69.095, speedKts: 11.2, courseDeg: 79, headingDeg: 79, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-27T19:00:00Z', lat: 22.470, lng: 69.210, speedKts: 10.5, courseDeg: 77, headingDeg: 78, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-k1', timestamp: '2026-08-27T17:48:00Z', timeRelative: '-1h 52m', category: 'AIS', title: 'MT Baltic Chemist Channel Entry', description: 'Vessel transits 850m from probable spill source zone.', severity: 'WARNING', vesselMmsi: '255806010' },
      { id: 'evt-k2', timestamp: '2026-08-27T19:40:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-2B Optical Acquisition', description: 'Plume identified entering Marine National Park buffer zone.', severity: 'CRITICAL' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-27T20:10:00Z'
  }
];

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'alt-01',
    incidentId: 'inc-001',
    incidentCode: 'OS-2026-001',
    title: 'High-Attribution Spill Candidate: MV Ocean Star (91%)',
    category: 'HIGH_ATTRIBUTION',
    severity: 'CRITICAL',
    timestamp: '2026-08-28T14:45:00Z',
    location: 'Offshore Mumbai (18.96°N, 72.18°E)',
    coordinates: { lat: 18.960, lng: 72.180 },
    summary: 'AIS Spatio-temporal correlation identified Crude Oil Tanker MV Ocean Star (MMSI 352981000) with 91% attribution probability based on backward drift origin intercept.',
    recommendedAction: 'Alert Indian Coast Guard Regional HQ (West) & initiate Port State MARPOL inspection protocol at Sikka.',
    isRead: false,
    attributionCandidate: 'MV Ocean Star',
    attributionScore: 91
  },
  {
    id: 'alt-02',
    incidentId: 'inc-003',
    incidentCode: 'OS-2026-003',
    title: 'Coastal Risk Warning: Marine National Park Threatened',
    category: 'COASTAL_RISK',
    severity: 'HIGH',
    timestamp: '2026-08-27T20:00:00Z',
    location: 'Gulf of Kachchh (22.45°N, 69.18°E)',
    coordinates: { lat: 22.450, lng: 69.180 },
    summary: 'Forward hydrodynamic drift forecast indicates oil plume will contact sensitive coral mangrove reefs in ~5.5 hours under flood tide.',
    recommendedAction: 'Deploy containment booms and skimmers at Vadinar coastal protection barrier.',
    isRead: false
  },
  {
    id: 'alt-03',
    incidentId: 'inc-001',
    incidentCode: 'OS-2026-001',
    title: 'AIS Speed Anomaly Detected in Tanker Corridor',
    category: 'AIS_ANOMALY',
    severity: 'MEDIUM',
    timestamp: '2026-08-28T11:22:00Z',
    location: 'Mumbai Offshore Sector 4',
    coordinates: { lat: 18.830, lng: 71.960 },
    summary: 'MV Ocean Star registered a temporary speed decrease from 14.2 kts to 8.1 kts without traffic congestion, consistent with discharge activity.',
    recommendedAction: 'Cross-reference vessel engine logs and cargo ballast records.',
    isRead: true
  },
  {
    id: 'alt-04',
    incidentId: 'inc-002',
    incidentCode: 'OS-2026-002',
    title: 'Suspected Bilge Slick: Chennai Shipping Approach',
    category: 'NEW_SPILL_DETECTED',
    severity: 'MEDIUM',
    timestamp: '2026-08-28T08:20:00Z',
    location: 'Bay of Bengal (13.24°N, 80.52°E)',
    coordinates: { lat: 13.240, lng: 80.520 },
    summary: 'Sentinel-1 SAR detected 12.1 km² dark patch with 88% confidence in Coromandel shipping approach.',
    recommendedAction: 'Assign duty investigator for spatio-temporal vessel correlation review.',
    isRead: true
  }
];

// Persistent state wrapper
const STORAGE_KEY_INCIDENTS = 'oceaneye_incidents_v1';
const STORAGE_KEY_ALERTS = 'oceaneye_alerts_v1';

export class OceanEyeDataService {
  private incidents: Incident[];
  private alerts: AlertItem[];

  constructor() {
    this.incidents = this.loadIncidents();
    this.alerts = this.loadAlerts();
  }

  private loadIncidents(): Incident[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INCIDENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return JSON.parse(JSON.stringify(MOCK_INCIDENTS));
  }

  private loadAlerts(): AlertItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALERTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return JSON.parse(JSON.stringify(MOCK_ALERTS));
  }

  private saveIncidents(): void {
    try {
      localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(this.incidents));
    } catch {
      // ignore
    }
  }

  private saveAlerts(): void {
    try {
      localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(this.alerts));
    } catch {
      // ignore
    }
  }

  public getIncidents(): Incident[] {
    return [...this.incidents];
  }

  public getIncidentById(id: string): Incident | undefined {
    return this.incidents.find(inc => inc.id === id || inc.incidentCode === id);
  }

  public getAlerts(): AlertItem[] {
    return [...this.alerts];
  }

  public markAlertAsRead(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
      this.saveAlerts();
    }
  }

  public markAllAlertsRead(): void {
    this.alerts.forEach(a => { a.isRead = true; });
    this.saveAlerts();
  }

  public updateIncidentReview(incidentId: string, review: ExpertReview): Incident | undefined {
    const incident = this.incidents.find(inc => inc.id === incidentId || inc.incidentCode === incidentId);
    if (incident) {
      incident.expertReview = review;
      if (review.decision === 'ACCEPTED') {
        incident.status = 'CONFIRMED_INVESTIGATION';
      } else if (review.decision === 'REJECTED_FALSE_POSITIVE') {
        incident.status = 'FALSE_POSITIVE';
      } else if (review.decision === 'REQUEST_REANALYSIS') {
        incident.status = 'UNDER_ANALYSIS';
      }
      incident.lastUpdated = new Date().toISOString();
      
      // Add timeline event
      const newEvent: EvidenceTimelineEvent = {
        id: `evt-rev-${Date.now()}`,
        timestamp: review.reviewTimestamp,
        timeRelative: 'Just now',
        category: 'REVIEW',
        title: `Expert Review: ${review.decision === 'ACCEPTED' ? 'Finding Accepted' : review.decision === 'REJECTED_FALSE_POSITIVE' ? 'Marked False Positive' : 'Re-Analysis Requested'}`,
        description: `Reviewer ${review.reviewedBy} (${review.reviewerRole}) logged decision with rating ${review.confidenceRating}/5: "${review.comments}"`,
        severity: review.decision === 'ACCEPTED' ? 'CRITICAL' : 'INFO'
      };
      incident.evidenceTimeline.unshift(newEvent);

      this.saveIncidents();
      return { ...incident };
    }
    return undefined;
  }

  public addCustomIncident(incident: Incident): Incident {
    this.incidents.unshift(incident);
    this.saveIncidents();
    return incident;
  }

  public resetToDefaults(): void {
    this.incidents = JSON.parse(JSON.stringify(MOCK_INCIDENTS));
    this.alerts = JSON.parse(JSON.stringify(MOCK_ALERTS));
    this.saveIncidents();
    this.saveAlerts();
  }
}

export const dataService = new OceanEyeDataService();
export const initialIncidents = MOCK_INCIDENTS;
export const initialAlerts = MOCK_ALERTS;
