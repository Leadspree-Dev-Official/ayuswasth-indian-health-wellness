import React, { useState } from 'react';
import { Wind, Flame, Mountain, ArrowRight, Sparkles, HeartPulse } from 'lucide-react';

interface TridoshaExplorerProps {
  onOpenQuiz: () => void;
  setActiveTab: (tab: string) => void;
}

export const TridoshaExplorer: React.FC<TridoshaExplorerProps> = ({ onOpenQuiz, setActiveTab }) => {
  const [selectedDosha, setSelectedDosha] = useState<'vata' | 'pitta' | 'kapha'>('vata');

  const doshaDetails = {
    vata: {
      name: 'Vata',
      elements: 'Air & Ether (Vayu & Akasha)',
      sanskritTag: 'गतिः वायुः (Principle of Movement)',
      color: 'from-sky-900 to-indigo-950 text-sky-100',
      badgeBg: 'bg-sky-100 text-sky-900',
      border: 'border-sky-300',
      description: 'Governs all physical and mental movement, nervous impulses, breathing, and circulation.',
      qualities: ['Dry', 'Light', 'Cold', 'Rough', 'Subtle', 'Mobile'],
      balancedState: 'Creative, energetic, quick-minded, adaptable, enthusiastic.',
      imbalancedState: 'Anxiety, insomnia, bloating, dry skin, constipation, racing thoughts.',
      idealDiet: 'Warm, cooked, unctuous foods with ghee, sweet fruits, warming spices (cinnamon, ginger).',
      topHerbs: ['Ashwagandha', 'Brahmi', 'Sesame Oil', 'Cardamom'],
    },
    pitta: {
      name: 'Pitta',
      elements: 'Fire & Water (Agni & Jala)',
      sanskritTag: 'पच्यते अग्निः (Principle of Transformation)',
      color: 'from-amber-900 to-orange-950 text-amber-100',
      badgeBg: 'bg-amber-100 text-amber-900',
      border: 'border-amber-300',
      description: 'Governs digestion, metabolism, body temperature, intelligence, and visual perception.',
      qualities: ['Hot', 'Sharp', 'Light', 'Liquid', 'Oily', 'Spreading'],
      balancedState: 'Sharp intelligence, focused leadership, strong digestion, radiant complexion.',
      imbalancedState: 'Acid reflux, heartburn, skin rashes, irritability, anger, inflammation.',
      idealDiet: 'Cooling, sweet, bitter foods like coconut water, cucumber, coriander, soaked almonds, ghee.',
      topHerbs: ['Amla (Amalaki)', 'Guduchi', 'Shatavari', 'Coriander Seed'],
    },
    kapha: {
      name: 'Kapha',
      elements: 'Earth & Water (Prithvi & Jala)',
      sanskritTag: 'श्लेष्मा स्रंसते (Principle of Structure)',
      color: 'from-emerald-900 to-teal-950 text-emerald-100',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      border: 'border-emerald-300',
      description: 'Governs physical stamina, joint lubrication, immunity, tissue structure, and emotional stability.',
      qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth', 'Dense', 'Stable'],
      balancedState: 'Calm, loving, forgiving, strong endurance, lubricated joints, deep sleep.',
      imbalancedState: 'Lethargy, weight gain, congestion, morning heaviness, attachment.',
      idealDiet: 'Light, warm, dry, spicy, bitter foods like millets, sprouted lentils, ginger, black pepper.',
      topHerbs: ['Triphala', 'Tulsi (Holy Basil)', 'Trikatu', 'Turmeric'],
    },
  };

  const current = doshaDetails[selectedDosha];

  return (
    <section className="py-12 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-8">
      
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Tridosha Science • The Blueprint of Life
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Explore the Three Bio-Energies
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            In Ayurveda, every individual possesses a unique blend of Vata, Pitta, and Kapha. Click each bio-energy below to understand its elemental composition.
          </p>
        </div>

        <button
          onClick={onOpenQuiz}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 transition-all shadow-xs shrink-0"
        >
          <HeartPulse className="w-4 h-4 text-amber-300" />
          Test Your Prakriti Ratio
        </button>
      </div>

      {/* Dosha Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedDosha('vata')}
          className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${
            selectedDosha === 'vata'
              ? 'bg-sky-900 text-white border-sky-700 shadow-md ring-2 ring-sky-500/50'
              : 'bg-stone-50 text-stone-900 border-stone-200 hover:bg-sky-50/50'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wind className={`w-5 h-5 ${selectedDosha === 'vata' ? 'text-sky-300' : 'text-sky-700'}`} />
              <span className="font-serif font-bold text-lg">Vata Dosha</span>
            </div>
            <p className={`text-xs ${selectedDosha === 'vata' ? 'text-sky-200' : 'text-stone-500'}`}>
              Air & Ether • Movement
            </p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedDosha === 'vata' ? 'bg-sky-800 text-sky-100' : 'bg-stone-200 text-stone-700'}`}>
            Air
          </span>
        </button>

        <button
          onClick={() => setSelectedDosha('pitta')}
          className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${
            selectedDosha === 'pitta'
              ? 'bg-amber-900 text-white border-amber-700 shadow-md ring-2 ring-amber-500/50'
              : 'bg-stone-50 text-stone-900 border-stone-200 hover:bg-amber-50/50'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className={`w-5 h-5 ${selectedDosha === 'pitta' ? 'text-amber-300' : 'text-amber-700'}`} />
              <span className="font-serif font-bold text-lg">Pitta Dosha</span>
            </div>
            <p className={`text-xs ${selectedDosha === 'pitta' ? 'text-amber-200' : 'text-stone-500'}`}>
              Fire & Water • Digestion
            </p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedDosha === 'pitta' ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-700'}`}>
            Fire
          </span>
        </button>

        <button
          onClick={() => setSelectedDosha('kapha')}
          className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${
            selectedDosha === 'kapha'
              ? 'bg-emerald-900 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/50'
              : 'bg-stone-50 text-stone-900 border-stone-200 hover:bg-emerald-50/50'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mountain className={`w-5 h-5 ${selectedDosha === 'kapha' ? 'text-emerald-300' : 'text-emerald-700'}`} />
              <span className="font-serif font-bold text-lg">Kapha Dosha</span>
            </div>
            <p className={`text-xs ${selectedDosha === 'kapha' ? 'text-emerald-200' : 'text-stone-500'}`}>
              Earth & Water • Structure
            </p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedDosha === 'kapha' ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-700'}`}>
            Earth
          </span>
        </button>
      </div>

      {/* Selected Dosha Detailed Card */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${current.color} border ${current.border} shadow-lg space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-serif italic text-amber-300 block mb-1">{current.sanskritTag}</span>
            <h3 className="text-3xl font-serif font-bold">{current.name} Bio-Energy Profile</h3>
            <p className="text-xs opacity-90 font-medium mt-1">{current.elements}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold self-start ${current.badgeBg}`}>
            {current.name} Dominant
          </span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed opacity-95">
          {current.description}
        </p>

        {/* Qualities Pills */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider opacity-80 block">Gunās (Elemental Qualities):</span>
          <div className="flex flex-wrap gap-2">
            {current.qualities.map((q, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs">
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Balanced vs Imbalanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1.5 border border-white/10">
            <span className="font-bold uppercase text-amber-300 text-[11px] block">✨ When Balanced</span>
            <p className="leading-relaxed opacity-90">{current.balancedState}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs space-y-1.5 border border-white/10">
            <span className="font-bold uppercase text-red-300 text-[11px] block">⚠️ When Aggravated</span>
            <p className="leading-relaxed opacity-90">{current.imbalancedState}</p>
          </div>
        </div>

        {/* Ideal Diet & Herbs Footer */}
        <div className="pt-2 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-amber-300">🍲 Recommended Aahar: </span>
            <span className="opacity-90">{current.idealDiet}</span>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="font-bold text-amber-300">🌿 Key Herbs: </span>
            <span className="opacity-90">{current.topHerbs.join(', ')}</span>
          </div>
        </div>
      </div>

    </section>
  );
};
