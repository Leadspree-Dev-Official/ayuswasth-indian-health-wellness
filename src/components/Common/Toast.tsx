import React, { useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useBrand();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className="bg-stone-900/95 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-md flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-800/80 text-amber-200 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div className="flex-1 text-xs sm:text-sm font-medium leading-snug text-stone-200">
          {toastMessage}
        </div>
        <button
          onClick={hideToast}
          className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
