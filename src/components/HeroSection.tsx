import React from 'react';
import { HeartPulse, Utensils, Activity, Leaf, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PrakritiScore } from '../types';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenQuiz: () => void;
  prakritiScore: PrakritiScore | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenQuiz,
  prakritiScore,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-stone-50 to-amber-100/30 pt-10 pb-16 border-b border-amber-900/5">
      
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-medium tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
              <span>Authentic Vedic Wisdom • Modern AI Science</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight tracking-tight">
              Harmonize Body & Mind with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-700 to-emerald-800">Swastha Ayurveda</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover your unique Ayurvedic Prakriti (Vata, Pitta, Kapha), experience personalized Sattvic meal plans, guided Pranayama breathwork, and time-tested Indian herbal remedies.
            </p>

            {/* Sub Quote */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-950 font-serif italic text-sm max-w-xl mx-auto lg:mx-0 shadow-2xs">
              "Ayurveda teaches us that health is not merely the absence of disease, but a state of supreme physical, mental, and spiritual bliss (Swastha)."
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 hover:from-amber-800 hover:to-orange-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <HeartPulse className="w-4 h-4 text-amber-200" />
                {prakritiScore ? `View ${prakritiScore.dominant.toUpperCase()} Profile` : 'Take Free Prakriti Test'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('aahar')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200/80 border border-stone-300 transition-all"
              >
                <Utensils className="w-4 h-4 text-amber-700" />
                Explore Sattvic Meals
              </button>
            </div>

            {/* Badges & Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600 font-medium border-t border-stone-200/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Sattvic & Plant-Rich</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Tridoshic Balanced Formulations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Instant AI Vaidya Guidance</span>
              </div>
            </div>

          </div>

          {/* Right Column Feature Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Feature 1: Prakriti */}
            <div 
              onClick={onOpenQuiz}
              className="group p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">Prakriti Analysis</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Determine your Vata, Pitta & Kapha constitutional ratio.
              </p>
            </div>

            {/* Feature 2: Aahar */}
            <div 
              onClick={() => setActiveTab('aahar')}
              className="group p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center mb-3 group-hover:bg-orange-700 group-hover:text-white transition-colors">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">Sattvic Aahar</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Nourishing Indian recipes & AI 3-day meal plans.
              </p>
            </div>

            {/* Feature 3: Yoga & Breath */}
            <div 
              onClick={() => setActiveTab('yoga')}
              className="group p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">Yog & Pranayama</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Asanas, sequence builder & live breathing timer.
              </p>
            </div>

            {/* Feature 4: Herbal Vault */}
            <div 
              onClick={() => setActiveTab('dravyaguna')}
              className="group p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center mb-3 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                <Leaf className="w-5 h-5 text-amber-700 group-hover:text-white" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">Herbal Remedies</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Ashwagandha, Tulsi, Triphala & AI Vaidya chat.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
