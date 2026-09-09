'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface NewMeetingButtonProps {
  onClick: () => void;
}

export const NewMeetingButton: React.FC<NewMeetingButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3.5 px-6 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
    >
      <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
      <span>+ New Meeting</span>
    </button>
  );
};
