/**
 * SpillTrace AI - Investigator Sign-Off Success Confirmation Modal
 * Pops up after the user clicks "Sign off & Authenticate" in the Human-in-the-Loop review
 */

import React, { useState, useEffect } from 'react';
import { Incident, ExpertReview } from '../../types';
import {
  CheckCircle2,
  ShieldCheck,
  FileText,
  X,
  Copy,
  Check,
  Star,
  UserCheck,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SignOffSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: ExpertReview | null;
  incident: Incident;
  onViewReport?: () => void;
}

export const SignOffSuccessModal: React.FC<SignOffSuccessModalProps> = ({
  isOpen,
  onClose,
  review,
  incident,
  onViewReport
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !review) return null;

  const handleCopyHash = () => {
    if (review.digitalSignatureHash) {
      navigator.clipboard.writeText(review.digitalSignatureHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const getDecisionBadge = () => {
    switch (review.decision) {
      case 'ACCEPTED':
        return {
          bg: 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80',
          dot: 'bg-emerald-400',
          label: 'Finding Accepted & Endorsed'
        };
      case 'REQUEST_REANALYSIS':
        return {
          bg: 'bg-amber-950/90 text-amber-300 border-amber-700/80',
          dot: 'bg-amber-400',
          label: 'Re-Analysis Requested'
        };
      case 'REJECTED_FALSE_POSITIVE':
        return {
          bg: 'bg-rose-950/90 text-rose-300 border-rose-700/80',
          dot: 'bg-rose-400',
          label: 'False Positive Discarded'
        };
      default:
        return {
          bg: 'bg-neutral-900 text-neutral-300 border-neutral-700',
          dot: 'bg-cyan-400',
          label: review.decision
        };
    }
  };

  const decisionInfo = getDecisionBadge();

  return (
    <div
      id="signoff-success-popup-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="signoff-success-popup-card"
        onClick={e => e.stopPropagation()}
        className="bento-card border border-emerald-500/40 bg-neutral-950 shadow-2xl shadow-emerald-950/50 w-full max-w-lg overflow-hidden text-xs relative animate-in zoom-in-95 duration-200"
      >
        {/* Top Decorative Success Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Close Button */}
        <button
          id="close-success-popup-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header with Success Badge */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-13 h-13 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Authentication Verified
                </span>
              </div>
              <h2 className="text-lg font-black text-white tracking-tight leading-snug">
                Successfully Submitted
              </h2>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Investigator sign-off and cryptographic verification have been officially logged for incident{' '}
                <span className="font-mono text-cyan-300 font-semibold">{incident.incidentCode}</span>.
              </p>
            </div>
          </div>

          {/* Submission Verification Summary Box */}
          <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
              <span className="text-neutral-400 font-medium">Review Status:</span>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${decisionInfo.bg}`}>
                <span className={`w-2 h-2 rounded-full ${decisionInfo.dot}`}></span>
                <span>{decisionInfo.label}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">
                  Reviewing Officer
                </span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{review.reviewedBy}</span>
                </span>
                <span className="text-neutral-400 text-[10px] block truncate mt-0.5">
                  {review.reviewerRole}
                </span>
              </div>

              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">
                  Investigator Confidence
                </span>
                <div className="flex items-center gap-1 text-amber-400 mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= review.confidenceRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  ))}
                  <span className="text-neutral-300 font-mono text-[10px] ml-1">
                    {review.confidenceRating}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Cryptographic Signature Hash */}
            <div className="pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Digital Signature Hash
                </span>
                <span className="text-[9px] text-emerald-400 font-mono uppercase bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                  SHA-256 Validated
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-black/60 border border-neutral-800 rounded-lg px-2.5 py-1.5">
                <span className="font-mono text-cyan-300 text-[10.5px] truncate">
                  {review.digitalSignatureHash}
                </span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 flex items-center gap-1 text-[10px]"
                  title="Copy signature hash"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Timestamp */}
            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-500" />
                <span>Recorded Timestamp:</span>
              </span>
              <span className="font-mono text-neutral-300">
                {new Date(review.reviewTimestamp).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Recommended Operational Action Preview */}
          {review.recommendedAction && (
            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-neutral-300 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                Next Operational Action:
              </span>
              <p className="line-clamp-2 text-neutral-300 text-[10.5px] leading-relaxed">
                {review.recommendedAction}
              </p>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            {onViewReport && (
              <button
                id="success-popup-view-report-btn"
                type="button"
                onClick={onViewReport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white font-medium border border-neutral-800 hover:border-neutral-700 transition-all text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Official Dossier</span>
                <ArrowRight className="w-3 h-3 text-neutral-500" />
              </button>
            )}
            <button
              id="success-popup-done-btn"
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all text-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
