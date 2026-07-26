import React, { useState } from 'react';
import { X, BookOpen, Flame, Wind, Mountain, CheckCircle2 } from 'lucide-react';

interface DoshaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoshaGuideModal: React.FC<DoshaGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeDosha, setActiveDosha] = useState<'vata' | 'pitta' | 'kapha'>('vata');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-stone-50 rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-950 text-white border-b border-amber-900">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif font-bold text-lg">Ayurvedic Dosha Encyclopedia</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-amber-800 transition-colors">
            <X className="w-5 h-5 text-amber-200" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Dosha Selector Tabs */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setActiveDosha('vata')}
              className={`p-4 rounded-2xl border text-center transition-all ${
                activeDosha === 'vata'
                  ? 'bg-sky-900 text-white border-sky-700 shadow-md'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-sky-50'
              }`}
            >
              <Wind className="w-6 h-6 mx-auto mb-1 text-sky-400" />
              <div className="font-serif font-bold text-base">Vata</div>
              <div className="text-[10px] font-medium opacity-80 uppercase">Air & Ether</div>
            </button>

            <button
              onClick={() => setActiveDosha('pitta')}
              className={`p-4 rounded-2xl border text-center transition-all ${
                activeDosha === 'pitta'
                  ? 'bg-amber-900 text-white border-amber-700 shadow-md'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
              }`}
            >
              <Flame className="w-6 h-6 mx-auto mb-1 text-amber-400" />
              <div className="font-serif font-bold text-base">Pitta</div>
              <div className="text-[10px] font-medium opacity-80 uppercase">Fire & Water</div>
            </button>

            <button
              onClick={() => setActiveDosha('kapha')}
              className={`p-4 rounded-2xl border text-center transition-all ${
                activeDosha === 'kapha'
                  ? 'bg-emerald-900 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-emerald-50'
              }`}
            >
              <Mountain className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
              <div className="font-serif font-bold text-base">Kapha</div>
              <div className="text-[10px] font-medium opacity-80 uppercase">Earth & Water</div>
            </button>
          </div>

          {/* VATA DETAIL */}
          {activeDosha === 'vata' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                <h3 className="font-serif font-bold text-sky-950 text-xl">Vata Dosha (The Principle of Movement)</h3>
                <p className="text-xs text-sky-900 leading-relaxed">
                  Vata governs all bodily movement, nerve impulses, breathing, and blood circulation. Qualities: Dry, light, cold, rough, subtle, mobile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Balanced</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Creative, energetic, adaptable, enthusiastic</li>
                    <li>Light regular digestion and easy bowel movements</li>
                    <li>Sound sleep with fresh morning alertness</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Aggravated (Imbalanced)</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Anxiety, insomnia, racing thoughts, restlessness</li>
                    <li>Dry skin, constipation, bloating, cracking joints</li>
                    <li>Irregular appetite and cold extremities</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-amber-900 uppercase">Vata Pacifying Lifestyle Tips</h4>
                <p className="text-stone-700 leading-relaxed">
                  Favor warm, cooked, unctuous foods with A2 ghee, sweet fruits, and mild warming spices (cinnamon, cumin, ginger). Maintain strict regular sleep and meal routines, practice sesame oil Abhyanga massage, and do gentle grounding Pranayama like Anulom Vilom.
                </p>
              </div>
            </div>
          )}

          {/* PITTA DETAIL */}
          {activeDosha === 'pitta' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <h3 className="font-serif font-bold text-amber-950 text-xl">Pitta Dosha (The Principle of Transformation)</h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Pitta governs digestion, body temperature, metabolism, vision, and intelligence. Qualities: Hot, sharp, light, liquid, oily.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Balanced</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Sharp intelligence, focused leadership, strong digestion</li>
                    <li>Lustrous warm complexion and efficient metabolism</li>
                    <li>Courageous, decisive, and articulate</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Aggravated (Imbalanced)</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Hyperacidity, heartburn, skin rashes, acne, inflammation</li>
                    <li>Irritability, anger, impatience, perfectionism</li>
                    <li>Excessive heat, sweating, and loose stools</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-amber-900 uppercase">Pitta Pacifying Lifestyle Tips</h4>
                <p className="text-stone-700 leading-relaxed">
                  Favor cooling, sweet, bitter, and astringent foods like coconut water, cucumber, soaked almonds, coriander, and ghee. Avoid hot spicy, deep-fried, or excessively salty items. Practice Sheetali cooling breathwork and take serene walks in moonlight.
                </p>
              </div>
            </div>
          )}

          {/* KAPHA DETAIL */}
          {activeDosha === 'kapha' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h3 className="font-serif font-bold text-emerald-950 text-xl">Kapha Dosha (The Principle of Structure)</h3>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Kapha governs physical stamina, joint lubrication, immunity, and structural stability. Qualities: Heavy, slow, cool, oily, smooth, dense, stable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Balanced</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Calm, loving, forgiving, strong endurance and immunity</li>
                    <li>Thick healthy hair, lubricated joints, smooth skin</li>
                    <li>Deep sound sleep and emotional stability</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 uppercase">When Aggravated (Imbalanced)</h4>
                  <ul className="space-y-1 text-stone-700 list-disc list-inside">
                    <li>Sluggishness, lethargy, weight gain, water retention</li>
                    <li>Sinus congestion, excessive mucus, morning heaviness</li>
                    <li>Attachment, resistance to change, oversleeping</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-amber-900 uppercase">Kapha Pacifying Lifestyle Tips</h4>
                <p className="text-stone-700 leading-relaxed">
                  Favor light, warm, dry, pungent, and bitter foods like millets, sprouted moong, ginger, black pepper, and warm herbal kadhas. Avoid heavy dairy, cold sweets, and fried food. Engage in vigorous morning exercise and wake before 6 AM.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
