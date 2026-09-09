'use client';

import React, { useState } from 'react';
import { X, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

interface UpgradeProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeProModal: React.FC<UpgradeProModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useCalendar();
  const [isAnnual, setIsAnnual] = useState(true);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    showToast('🎉 Congratulations! You have successfully upgraded to MeetPlan Pro!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B4D3E] text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Upgrade to MeetPlan Pro</h3>
              <p className="text-[11px] text-slate-500">Unlock premium scheduling features</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Monthly / Annual Billing Toggle */}
          <div className="flex items-center justify-center gap-3 p-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E5DE] max-w-xs mx-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                !isAnnual ? 'bg-[#1B4D3E] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                isAnnual ? 'bg-[#1B4D3E] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              <span>Annual</span>
              <span className="text-[9px] bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full font-extrabold">
                -20%
              </span>
            </button>
          </div>

          {/* Pricing display */}
          <div className="text-center">
            <div className="text-3xl font-extrabold text-[#1B4D3E]">
              {isAnnual ? '₹1,199' : '₹1,499'}{' '}
              <span className="text-xs font-normal text-slate-500">/ month</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {isAnnual ? 'Billed annually at ₹14,388/yr' : 'Billed monthly, cancel anytime'}
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Unlimited monthly bookings & custom meeting links</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Custom branding & white-label domain</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Stripe payment gateway integration for paid calls</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Team routing & round-robin scheduling</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>24/7 Priority support & SLA</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleUpgrade}
            className="w-full py-3.5 px-4 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Confirm Pro Upgrade</span>
          </button>
        </div>
      </div>
    </div>
  );
};
