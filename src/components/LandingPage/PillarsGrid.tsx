import React from 'react';
import { HeartPulse, Utensils, Activity, Leaf, Clock, ArrowRight } from 'lucide-react';

interface PillarsGridProps {
  setActiveTab: (tab: string) => void;
  onOpenQuiz: () => void;
}

export const PillarsGrid: React.FC<PillarsGridProps> = ({ setActiveTab, onOpenQuiz }) => {
  const pillars = [
    {
      id: 'prakriti',
      title: 'Tridosha Prakriti Analysis',
      subtitle: 'Constitutional Bio-Assessment',
      description: 'Discover your unique ratio of Vata, Pitta, and Kapha to tailor your diet, sleep, and lifestyle to your innate biological blueprint.',
      icon: HeartPulse,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      btnText: 'Start Assessment',
      action: onOpenQuiz,
    },
    {
      id: 'aahar',
      title: 'Sattvic Aahar Science',
      subtitle: 'Ayurvedic Culinary Medicine',
      description: 'Nourish Agni (digestive fire) with high-prana Indian meals, sprouted lentils, ragi, foxtail millets, and AI custom 3-day meal plans.',
      icon: Utensils,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      btnText: 'Explore Sattvic Recipes',
      action: () => setActiveTab('aahar'),
    },
    {
      id: 'yoga',
      title: 'Yog & Pranayama Studio',
      subtitle: 'Prana Energy Flow & Breath',
      description: 'Align physical posture with Asanas and master traditional Indian breathwork (Anulom Vilom, Bhramari) with interactive timers.',
      icon: Activity,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      btnText: 'Open Pranayama Studio',
      action: () => setActiveTab('yoga'),
    },
    {
      id: 'dravyaguna',
      title: 'Classical Dravyaguna Vault',
      subtitle: 'Authentic Indian Herbal Science',
      description: 'Harness classical remedies like Ashwagandha, Tulsi, Triphala, and consult our AI Vaidya Ananda for personalized home remedies.',
      icon: Leaf,
      color: 'bg-teal-100 text-teal-800 border-teal-200',
      btnText: 'Explore Herbs & AI Vaidya',
      action: () => setActiveTab('dravyaguna'),
    },
    {
      id: 'dinacharya',
      title: 'Daily Dinacharya Tracker',
      subtitle: 'Circadian Rhythm Alignment',
      description: 'Log time-tested rituals from morning Ushapana copper water to evening Golden Milk to keep your biological clock in harmony.',
      icon: Clock,
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      btnText: 'Track Daily Routines',
      action: () => setActiveTab('dinacharya'),
    },
  ];

  return (
    <section className="space-y-8">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full">
          The 5 Pillars of Swastha Ayurveda
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Complete Holistic Healthcare System
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          Swastha is achieved when all five dimensions of life—constitution, nutrition, breath, herbology, and circadian rhythms—are in perfect equilibrium.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((p, idx) => {
          const IconComp = p.icon;
          return (
            <div
              key={p.id}
              onClick={p.action}
              className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group hover:border-amber-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${p.color} transition-transform group-hover:scale-110 duration-300`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider block">
                    Pillar 0{idx + 1} • {p.subtitle}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">{p.title}</h3>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-900 group-hover:text-amber-700">
                <span>{p.btnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
