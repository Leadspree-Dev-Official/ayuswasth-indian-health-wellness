import React from 'react';
import { Bot, Sparkles, MessageCircle, Send, ShieldCheck, ArrowRight } from 'lucide-react';

interface VaidyaSpotlightProps {
  setActiveTab: (tab: string) => void;
}

export const VaidyaSpotlight: React.FC<VaidyaSpotlightProps> = ({ setActiveTab }) => {
  const examplePrompts = [
    'How to cure bloating and acidity naturally after meals?',
    'What is the authentic formula for Tulsi-Ginger Kadha?',
    'Which herbs stabilize sleep and lower stress?',
    'Ayurvedic skincare routines for glowing skin?'
  ];

  return (
    <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 text-white shadow-xl space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-800/80 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Vaidya Ananda • Classical Ayurvedic Knowledge Base
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Instant Guidance from AI Vaidya Ananda
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            Trained on classical Ayurvedic texts including Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya. Ask questions about your digestion (Agni), seasonal care (Ritucharya), home remedies, or skin radiance.
          </p>

          {/* Quick Prompts */}
          <div className="space-y-2 pt-2">
            <span className="text-xs uppercase font-bold text-amber-300 tracking-wider block">Popular Ayurvedic Consultation Prompts:</span>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab('dravyaguna')}
                  className="text-xs text-stone-200 bg-stone-900/80 hover:bg-amber-900/80 border border-amber-800/50 px-3 py-1.5 rounded-xl transition-all text-left flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>"{prompt}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 bg-stone-900/90 rounded-3xl border border-amber-800/50 p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-800 text-white flex items-center justify-center font-serif font-bold text-lg">
              ॐ
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">Vaidya Ananda AI</h3>
              <p className="text-[11px] text-amber-300 font-medium">Ayurvedic Health Guide • Online 24/7</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-900/60 text-xs text-stone-200 leading-relaxed space-y-2">
            <p className="italic font-serif text-amber-200">"Namaste! To balance Vata and calm digestion, drink warm water with a slice of fresh ginger and roasted cumin powder after meals..."</p>
            <span className="text-[10px] text-stone-400 block font-mono">Reference: Charaka Samhita Chikitsa Sthana</span>
          </div>

          <button
            onClick={() => setActiveTab('dravyaguna')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
          >
            <Send className="w-4 h-4 text-stone-900" />
            Start Consultation with Vaidya Ananda
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
};
