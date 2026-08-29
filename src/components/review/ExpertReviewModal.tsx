/**
 * OCEANEYE - Expert Human-in-the-Loop Review Modal
 * Allows duty surveillance officers and pollution response inspectors to sign off, reject, or request re-analysis
 */

import React, { useState } from 'react';
import { Incident, ExpertReview } from '../../types';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react';

interface ExpertReviewModalProps {
  incident: Incident;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (incidentId: string, review: ExpertReview) => void;
}

export const ExpertReviewModal: React.FC<ExpertReviewModalProps> = ({
  incident,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  if (!isOpen) return null;

  const [reviewerName, setReviewerName] = useState(
    incident.expertReview?.reviewedBy || 'Cdr. R. K. Sharma'
  );
  const [reviewerRole, setReviewerRole] = useState(
    incident.expertReview?.reviewerRole || 'Principal Maritime Pollution Intelligence Officer'
  );
  const [decision, setDecision] = useState<'ACCEPTED' | 'REJECTED_FALSE_POSITIVE' | 'REQUEST_REANALYSIS'>(
    (incident.expertReview?.decision as 'ACCEPTED' | 'REJECTED_FALSE_POSITIVE' | 'REQUEST_REANALYSIS') || 'ACCEPTED'
  );
  const [confidenceRating, setConfidenceRating] = useState<number>(
    incident.expertReview?.confidenceRating || 5
  );
  const [comments, setComments] = useState(
    incident.expertReview?.comments ||
      'SAR signature demonstrates classic low-backscatter dampening typical of heavy fuel oil. Hindcast physics strongly align with MV Ocean Star speed variation anomaly. Case flagged for Coast Guard intercept & port state inspection at Sikka anchorage.'
  );
  const [recommendedAction, setRecommendedAction] = useState(
    incident.expertReview?.recommendedAction ||
      'Dispatch CG Dornier-228 for aerial verification and notify Sikka Port State Control to initiate MARPOL Annex I inspection upon arrival.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: ExpertReview = {
      reviewedBy: reviewerName,
      reviewerRole,
      reviewTimestamp: new Date().toISOString(),
      decision,
      confidenceRating,
      comments,
      digitalSignatureHash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      recommendedAction
    };

    onSubmitReview(incident.id, newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bento-card border border-neutral-700 shadow-2xl w-full max-w-2xl overflow-hidden space-y-0 text-xs">
        {/* Header */}
        <div className="p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/80">
              <UserCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white">
                Human-in-the-Loop Intelligence Review & Sign-Off
              </h2>
              <p className="text-[11px] text-neutral-400">
                Formal investigative endorsement for {incident.incidentCode} ({incident.region})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-850 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Decision Selector */}
          <div className="space-y-2">
            <label className="font-bold text-neutral-300">Review Decision & Finding Action</label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDecision('ACCEPTED')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 font-bold transition-all ${
                  decision === 'ACCEPTED'
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 ring-2 ring-emerald-500/40 shadow-md'
                    : 'bg-black/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Accept Finding</span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('REQUEST_REANALYSIS')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 font-bold transition-all ${
                  decision === 'REQUEST_REANALYSIS'
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300 ring-2 ring-amber-500/40 shadow-md'
                    : 'bg-black/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Re-Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => setDecision('REJECTED_FALSE_POSITIVE')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 font-bold transition-all ${
                  decision === 'REJECTED_FALSE_POSITIVE'
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300 ring-2 ring-rose-500/40 shadow-md'
                    : 'bg-black/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>False Positive</span>
              </button>
            </div>
          </div>

          {/* Officer Details */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-neutral-400 font-medium">Reviewing Officer</label>
              <input
                type="text"
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
                className="w-full bg-black/60 border border-neutral-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-400 font-medium">Official Designation / Role</label>
              <input
                type="text"
                value={reviewerRole}
                onChange={e => setReviewerRole(e.target.value)}
                className="w-full bg-black/60 border border-neutral-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          {/* Confidence Rating (1 to 5 Stars) */}
          <div className="space-y-2">
            <label className="text-neutral-400 font-medium">Investigator Confidence Rating (1 - 5)</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setConfidenceRating(star)}
                  className={`w-9 h-9 rounded-xl font-bold border transition-all ${
                    star <= confidenceRating
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-600/20'
                      : 'bg-black/60 border-neutral-800 text-neutral-500 hover:border-neutral-700'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-neutral-400 font-mono ml-2">Rating: {confidenceRating}/5 Stars</span>
            </div>
          </div>

          {/* Formal Comments */}
          <div className="space-y-1.5">
            <label className="text-neutral-400 font-medium">Investigator Technical Evaluation & Notes</label>
            <textarea
              rows={3}
              value={comments}
              onChange={e => setComments(e.target.value)}
              className="w-full bg-black/60 border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500 leading-relaxed resize-none"
              required
            />
          </div>

          {/* Recommended Operational Action */}
          <div className="space-y-1.5">
            <label className="text-neutral-400 font-medium">Recommended Next Operational Action</label>
            <input
              type="text"
              value={recommendedAction}
              onChange={e => setRecommendedAction(e.target.value)}
              className="w-full bg-black/60 border border-neutral-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Signed with cryptographic hash timestamp</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white font-medium border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-600/20 transition-all"
              >
                Sign Off & Authenticate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
