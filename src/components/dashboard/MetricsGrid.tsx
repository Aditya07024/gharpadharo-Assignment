'use client';

import React from 'react';
import { Calendar, Users, Clock, ArrowUpRight, IndianRupee } from 'lucide-react';
import { INITIAL_METRICS } from '@/data/mockData';
import { MetricCardData } from '@/types';

export const MetricsGrid: React.FC = () => {
  const getIcon = (type: MetricCardData['iconType']) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-5 h-5 text-emerald-700" />;
      case 'users':
        return <Users className="w-5 h-5 text-amber-600" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-teal-600" />;
      case 'revenue':
        return <IndianRupee className="w-5 h-5 text-amber-700" />;
      default:
        return <Calendar className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {INITIAL_METRICS.map((metric) => (
        <div
          key={metric.id}
          className="p-5 rounded-2xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          {/* Card Icon Header */}
          <div className="flex items-center justify-between mb-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${metric.iconBgColor}`}>
              {getIcon(metric.iconType)}
            </div>
          </div>

          {/* Title and Big Value */}
          <div>
            <span className="text-xs font-semibold text-[#64748B] block mb-1">
              {metric.title}
            </span>
            <div className="text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight">
              {metric.value}
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-emerald-600">
            <div className="flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{metric.trend}</span>
            </div>
            <span className="text-[#94A3B8] font-normal">{metric.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
