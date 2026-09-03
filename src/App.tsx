/**
 * Maritime Oil Spill Intelligence - Main Application Container
 * AI Oil Spill Detection, Hydrodynamic Drift Hindcasting & AIS Vessel Attribution Platform
 */

import React, { useState } from 'react';
import { Incident, AISVessel, AlertItem, ExpertReview } from './types';
import { initialIncidents, initialAlerts } from './services/dataService';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

// Feature Views
import { MainDashboard } from './components/dashboard/MainDashboard';
import { DetectionStudio } from './components/detection/DetectionStudio';
import { DriftStudio } from './components/drift/DriftStudio';
import { VesselAttributionStudio } from './components/attribution/VesselAttributionStudio';
import { LiveMonitoringView } from './components/monitoring/LiveMonitoringView';
import { EvidenceTimelineView } from './components/timeline/EvidenceTimelineView';
import { AlertsManager } from './components/alerts/AlertsManager';
import { IncidentLogbook } from './components/incidents/IncidentLogbook';
import { InvestigationReportView } from './components/reports/InvestigationReportView';
import { SystemArchitectureView } from './components/architecture/SystemArchitectureView';

// Modals
import { ExpertReviewModal } from './components/review/ExpertReviewModal';
import { SignOffSuccessModal } from './components/review/SignOffSuccessModal';

export const App: React.FC = () => {
  // Application Data States
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [currentIncident, setCurrentIncident] = useState<Incident>(initialIncidents[0]);
  const [selectedVessel, setSelectedVessel] = useState<AISVessel | null>(
    initialIncidents[0].candidateVessels[0] || null
  );
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isSignOffSuccessOpen, setIsSignOffSuccessOpen] = useState<boolean>(false);
  const [lastSubmittedReview, setLastSubmittedReview] = useState<ExpertReview | null>(null);

  // When switching current incident, reset selected vessel to top candidate
  const handleSelectIncident = (incident: Incident) => {
    setCurrentIncident(incident);
    setSelectedVessel(incident.candidateVessels[0] || null);
  };

  const handleSelectVessel = (vessel: AISVessel) => {
    setSelectedVessel(vessel);
  };

  // Submit human expert investigator review
  const handleSubmitReview = (incidentId: string, review: ExpertReview) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(inc => {
        if (inc.id === incidentId) {
          const updatedTimeline = [
            ...inc.evidenceTimeline,
            {
              id: `evt_rev_${Date.now()}`,
              timestamp: review.reviewTimestamp,
              timeRelative: 'Just now',
              title: `Officer Review Completed: ${review.decision}`,
              description: `Duty investigator ${review.reviewedBy} endorsed assessment with ${review.confidenceRating}/5 star confidence. Signature hash: ${review.digitalSignatureHash}`,
              category: 'REVIEW' as const,
              severity: 'CRITICAL' as const
            }
          ];

          return {
            ...inc,
            status: review.decision === 'ACCEPTED' ? 'CONFIRMED_INVESTIGATION' : inc.status,
            expertReview: review,
            evidenceTimeline: updatedTimeline
          };
        }
        return inc;
      })
    );

    // Also update current incident
    setCurrentIncident(prev => {
      if (prev.id === incidentId) {
        return {
          ...prev,
          status: review.decision === 'ACCEPTED' ? 'CONFIRMED_INVESTIGATION' : prev.status,
          expertReview: review,
          evidenceTimeline: [
            ...prev.evidenceTimeline,
            {
              id: `evt_rev_${Date.now()}`,
              timestamp: review.reviewTimestamp,
              timeRelative: 'Just now',
              title: `Officer Review Completed: ${review.decision}`,
              description: `Duty investigator ${review.reviewedBy} endorsed assessment with ${review.confidenceRating}/5 star confidence. Signature hash: ${review.digitalSignatureHash}`,
              category: 'REVIEW' as const,
              severity: 'CRITICAL' as const
            }
          ]
        };
      }
      return prev;
    });

    // Add notification alert to logbook
    const targetIncident = incidents.find(i => i.id === incidentId) || currentIncident;
    const newAlert: AlertItem = {
      id: `alert_rev_${Date.now()}`,
      incidentId,
      incidentCode: targetIncident.incidentCode,
      title: `Investigator Sign-Off: ${review.decision === 'ACCEPTED' ? 'Endorsed & Authenticated' : review.decision}`,
      category: 'REVIEW_REQUIRED',
      severity: 'LOW',
      timestamp: review.reviewTimestamp,
      location: targetIncident.region,
      coordinates: targetIncident.coordinates,
      summary: `${review.reviewedBy} (${review.reviewerRole}) submitted official sign-off with ${review.confidenceRating}/5 star confidence. Digital hash: ${review.digitalSignatureHash.slice(0, 12)}...`,
      recommendedAction: review.recommendedAction,
      isRead: false
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Save submitted review and trigger on-screen Success Popup
    setLastSubmittedReview(review);
    setIsSignOffSuccessOpen(true);
  };

  // Mark alerts as acknowledged
  const handleMarkAlertRead = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, isRead: true } : a))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      {/* Top Tactical Command Header */}
      <Header
        incidents={incidents}
        currentIncident={currentIncident}
        onSelectIncident={handleSelectIncident}
        alerts={alerts}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenReviewModal={() => setIsReviewModalOpen(true)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab as any}
          onSelectTab={setActiveTab}
          unreadAlertsCount={alerts.filter(a => !a.isRead).length}
        />

        {/* Dynamic Center Viewport */}
        <main className="flex-1 overflow-y-auto pb-16 transition-colors duration-200">
          {activeTab === 'dashboard' && (
            <MainDashboard
              currentIncident={currentIncident}
              incidents={incidents}
              alerts={alerts}
              onSelectIncident={handleSelectIncident}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectVessel={handleSelectVessel}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          )}

          {activeTab === 'live_monitoring' && (
            <LiveMonitoringView
              currentIncident={currentIncident}
              selectedVessel={selectedVessel}
              onSelectVessel={handleSelectVessel}
              onNavigateToAttribution={() => setActiveTab('attribution')}
            />
          )}

          {activeTab === 'detection' && (
            <DetectionStudio
              currentIncident={currentIncident}
              onNavigateToDrift={() => setActiveTab('drift')}
            />
          )}

          {activeTab === 'drift' && (
            <DriftStudio
              currentIncident={currentIncident}
              onNavigateToAttribution={() => setActiveTab('attribution')}
            />
          )}

          {activeTab === 'attribution' && (
            <VesselAttributionStudio
              currentIncident={currentIncident}
              selectedVessel={selectedVessel}
              onSelectVessel={handleSelectVessel}
              onNavigateToReport={() => setActiveTab('reports')}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          )}

          {activeTab === 'timeline' && (
            <EvidenceTimelineView
              currentIncident={currentIncident}
              onNavigateToReport={() => setActiveTab('reports')}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsManager
              alerts={alerts}
              incidents={incidents}
              onSelectIncident={handleSelectIncident}
              onMarkRead={handleMarkAlertRead}
              onMarkAllRead={handleMarkAllAlertsRead}
              onNavigateToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'incidents' && (
            <IncidentLogbook
              incidents={incidents}
              currentIncident={currentIncident}
              onSelectIncident={handleSelectIncident}
              onNavigateToDashboard={() => setActiveTab('dashboard')}
              onNavigateToReport={() => setActiveTab('reports')}
            />
          )}

          {activeTab === 'reports' && (
            <InvestigationReportView
              currentIncident={currentIncident}
            />
          )}

          {activeTab === 'architecture' && (
            <SystemArchitectureView />
          )}
        </main>
      </div>

      {/* Human Investigator Review Modal */}
      <ExpertReviewModal
        incident={currentIncident}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Investigator Sign-off Successfully Submitted Pop-up Modal */}
      <SignOffSuccessModal
        isOpen={isSignOffSuccessOpen}
        onClose={() => setIsSignOffSuccessOpen(false)}
        review={lastSubmittedReview || currentIncident.expertReview || null}
        incident={currentIncident}
        onViewReport={() => {
          setIsSignOffSuccessOpen(false);
          setActiveTab('reports');
        }}
      />
    </div>
  );
};

export default App;
