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
  },
  {
    id: 'inc-004',
    incidentCode: 'OS-2026-004',
    title: 'Goa Mormugao Port Approach & Iron-Ore Corridor Spill',
    region: 'Goa Coast (Arabian Sea)',
    subRegion: 'Mormugao Anchorage & Konkan Shipping Zone',
    coordinates: { lat: 15.420, lng: 73.680 },
    detectionTimestamp: '2026-08-28T16:20:00Z',
    status: 'CONFIRMED_INVESTIGATION',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1C Synthetic Aperture Radar',
      orbitPass: 'Descending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1C_IW_GRDH_1SDV_20260828T162015_046112_058A9F',
      acquisitionTime: '2026-08-28T16:20:15Z',
    },
    detectionConfidence: 93,
    slick: {
      type: 'Polygon',
      coordinates: [
        [15.440, 73.650],
        [15.460, 73.690],
        [15.435, 73.720],
        [15.405, 73.680],
        [15.415, 73.645],
        [15.440, 73.650],
      ],
      center: { lat: 15.420, lng: 73.680 },
      areaKm2: 14.8,
      perimeterKm: 16.9,
      majorAxisKm: 5.8,
      minorAxisKm: 2.6,
      orientationDeg: 54,
      estimatedThicknessUm: 35,
      estimatedVolumeM3: 518,
    },
    characterization: {
      spillType: 'Suspected Mineral Heavy Fuel Oil',
      slickCategory: 'Continuous Dark Patch',
      weatheringStage: 'Fresh Discharge',
      estimatedSpillWindowStart: '2026-08-28T13:30:00Z',
      estimatedSpillWindowEnd: '2026-08-28T14:45:00Z',
    },
    environmental: {
      windSpeedKts: 13.0,
      windDirectionDeg: 235,
      currentSpeedKts: 0.90,
      currentDirectionDeg: 45,
      waveHeightM: 1.2,
      seaState: 'Moderate',
      seaSurfaceTempC: 28.9,
      waterDensityKgM3: 1024.1,
      tidePhase: 'Ebb Tide (+1.1m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T16:20:00Z', lat: 15.420, lng: 73.680, uncertaintyRadiusKm: 0.4, windContributionKts: 0.39, currentContributionKts: 0.90, label: 'Observed Slick Center (T=0)' },
        { hourOffset: -1.5, timestamp: '2026-08-28T14:50:00Z', lat: 15.375, lng: 73.620, uncertaintyRadiusKm: 1.4, windContributionKts: 0.39, currentContributionKts: 0.90, label: 'Hindcast -1.5h' },
        { hourOffset: -2.8, timestamp: '2026-08-28T13:32:00Z', lat: 15.335, lng: 73.565, uncertaintyRadiusKm: 2.6, windContributionKts: 0.38, currentContributionKts: 0.88, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 15.335, lng: 73.565 },
        uncertaintyRadiusKm: 3.1,
        estimatedTime: '2026-08-28T13:30:00Z to 14:15:00Z',
        confidencePercent: 84,
        searchRadiusNm: 5.2,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T16:20:00Z', lat: 15.420, lng: 73.680, uncertaintyRadiusKm: 0.4, windContributionKts: 0.39, currentContributionKts: 0.90 },
        { hourOffset: 6, timestamp: '2026-08-28T22:20:00Z', lat: 15.490, lng: 73.780, uncertaintyRadiusKm: 2.9, windContributionKts: 0.40, currentContributionKts: 0.92, label: 'Forecast +6h' },
        { hourOffset: 12, timestamp: '2026-08-29T04:20:00Z', lat: 15.560, lng: 73.880, uncertaintyRadiusKm: 5.6, windContributionKts: 0.41, currentContributionKts: 0.94, label: 'Forecast +12h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: true,
        estimatedImpactTime: '2026-08-29T06:30:00Z',
        nearestCoastlineKm: 11.4,
        threatenedSensitiveZones: ['Mormugao Harbor Approaches', 'Grand Island Coral Reef & Tourist Marine Reserve', 'Dona Paula Bay'],
      }
    },
    topCandidateMmsi: '354120980',
    candidateVessels: [
      {
        mmsi: '354120980',
        imo: '9481235',
        vesselName: 'MV Goa Pioneer',
        callsign: '3FYK',
        vesselType: 'Bulk Carrier',
        flag: 'Panama',
        flagCode: 'PA',
        lengthM: 228,
        beamM: 32,
        draughtM: 12.8,
        destination: 'MORMUGAO',
        eta: '2026-08-28T18:00:00Z',
        currentPosition: { lat: 15.430, lng: 73.740 },
        minDistanceToOriginKm: 0.92,
        timeAtClosestApproach: '2026-08-28T13:45:00Z',
        closestApproachDeltaHours: 0.15,
        attributionScore: 89,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 92, weight: 0.30, description: '920m from hindcast origin centroid.', evidenceSummary: 'Close passage near origin', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 90, weight: 0.25, description: 'Directly in the 13:30-14:45 release window.', evidenceSummary: 'Timing match within 15 min', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 86, weight: 0.20, description: 'Course 055° perfectly matching slick elongation.', evidenceSummary: 'Vector orientation match', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 88, weight: 0.15, description: 'Oceanographic surface flow tracks from vessel position.', evidenceSummary: 'Upstream current alignment', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 85, weight: 0.10, description: 'Continuous transponder signals with minor speed jitter.', evidenceSummary: 'Clean AIS stream', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'Vessel transited 920m from origin centroid at 13:45 UTC during iron ore anchorage queue.',
          'Speed decreased unexpectedly from 12.4 kts to 6.2 kts during transit.',
          'High priority candidate for Mormugao Port State Control & Coast Guard inspection.'
        ],
        aisDataQuality: { pingCount: 78, gapDetected: false, anomalousSpeedDrop: true, spoofingProbabilityPercent: 1.2 },
        track: [
          { timestamp: '2026-08-28T12:00:00Z', lat: 15.240, lng: 73.420, speedKts: 12.4, courseDeg: 55, headingDeg: 55, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T13:45:00Z', lat: 15.340, lng: 73.570, speedKts: 6.2, courseDeg: 54, headingDeg: 55, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T15:30:00Z', lat: 15.420, lng: 73.710, speedKts: 8.5, courseDeg: 56, headingDeg: 56, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '636015770',
        imo: '9312088',
        vesselName: 'MT Mandovi Star',
        callsign: 'A8QK',
        vesselType: 'Chemical Tanker',
        flag: 'Liberia',
        flagCode: 'LR',
        lengthM: 183,
        beamM: 28,
        draughtM: 10.1,
        destination: 'MANGALORE',
        eta: '2026-08-29T02:00:00Z',
        currentPosition: { lat: 15.150, lng: 73.850 },
        minDistanceToOriginKm: 8.4,
        timeAtClosestApproach: '2026-08-28T14:20:00Z',
        closestApproachDeltaHours: 0.6,
        attributionScore: 56,
        attributionRank: 2,
        confidenceGrade: 'MEDIUM',
        factors: [
          { name: 'Spatial Proximity', score: 55, weight: 0.30, description: '8.4 km offset from origin.', evidenceSummary: 'Peripheral transit', isPositiveIndicator: false },
          { name: 'Temporal Correlation', score: 72, weight: 0.25, description: 'In vicinity during spill window.', evidenceSummary: 'Moderate temporal match', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 50, weight: 0.20, description: 'Southbound coastal course.', evidenceSummary: 'Divergent heading', isPositiveIndicator: false },
          { name: 'Drift Vector Consistency', score: 48, weight: 0.15, description: 'Downstream corridor.', evidenceSummary: 'Low hydrodynamic correlation', isPositiveIndicator: false },
          { name: 'AIS Data Quality', score: 90, weight: 0.10, description: 'Stable AIS track without anomalies.', evidenceSummary: 'Regular transmission', isPositiveIndicator: true }
        ],
        explainableSummary: ['Maintained standard transit lane 8.4 km south. Secondary correlation.'],
        aisDataQuality: { pingCount: 84, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.4 },
        track: [
          { timestamp: '2026-08-28T13:00:00Z', lat: 15.550, lng: 73.650, speedKts: 13.8, courseDeg: 165, headingDeg: 165, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T14:20:00Z', lat: 15.280, lng: 73.740, speedKts: 13.6, courseDeg: 165, headingDeg: 165, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-g1', timestamp: '2026-08-28T13:45:00Z', timeRelative: '-2h 35m', category: 'AIS', title: 'MV Goa Pioneer Slows Near Mormugao Approach', description: 'Capesize bulker slows to 6.2 kts at 920m from reconstructed origin.', severity: 'WARNING', vesselMmsi: '354120980' },
      { id: 'evt-g2', timestamp: '2026-08-28T16:20:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-1C SAR Ingestion (Goa Waters)', description: 'Synthetic Aperture Radar detects 14.8 km² slick heading toward Mormugao harbor.', severity: 'ALERT' },
      { id: 'evt-g3', timestamp: '2026-08-28T16:30:00Z', timeRelative: '+10m', category: 'CORRELATION', title: 'AI Attribution Complete: MV Goa Pioneer (89%)', description: 'Strong spatial-temporal correlation with Goa Port approaches.', severity: 'CRITICAL', vesselMmsi: '354120980' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-28T16:35:00Z'
  },
  {
    id: 'inc-005',
    incidentCode: 'OS-2026-005',
    title: 'Kerala Malabar Coast & Kochi SPM Channel Spill',
    region: 'Kerala Coast (Arabian Sea)',
    subRegion: 'Kochi Offshore SPM & Malabar Marine Corridor',
    coordinates: { lat: 9.940, lng: 75.980 },
    detectionTimestamp: '2026-08-28T18:10:00Z',
    status: 'CONFIRMED_INVESTIGATION',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1A Synthetic Aperture Radar',
      orbitPass: 'Ascending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1A_IW_GRDH_1SDV_20260828T181022_051201_062C7B',
      acquisitionTime: '2026-08-28T18:10:22Z',
    },
    detectionConfidence: 95,
    slick: {
      type: 'Polygon',
      coordinates: [
        [9.960, 75.950],
        [9.980, 76.010],
        [9.940, 76.040],
        [9.910, 75.990],
        [9.920, 75.940],
        [9.960, 75.950],
      ],
      center: { lat: 9.940, lng: 75.980 },
      areaKm2: 16.2,
      perimeterKm: 18.1,
      majorAxisKm: 6.4,
      minorAxisKm: 2.8,
      orientationDeg: 68,
      estimatedThicknessUm: 40,
      estimatedVolumeM3: 648,
    },
    characterization: {
      spillType: 'Suspected Crude Oil Wash',
      slickCategory: 'Continuous Dark Patch',
      weatheringStage: 'Fresh Discharge',
      estimatedSpillWindowStart: '2026-08-28T15:20:00Z',
      estimatedSpillWindowEnd: '2026-08-28T16:40:00Z',
    },
    environmental: {
      windSpeedKts: 15.2,
      windDirectionDeg: 250,
      currentSpeedKts: 0.95,
      currentDirectionDeg: 70,
      waveHeightM: 1.4,
      seaState: 'Moderate',
      seaSurfaceTempC: 29.5,
      waterDensityKgM3: 1023.9,
      tidePhase: 'Flood Tide (+1.4m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T18:10:00Z', lat: 9.940, lng: 75.980, uncertaintyRadiusKm: 0.4, windContributionKts: 0.45, currentContributionKts: 0.95, label: 'Observed Slick Center' },
        { hourOffset: -1.5, timestamp: '2026-08-28T16:40:00Z', lat: 9.890, lng: 75.910, uncertaintyRadiusKm: 1.3, windContributionKts: 0.45, currentContributionKts: 0.95, label: 'Hindcast -1.5h' },
        { hourOffset: -2.6, timestamp: '2026-08-28T15:34:00Z', lat: 9.850, lng: 75.845, uncertaintyRadiusKm: 2.4, windContributionKts: 0.44, currentContributionKts: 0.93, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 9.850, lng: 75.845 },
        uncertaintyRadiusKm: 2.9,
        estimatedTime: '2026-08-28T15:30:00Z to 16:15:00Z',
        confidencePercent: 88,
        searchRadiusNm: 4.8,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T18:10:00Z', lat: 9.940, lng: 75.980, uncertaintyRadiusKm: 0.4, windContributionKts: 0.45, currentContributionKts: 0.95 },
        { hourOffset: 6, timestamp: '2026-08-29T00:10:00Z', lat: 10.020, lng: 76.090, uncertaintyRadiusKm: 3.1, windContributionKts: 0.46, currentContributionKts: 0.97, label: 'Forecast +6h' },
        { hourOffset: 12, timestamp: '2026-08-29T06:10:00Z', lat: 10.100, lng: 76.190, uncertaintyRadiusKm: 6.0, windContributionKts: 0.47, currentContributionKts: 0.99, label: 'Forecast +12h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: true,
        estimatedImpactTime: '2026-08-29T04:30:00Z',
        nearestCoastlineKm: 8.5,
        threatenedSensitiveZones: ['Kochi Port Single Point Mooring (SPM) Zone', 'Vembanad Lake Estuarine Fisheries & Mangroves', 'Fort Kochi Heritage Beach'],
      }
    },
    topCandidateMmsi: '636018440',
    candidateVessels: [
      {
        mmsi: '636018440',
        imo: '9429112',
        vesselName: 'MT Malabar Express',
        callsign: 'A8ZY',
        vesselType: 'Crude Oil Tanker',
        flag: 'Liberia',
        flagCode: 'LR',
        lengthM: 244,
        beamM: 42,
        draughtM: 14.5,
        destination: 'KOCHI SPM',
        eta: '2026-08-28T20:00:00Z',
        currentPosition: { lat: 9.960, lng: 76.020 },
        minDistanceToOriginKm: 0.75,
        timeAtClosestApproach: '2026-08-28T15:48:00Z',
        closestApproachDeltaHours: 0.12,
        attributionScore: 92,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 95, weight: 0.30, description: '750m from hindcast origin centroid.', evidenceSummary: 'Extremely close proximity', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 93, weight: 0.25, description: 'Transit exactly at estimated discharge window peak.', evidenceSummary: 'Delta < 8 mins', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 90, weight: 0.20, description: 'Heading 068° aligned with slick expansion.', evidenceSummary: 'Vector orientation match', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 91, weight: 0.15, description: 'Tidal flood current aligns directly with vessel wake.', evidenceSummary: 'Full hydrodynamic alignment', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 86, weight: 0.10, description: 'High ping density during approach.', evidenceSummary: 'Dense transponder feed', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'Crude oil tanker navigated within 750m of origin centroid at 15:48 UTC.',
          'Vessel preparing for Single Point Mooring (SPM) discharge at Kochi.',
          'Identified as primary suspect with 92% confidence attribution.'
        ],
        aisDataQuality: { pingCount: 96, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.8 },
        track: [
          { timestamp: '2026-08-28T14:00:00Z', lat: 9.720, lng: 75.680, speedKts: 13.5, courseDeg: 68, headingDeg: 68, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T15:48:00Z', lat: 9.855, lng: 75.850, speedKts: 12.1, courseDeg: 68, headingDeg: 68, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T17:30:00Z', lat: 9.945, lng: 75.990, speedKts: 9.8, courseDeg: 69, headingDeg: 69, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '419000880',
        imo: '9385540',
        vesselName: 'MV Cochin Pride',
        callsign: 'AWKR',
        vesselType: 'Container Ship',
        flag: 'India',
        flagCode: 'IN',
        lengthM: 195,
        beamM: 30,
        draughtM: 10.5,
        destination: 'VALLARPADAM',
        eta: '2026-08-28T19:30:00Z',
        currentPosition: { lat: 9.980, lng: 76.080 },
        minDistanceToOriginKm: 7.2,
        timeAtClosestApproach: '2026-08-28T16:10:00Z',
        closestApproachDeltaHours: 0.45,
        attributionScore: 58,
        attributionRank: 2,
        confidenceGrade: 'MEDIUM',
        factors: [
          { name: 'Spatial Proximity', score: 58, weight: 0.30, description: '7.2 km north of origin.', evidenceSummary: 'Separate container fairway', isPositiveIndicator: false },
          { name: 'Temporal Correlation', score: 75, weight: 0.25, description: 'In vicinity during spill window.', evidenceSummary: 'Temporal overlap', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 55, weight: 0.20, description: 'Inbound Vallarpadam container terminal course.', evidenceSummary: 'Standard fairway', isPositiveIndicator: false },
          { name: 'Drift Vector Consistency', score: 50, weight: 0.15, description: 'Cross-current navigation.', evidenceSummary: 'Partial vector match', isPositiveIndicator: false },
          { name: 'AIS Data Quality', score: 94, weight: 0.10, description: 'Continuous verified AIS tracking.', evidenceSummary: 'Clean signal', isPositiveIndicator: true }
        ],
        explainableSummary: ['Passed in parallel container fairway. Non-conclusive correlation.'],
        aisDataQuality: { pingCount: 91, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.3 },
        track: [
          { timestamp: '2026-08-28T15:00:00Z', lat: 9.880, lng: 75.800, speedKts: 14.5, courseDeg: 72, headingDeg: 72, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T16:10:00Z', lat: 9.920, lng: 75.910, speedKts: 13.8, courseDeg: 71, headingDeg: 71, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-kl1', timestamp: '2026-08-28T15:48:00Z', timeRelative: '-2h 22m', category: 'AIS', title: 'MT Malabar Express Enters Kochi SPM Corridor', description: 'Crude carrier passes within 750m of origin centroid at 12.1 kts.', severity: 'WARNING', vesselMmsi: '636018440' },
      { id: 'evt-kl2', timestamp: '2026-08-28T18:10:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-1A SAR Detection (Kerala Waters)', description: 'Radar pass reveals 16.2 km² plume threatening Vembanad estuarine mouth.', severity: 'ALERT' },
      { id: 'evt-kl3', timestamp: '2026-08-28T18:25:00Z', timeRelative: '+15m', category: 'CORRELATION', title: 'Attribution Matrix: MT Malabar Express (92%)', description: 'High correlation with Kochi refinery SPM approach trajectory.', severity: 'CRITICAL', vesselMmsi: '636018440' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-28T18:30:00Z'
  },
  {
    id: 'inc-006',
    incidentCode: 'OS-2026-006',
    title: 'Lakshadweep Nine Degree Channel & Kavaratti Atoll Discharge',
    region: 'Lakshadweep Sea',
    subRegion: 'Nine Degree Channel & Kavaratti Marine Biosphere',
    coordinates: { lat: 10.560, lng: 72.620 },
    detectionTimestamp: '2026-08-28T21:45:00Z',
    status: 'CONFIRMED_INVESTIGATION',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1C Synthetic Aperture Radar',
      orbitPass: 'Descending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1C_IW_GRDH_1SDV_20260828T214510_048912_059E3C',
      acquisitionTime: '2026-08-28T21:45:10Z',
    },
    detectionConfidence: 96,
    slick: {
      type: 'Polygon',
      coordinates: [
        [10.580, 72.590],
        [10.610, 72.640],
        [10.570, 72.670],
        [10.530, 72.620],
        [10.540, 72.580],
        [10.580, 72.590],
      ],
      center: { lat: 10.560, lng: 72.620 },
      areaKm2: 21.5,
      perimeterKm: 23.4,
      majorAxisKm: 7.9,
      minorAxisKm: 3.4,
      orientationDeg: 82,
      estimatedThicknessUm: 45,
      estimatedVolumeM3: 967,
    },
    characterization: {
      spillType: 'Suspected Crude Oil Wash',
      slickCategory: 'Continuous Dark Patch',
      weatheringStage: 'Fresh Discharge',
      estimatedSpillWindowStart: '2026-08-28T18:30:00Z',
      estimatedSpillWindowEnd: '2026-08-28T19:50:00Z',
    },
    environmental: {
      windSpeedKts: 16.5,
      windDirectionDeg: 260,
      currentSpeedKts: 1.10,
      currentDirectionDeg: 85,
      waveHeightM: 1.6,
      seaState: 'Moderate to Rough',
      seaSurfaceTempC: 29.8,
      waterDensityKgM3: 1023.7,
      tidePhase: 'Spring Tide Flow (+1.2m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T21:45:00Z', lat: 10.560, lng: 72.620, uncertaintyRadiusKm: 0.4, windContributionKts: 0.50, currentContributionKts: 1.10, label: 'Observed Slick Center' },
        { hourOffset: -1.8, timestamp: '2026-08-28T19:57:00Z', lat: 10.510, lng: 72.525, uncertaintyRadiusKm: 1.6, windContributionKts: 0.50, currentContributionKts: 1.10, label: 'Hindcast -1.8h' },
        { hourOffset: -3.0, timestamp: '2026-08-28T18:45:00Z', lat: 10.470, lng: 72.445, uncertaintyRadiusKm: 2.8, windContributionKts: 0.49, currentContributionKts: 1.08, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 10.470, lng: 72.445 },
        uncertaintyRadiusKm: 3.4,
        estimatedTime: '2026-08-28T18:30:00Z to 19:15:00Z',
        confidencePercent: 91,
        searchRadiusNm: 5.8,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-28T21:45:00Z', lat: 10.560, lng: 72.620, uncertaintyRadiusKm: 0.4, windContributionKts: 0.50, currentContributionKts: 1.10 },
        { hourOffset: 6, timestamp: '2026-08-29T03:45:00Z', lat: 10.645, lng: 72.760, uncertaintyRadiusKm: 3.4, windContributionKts: 0.51, currentContributionKts: 1.12, label: 'Forecast +6h' },
        { hourOffset: 12, timestamp: '2026-08-29T09:45:00Z', lat: 10.730, lng: 72.900, uncertaintyRadiusKm: 6.8, windContributionKts: 0.52, currentContributionKts: 1.14, label: 'Forecast +12h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: true,
        estimatedImpactTime: '2026-08-29T05:00:00Z',
        nearestCoastlineKm: 6.8,
        threatenedSensitiveZones: ['Kavaratti Island Coral Atoll & Lagoon', 'Suheli Par Marine Turtle Nesting Sanctuary', 'Agatti Reef Marine Biodiversity Zone'],
      }
    },
    topCandidateMmsi: '538008710',
    candidateVessels: [
      {
        mmsi: '538008710',
        imo: '9651084',
        vesselName: 'MT Coral Navigator',
        callsign: 'V7XW',
        vesselType: 'Crude Oil Tanker',
        flag: 'Marshall Islands',
        flagCode: 'MH',
        lengthM: 333,
        beamM: 60,
        draughtM: 20.5,
        destination: 'SINGAPORE',
        eta: '2026-09-02T12:00:00Z',
        currentPosition: { lat: 10.590, lng: 72.700 },
        minDistanceToOriginKm: 0.68,
        timeAtClosestApproach: '2026-08-28T18:50:00Z',
        closestApproachDeltaHours: 0.08,
        attributionScore: 94,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 96, weight: 0.30, description: '680m from reconstructed discharge origin.', evidenceSummary: 'Critical spatial overlap', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 95, weight: 0.25, description: 'Transited origin point at 18:50 UTC.', evidenceSummary: 'Perfect temporal fit', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 92, weight: 0.20, description: 'Course 084° in Nine Degree Channel matches plume axis.', evidenceSummary: 'Vector orientation match', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 94, weight: 0.15, description: 'Eastward equatorial drift perfectly aligns with track.', evidenceSummary: 'Hydrodynamic match', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 88, weight: 0.10, description: 'Continuous AIS tracking in international channel.', evidenceSummary: 'Solid AIS signal', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'VLCC Supertanker transited within 680m of origin centroid at 18:50 UTC in Nine Degree Channel.',
          'Spill threatens highly vulnerable coral atolls of Kavaratti and Suheli Par.',
          'Urgent coastal protection and international maritime notification required.'
        ],
        aisDataQuality: { pingCount: 104, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.5 },
        track: [
          { timestamp: '2026-08-28T17:00:00Z', lat: 10.380, lng: 72.180, speedKts: 15.2, courseDeg: 84, headingDeg: 84, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T18:50:00Z', lat: 10.475, lng: 72.450, speedKts: 14.8, courseDeg: 84, headingDeg: 84, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T20:30:00Z', lat: 10.550, lng: 72.680, speedKts: 15.0, courseDeg: 85, headingDeg: 85, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-lk1', timestamp: '2026-08-28T18:50:00Z', timeRelative: '-2h 55m', category: 'AIS', title: 'MT Coral Navigator Transits Nine Degree Channel', description: 'VLCC Supertanker passes within 680m of reconstructed origin centroid.', severity: 'WARNING', vesselMmsi: '538008710' },
      { id: 'evt-lk2', timestamp: '2026-08-28T21:45:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-1C SAR Ingestion (Lakshadweep Waters)', description: 'High-backscatter dampening indicates 21.5 km² slick approaching Kavaratti Atoll.', severity: 'ALERT' },
      { id: 'evt-lk3', timestamp: '2026-08-28T22:00:00Z', timeRelative: '+15m', category: 'CORRELATION', title: 'Attribution Score 94% Generated for MT Coral Navigator', description: 'Highest correlation recorded in Nine Degree Channel transit lane.', severity: 'CRITICAL', vesselMmsi: '538008710' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-28T22:05:00Z'
  },
  {
    id: 'inc-007',
    incidentCode: 'OS-2026-007',
    title: 'Andaman-Nicobar Six Degree Channel Malacca Gateway Plume',
    region: 'Andaman & Nicobar (Andaman Sea)',
    subRegion: 'Great Nicobar Six Degree Channel (Malacca Gateway)',
    coordinates: { lat: 6.920, lng: 93.750 },
    detectionTimestamp: '2026-08-29T02:30:00Z',
    status: 'CONFIRMED_INVESTIGATION',
    satellite: {
      sensor: 'SENTINEL_1_SAR',
      satelliteName: 'Sentinel-1C Synthetic Aperture Radar',
      orbitPass: 'Ascending',
      resolutionMeters: 10,
      polarization: 'VV + VH',
      sceneId: 'S1C_IW_GRDH_1SDV_20260829T023018_052340_064B11',
      acquisitionTime: '2026-08-29T02:30:18Z',
    },
    detectionConfidence: 97,
    slick: {
      type: 'Polygon',
      coordinates: [
        [6.950, 93.710],
        [6.980, 93.770],
        [6.930, 93.810],
        [6.890, 93.760],
        [6.900, 93.700],
        [6.950, 93.710],
      ],
      center: { lat: 6.920, lng: 93.750 },
      areaKm2: 26.8,
      perimeterKm: 28.6,
      majorAxisKm: 9.2,
      minorAxisKm: 3.8,
      orientationDeg: 72,
      estimatedThicknessUm: 50,
      estimatedVolumeM3: 1340,
    },
    characterization: {
      spillType: 'Suspected Mineral Heavy Fuel Oil',
      slickCategory: 'Continuous Dark Patch',
      weatheringStage: 'Fresh Discharge',
      estimatedSpillWindowStart: '2026-08-28T23:15:00Z',
      estimatedSpillWindowEnd: '2026-08-29T00:45:00Z',
    },
    environmental: {
      windSpeedKts: 18.0,
      windDirectionDeg: 245,
      currentSpeedKts: 1.25,
      currentDirectionDeg: 65,
      waveHeightM: 1.8,
      seaState: 'Rough (Beaufort 5)',
      seaSurfaceTempC: 30.2,
      waterDensityKgM3: 1023.2,
      tidePhase: 'Equatorial Flow (+1.6m)',
    },
    drift: {
      hindcastPoints: [
        { hourOffset: 0, timestamp: '2026-08-29T02:30:00Z', lat: 6.920, lng: 93.750, uncertaintyRadiusKm: 0.4, windContributionKts: 0.54, currentContributionKts: 1.25, label: 'Observed Slick Center' },
        { hourOffset: -1.8, timestamp: '2026-08-29T00:42:00Z', lat: 6.860, lng: 93.640, uncertaintyRadiusKm: 1.7, windContributionKts: 0.54, currentContributionKts: 1.25, label: 'Hindcast -1.8h' },
        { hourOffset: -3.2, timestamp: '2026-08-28T23:18:00Z', lat: 6.810, lng: 93.535, uncertaintyRadiusKm: 3.1, windContributionKts: 0.53, currentContributionKts: 1.22, label: 'Probable Origin Zone' }
      ],
      probableOrigin: {
        center: { lat: 6.810, lng: 93.535 },
        uncertaintyRadiusKm: 3.8,
        estimatedTime: '2026-08-28T23:15:00Z to 00:05:00Z',
        confidencePercent: 93,
        searchRadiusNm: 6.8,
      },
      forecastPoints: [
        { hourOffset: 0, timestamp: '2026-08-29T02:30:00Z', lat: 6.920, lng: 93.750, uncertaintyRadiusKm: 0.4, windContributionKts: 0.54, currentContributionKts: 1.25 },
        { hourOffset: 6, timestamp: '2026-08-29T08:30:00Z', lat: 7.020, lng: 93.910, uncertaintyRadiusKm: 3.8, windContributionKts: 0.55, currentContributionKts: 1.28, label: 'Forecast +6h' },
        { hourOffset: 12, timestamp: '2026-08-29T14:30:00Z', lat: 7.120, lng: 94.070, uncertaintyRadiusKm: 7.4, windContributionKts: 0.56, currentContributionKts: 1.30, label: 'Forecast +12h' }
      ],
      coastalImpactRisk: {
        willImpactCoast: true,
        estimatedImpactTime: '2026-08-29T10:00:00Z',
        nearestCoastlineKm: 14.2,
        threatenedSensitiveZones: ['Great Nicobar Biosphere Reserve', 'Galathea National Park (Leatherback Turtle Sanctuary)', 'Campbell Bay Marine Coral Zone'],
      }
    },
    topCandidateMmsi: '563009220',
    candidateVessels: [
      {
        mmsi: '563009220',
        imo: '9783410',
        vesselName: 'MV Andaman Voyager',
        callsign: '9V881',
        vesselType: 'Container Ship',
        flag: 'Singapore',
        flagCode: 'SG',
        lengthM: 399,
        beamM: 59,
        draughtM: 16.0,
        destination: 'PORT KLANG',
        eta: '2026-08-29T22:00:00Z',
        currentPosition: { lat: 6.960, lng: 93.840 },
        minDistanceToOriginKm: 0.82,
        timeAtClosestApproach: '2026-08-28T23:35:00Z',
        closestApproachDeltaHours: 0.1,
        attributionScore: 93,
        attributionRank: 1,
        confidenceGrade: 'HIGH',
        factors: [
          { name: 'Spatial Proximity', score: 95, weight: 0.30, description: '820m from hindcast origin centroid in Six Degree Channel.', evidenceSummary: 'Close channel transit', isPositiveIndicator: true },
          { name: 'Temporal Correlation', score: 94, weight: 0.25, description: 'Transit timing perfectly inside estimated release window.', evidenceSummary: 'Delta < 10 mins', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 92, weight: 0.20, description: 'East-northeast course 072° directly aligns with slick path.', evidenceSummary: 'Vector orientation match', isPositiveIndicator: true },
          { name: 'Drift Vector Consistency', score: 93, weight: 0.15, description: 'Strong equatorial current vector supports backward track.', evidenceSummary: 'Ocean model alignment', isPositiveIndicator: true },
          { name: 'AIS Data Quality', score: 90, weight: 0.10, description: 'High-integrity satellite-AIS feed in deep water corridor.', evidenceSummary: 'Clean satellite AIS', isPositiveIndicator: true }
        ],
        explainableSummary: [
          'Ultra Large Container Vessel transited within 820m of origin centroid at 23:35 UTC entering Malacca Strait.',
          'Plume is 26.8 km² in area and threatens Great Nicobar Biosphere Reserve & Galathea National Park.',
          'International notice issued to Singapore PSC and Indian Coast Guard A&N Command.'
        ],
        aisDataQuality: { pingCount: 112, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.6 },
        track: [
          { timestamp: '2026-08-28T21:30:00Z', lat: 6.680, lng: 93.280, speedKts: 19.5, courseDeg: 72, headingDeg: 72, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-28T23:35:00Z', lat: 6.815, lng: 93.540, speedKts: 19.1, courseDeg: 72, headingDeg: 72, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-29T01:45:00Z', lat: 6.930, lng: 93.780, speedKts: 18.8, courseDeg: 73, headingDeg: 73, navStatus: 'Underway using engine' }
        ]
      },
      {
        mmsi: '352994000',
        imo: '9458902',
        vesselName: 'MT Nicobar Pearl',
        callsign: '3FYQ',
        vesselType: 'Crude Oil Tanker',
        flag: 'Panama',
        flagCode: 'PA',
        lengthM: 250,
        beamM: 44,
        draughtM: 14.8,
        destination: 'SINGAPORE',
        eta: '2026-08-30T06:00:00Z',
        currentPosition: { lat: 6.780, lng: 93.920 },
        minDistanceToOriginKm: 9.8,
        timeAtClosestApproach: '2026-08-29T00:15:00Z',
        closestApproachDeltaHours: 0.65,
        attributionScore: 52,
        attributionRank: 2,
        confidenceGrade: 'MEDIUM',
        factors: [
          { name: 'Spatial Proximity', score: 50, weight: 0.30, description: '9.8 km south of origin.', evidenceSummary: 'Peripheral lane', isPositiveIndicator: false },
          { name: 'Temporal Correlation', score: 70, weight: 0.25, description: 'In vicinity during spill period.', evidenceSummary: 'Moderate temporal match', isPositiveIndicator: true },
          { name: 'Trajectory Consistency', score: 52, weight: 0.20, description: 'Eastbound heading.', evidenceSummary: 'Parallel course', isPositiveIndicator: false },
          { name: 'Drift Vector Consistency', score: 46, weight: 0.15, description: 'Cross-current offset.', evidenceSummary: 'Low vector match', isPositiveIndicator: false },
          { name: 'AIS Data Quality', score: 92, weight: 0.10, description: 'Continuous AIS.', evidenceSummary: 'Clean stream', isPositiveIndicator: true }
        ],
        explainableSummary: ['Passed in secondary south channel. Excluded from primary attribution.'],
        aisDataQuality: { pingCount: 88, gapDetected: false, anomalousSpeedDrop: false, spoofingProbabilityPercent: 0.4 },
        track: [
          { timestamp: '2026-08-28T22:30:00Z', lat: 6.650, lng: 93.420, speedKts: 14.2, courseDeg: 78, headingDeg: 78, navStatus: 'Underway using engine' },
          { timestamp: '2026-08-29T00:15:00Z', lat: 6.720, lng: 93.680, speedKts: 14.0, courseDeg: 77, headingDeg: 77, navStatus: 'Underway using engine' }
        ]
      }
    ],
    evidenceTimeline: [
      { id: 'evt-an1', timestamp: '2026-08-28T23:35:00Z', timeRelative: '-2h 55m', category: 'AIS', title: 'MV Andaman Voyager Transits Six Degree Channel', description: 'Ultra Large Container Ship passes within 820m of origin centroid at 19.1 kts.', severity: 'WARNING', vesselMmsi: '563009220' },
      { id: 'evt-an2', timestamp: '2026-08-29T02:30:00Z', timeRelative: '0h 00m', category: 'SATELLITE', title: 'Sentinel-1C SAR Ingestion (Andaman-Nicobar)', description: 'Critical 26.8 km² slick identified entering Great Nicobar Biosphere zone.', severity: 'ALERT' },
      { id: 'evt-an3', timestamp: '2026-08-29T02:45:00Z', timeRelative: '+15m', category: 'CORRELATION', title: 'Attribution Matrix Generated: MV Andaman Voyager (93%)', description: 'Highest correlation in Malacca Western Approaches.', severity: 'CRITICAL', vesselMmsi: '563009220' }
    ],
    isDemoData: true,
    isSimulated: true,
    lastUpdated: '2026-08-29T02:50:00Z'
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
    id: 'alt-05',
    incidentId: 'inc-006',
    incidentCode: 'OS-2026-006',
    title: 'Critical Threat: Kavaratti Coral Atoll & Nine Degree Channel (94%)',
    category: 'COASTAL_RISK',
    severity: 'CRITICAL',
    timestamp: '2026-08-28T22:00:00Z',
    location: 'Lakshadweep Sea (10.56°N, 72.62°E)',
    coordinates: { lat: 10.560, lng: 72.620 },
    summary: '21.5 km² slick from MT Coral Navigator approaching Kavaratti lagoon and Suheli Par turtle sanctuary within 7 hours.',
    recommendedAction: 'Dispatch Coast Guard pollution response vessel (ICGS Samudra Prahari) with containment booms.',
    isRead: false,
    attributionCandidate: 'MT Coral Navigator',
    attributionScore: 94
  },
  {
    id: 'alt-06',
    incidentId: 'inc-007',
    incidentCode: 'OS-2026-007',
    title: 'Great Nicobar Biosphere Reserve Impact Alert (93%)',
    category: 'COASTAL_RISK',
    severity: 'CRITICAL',
    timestamp: '2026-08-29T02:45:00Z',
    location: 'Andaman & Nicobar (6.92°N, 93.75°E)',
    coordinates: { lat: 6.920, lng: 93.750 },
    summary: 'High volume 26.8 km² slick in Six Degree Channel entering Malacca approaches; MV Andaman Voyager attributed 93%.',
    recommendedAction: 'Alert Andaman & Nicobar Command (ANC) and Singapore Port State Control.',
    isRead: false,
    attributionCandidate: 'MV Andaman Voyager',
    attributionScore: 93
  },
  {
    id: 'alt-07',
    incidentId: 'inc-005',
    incidentCode: 'OS-2026-005',
    title: 'Kerala Coast: Kochi SPM Crude Tanker Spill (92%)',
    category: 'HIGH_ATTRIBUTION',
    severity: 'HIGH',
    timestamp: '2026-08-28T18:25:00Z',
    location: 'Kerala Coast (9.94°N, 75.98°E)',
    coordinates: { lat: 9.940, lng: 75.980 },
    summary: '16.2 km² plume identified in Kochi Single Point Mooring channel; MT Malabar Express attributed 92%.',
    recommendedAction: 'Initiate joint inspection with Cochin Port Trust & Kerala State Pollution Control Board.',
    isRead: false,
    attributionCandidate: 'MT Malabar Express',
    attributionScore: 92
  },
  {
    id: 'alt-08',
    incidentId: 'inc-004',
    incidentCode: 'OS-2026-004',
    title: 'Goa Mormugao Port Approach Heavy Fuel Spill (89%)',
    category: 'HIGH_ATTRIBUTION',
    severity: 'HIGH',
    timestamp: '2026-08-28T16:30:00Z',
    location: 'Goa Coast (15.42°N, 73.68°E)',
    coordinates: { lat: 15.420, lng: 73.680 },
    summary: '14.8 km² slick heading toward Mormugao harbor and Grand Island reef; MV Goa Pioneer attributed 89%.',
    recommendedAction: 'Deploy Mormugao Port emergency skimmers and notify Goa State Disaster Management.',
    isRead: false,
    attributionCandidate: 'MV Goa Pioneer',
    attributionScore: 89
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
const STORAGE_KEY_INCIDENTS = 'oceaneye_incidents_v2';
const STORAGE_KEY_ALERTS = 'oceaneye_alerts_v2';

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
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= MOCK_INCIDENTS.length) {
          return parsed;
        }
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
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= MOCK_ALERTS.length) {
          return parsed;
        }
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
