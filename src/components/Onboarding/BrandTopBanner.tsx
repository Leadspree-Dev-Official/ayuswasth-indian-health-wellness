import React, { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { formatCountdown, encodeDemoToken } from '../../utils/brandUtils';
import { Sparkles, Building2, Phone, MapPin, Clock, Share2, Palette, Check, ChevronUp, ChevronDown } from 'lucide-react';

export const BrandTopBanner: React.FC = () => {
  const { brandProfile, isCustomized, timeRemainingMs, setIsModalOpen, showToast } = useBrand();
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCopyLink = () => {
    const token = encodeDemoToken(brandProfile);
    const shareUrl = `${window.location.origin}${window.location.pathname}?demo=${token}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('🔗 Personalized Demo Link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  if (isCollapsed) {
    return (
      <div className="bg-stone-900 text-stone-200 text-xs py-1 px-4 border-b border-amber-800/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white">{brandProfile.businessName}</span>
          <span className="text-[10px] text-stone-400 font-mono">
            ({formatCountdown(timeRemainingMs)})
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-amber-300 hover:underline flex items-center gap-1 text-[11px] font-bold"
        >
          Expand Brand Bar <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-amber-800/40 py-2 px-4 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Info Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{brandProfile.businessName}</span>
            {isCustomized && (
              <span className="text-[10px] bg-amber-900/80 text-amber-300 border border-amber-600/40 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                Custom Demo
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-stone-400">
            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{brandProfile.phone}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-stone-400">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate max-w-xs">{brandProfile.address}</span>
          </div>

        </div>

        {/* Right Actions & Countdown */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Live Countdown Pill */}
          <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold text-amber-300">
            <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>Resets in {formatCountdown(timeRemainingMs)}</span>
          </div>

          {/* Share Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors text-[11px] font-medium"
            title="Copy URL with personalized brand token"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-amber-400" />}
            <span>{copied ? 'Copied' : 'Share Link'}</span>
          </button>

          {/* Customize Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-bold transition-all text-[11px] shadow-2xs"
          >
            <Palette className="w-3 h-3 text-amber-200" />
            <span>Customize Demo</span>
          </button>

          {/* Collapse */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-stone-400 hover:text-white rounded"
            title="Minimize Bar"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
};
