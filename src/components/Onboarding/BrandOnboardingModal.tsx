import React, { useState, useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { COLOR_PRESETS, encodeDemoToken, formatCountdown } from '../../utils/brandUtils';
import { Sparkles, Building2, User, Phone, MapPin, Palette, Share2, Clock, Check, X, ShieldAlert } from 'lucide-react';

export const BrandOnboardingModal: React.FC = () => {
  const {
    brandProfile,
    isModalOpen,
    setIsModalOpen,
    updateBrandProfile,
    timeRemainingMs,
    showToast,
    siteSettings,
  } = useBrand();

  const [businessName, setBusinessName] = useState(brandProfile.businessName);
  const [contactName, setContactName] = useState(brandProfile.contactName);
  const [phone, setPhone] = useState(brandProfile.phone);
  const [address, setAddress] = useState(brandProfile.address);
  const [primaryColor, setPrimaryColor] = useState(brandProfile.primaryColor);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setBusinessName(brandProfile.businessName || siteSettings.defaultBusinessName);
      setContactName(brandProfile.contactName || siteSettings.defaultContactName);
      setPhone(brandProfile.phone || siteSettings.defaultPhone);
      setAddress(brandProfile.address || siteSettings.defaultAddress);
      setPrimaryColor(brandProfile.primaryColor || siteSettings.defaultPrimaryColor);
    }
  }, [isModalOpen, brandProfile, siteSettings]);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandProfile({
      businessName,
      contactName,
      phone,
      address,
      primaryColor,
    });
    setIsModalOpen(false);
  };

  const handleShareLink = () => {
    const token = encodeDemoToken({
      businessName,
      contactName,
      phone,
      address,
      primaryColor,
    });

    const shareUrl = `${window.location.origin}${window.location.pathname}?demo=${token}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('🔗 Personalized Demo Link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 bg-stone-900/95 text-stone-100 rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
        
        {/* Header & Close */}
        <div className="flex items-start justify-between border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Design Your Brand Demo
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Personalize This Healthcare Platform
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-sans">
              Enter your organization details to transform the live preview into your custom branded demo.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 rounded-full transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy & Live Countdown Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-700/50 text-amber-200 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              <strong>Session Policy:</strong> Form opens on visit & auto-resets every 3 hours.
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Current Session:</span>
            </div>
            <span className="font-mono font-bold text-emerald-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-lg border border-emerald-600/40">
              {brandProfile.submittedAt > 0 ? formatCountdown(timeRemainingMs) : '3h 00m 00s'}
            </span>
          </div>
        </div>

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Business Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Business / Clinic Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sanjeevani Ayurvedic Center"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Contact Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Dr. Rajesh Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Phone Number / WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Phone Number / WhatsApp *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Business Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Business Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. MG Road, Bengaluru, KA"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

          </div>

          {/* Theme Color Picker Section */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                Custom Primary Brand Theme Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-20 px-2 py-1 text-center font-mono text-xs rounded-lg bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Color Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOR_PRESETS.map((preset) => {
                const isSelected = primaryColor.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <button
                    type="button"
                    key={preset.hex}
                    onClick={() => setPrimaryColor(preset.hex)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                      isSelected
                        ? 'border-amber-400 bg-amber-950/60 text-white shadow-sm ring-1 ring-amber-400'
                        : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span className="truncate">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <button
              type="button"
              onClick={handleShareLink}
              className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold text-amber-300 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              {copied ? 'Link Copied!' : 'Share Personalized Demo Link'}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-xl text-xs font-medium text-stone-400 hover:text-white bg-stone-950 border border-stone-800 hover:bg-stone-900 transition-colors"
              >
                Skip for Now
              </button>

              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                Apply & Preview Brand Demo
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
