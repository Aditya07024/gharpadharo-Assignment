'use client';

import React from 'react';
import { CreditCard, Check, Sparkles, ShieldCheck, Download } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const BillingView: React.FC = () => {
  const { showToast } = useCalendar();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Current Plan Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
            Active Subscription
          </span>
          <h1 className="text-2xl font-extrabold text-[#1E293B] mt-2">Starter Plan</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Includes up to 100 monthly bookings, Google Calendar sync, and standard support.
          </p>
        </div>
        <button
          onClick={() => showToast('Upgrading to Pro Plan...')}
          className="px-6 py-3 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Upgrade to Pro</span>
        </button>
      </div>

      {/* Plan Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Starter Plan Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-[#1E293B]">Starter Plan</h3>
            <div className="text-2xl font-extrabold text-[#1E293B] mt-1">Free</div>
            <span className="text-xs text-slate-500">Free forever</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Up to 100 monthly bookings</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Google Calendar synchronization</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Standard meeting types</span>
            </li>
          </ul>
        </div>

        {/* Pro Plan Card */}
        <div className="p-6 rounded-3xl bg-[#EAF4EF] border border-[#1B4D3E]/30 shadow-md space-y-4 relative overflow-hidden">
          <div className="border-b border-[#1B4D3E]/20 pb-4">
            <h3 className="text-base font-bold text-[#1E293B]">Pro Plan (Recommended)</h3>
            <div className="text-2xl font-extrabold text-[#1B4D3E] mt-1">₹1,499 / mo</div>
            <span className="text-xs text-slate-600">Billed annually or monthly</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-800 font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Unlimited monthly bookings</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Custom domain & branding</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Stripe paid booking integration</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1B4D3E]" />
              <span>Team availability routing</span>
            </li>
          </ul>
          <button
            onClick={() => showToast('Upgrading to Pro Plan...')}
            className="w-full py-3 px-4 rounded-full bg-[#1B4D3E] text-white text-xs font-bold hover:bg-[#143C30] transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E293B]">Billing Invoices</h2>
        <div className="divide-y divide-slate-100 text-xs">
          {[
            { date: 'May 01, 2025', invoice: 'INV-2025-001', amount: '₹0.00', status: 'Paid' },
            { date: 'Apr 01, 2025', invoice: 'INV-2025-000', amount: '₹0.00', status: 'Paid' },
          ].map((inv) => (
            <div key={inv.invoice} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800">{inv.invoice}</span>
                <span className="text-slate-500 block text-[11px]">{inv.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-700">{inv.amount}</span>
                <button
                  onClick={() => showToast(`Downloaded invoice ${inv.invoice}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
