import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sage-600 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-white/95 text-charcoal-900',
    warning: 'border-amber-200 bg-white/95 text-charcoal-900',
    info: 'border-sage-200 bg-white/95 text-charcoal-900'
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 z-50 transition-all duration-300 transform animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-soft-xl border backdrop-blur-md max-w-md ${borderColors[toast.type] || borderColors.success}`}>
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
      </div>
    </div>
  );
}
