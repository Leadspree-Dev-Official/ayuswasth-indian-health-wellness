import React, { useState } from 'react';
import { BookOpen, ChevronDown, HeartPulse, Sparkles, ShieldCheck } from 'lucide-react';

interface FaqSectionProps {
  onOpenQuiz: () => void;
  setActiveTab: (tab: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenQuiz, setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Prakriti in Ayurvedic Medicine?',
      a: 'Prakriti is your unique biological constitution determined at conception. It represents the inherent ratio of the three doshas (Vata, Pitta, Kapha) in your body and mind. Understanding your Prakriti enables you to choose foods, exercises, and routines that prevent disease before it manifests.'
    },
    {
      q: 'What is a Sattvic diet and how does it benefit health?',
      a: 'A Sattvic diet consists of fresh, organic, high-prana plant-based foods that are easy to digest, such as moong dal, whole grains (millets, ragi), fresh sweet fruits, cooked vegetables, nuts, seeds, and A2 ghee. It promotes mental clarity, emotional peace, and physical longevity without causing heaviness or lethargy.'
    },
    {
      q: 'How does Ayurvedic Pranayama breathwork affect nervous system health?',
      a: 'Pranayama regulates the flow of Prana (vital life force). Techniques like Anulom Vilom (Alternate Nostril) stimulate the parasympathetic nervous system, lowering heart rate, reducing stress hormones, and improving mental focus in just a few minutes.'
    },
    {
      q: 'Are Ayurvedic home remedies safe alongside modern health practices?',
      a: 'Ayurvedic lifestyle guidance, Sattvic nutrition, and gentle herbal spices (such as turmeric, cumin, ginger, coriander, and Tulsi) are natural dietary enhancements. For specific medical conditions or prescription drug interactions, always consult a qualified healthcare professional.'
    }
  ];

  return (
    <section className="space-y-12">
      
      {/* Ancient Verses Banner */}
      <div className="p-8 rounded-3xl bg-amber-900/10 border border-amber-800/20 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center mx-auto text-lg font-serif font-bold">
          ॐ
        </div>
        <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-900 max-w-3xl mx-auto">
          "समदोषः समाग्निश्च समधातुमलक्रियः।<br />
          प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते॥"
        </blockquote>
        <p className="text-xs text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
          — <strong>Sushruta Samhita (Sutra Sthana)</strong><br />
          "Health (Swastha) is defined as balanced doshas, balanced digestive fire, balanced bodily tissues and excretions, alongside a blissful soul, senses, and calm mind."
        </p>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            Knowledge Base
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions about Ayurveda
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-stone-900 text-base flex items-center justify-between gap-4 bg-stone-50 hover:bg-amber-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-800 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 text-xs text-stone-700 leading-relaxed border-t border-stone-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Conversion Call to Action Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 text-white shadow-xl text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-700/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Begin Your Ayurvedic Journey Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Discover Your Unique Tridosha Constitution
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-sans leading-relaxed">
            Take our interactive Prakriti diagnostic test to unlock tailored Sattvic recipes, customized yoga flows, and classical herbal recommendations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-200 shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <HeartPulse className="w-4 h-4 text-amber-950" />
            Take Free Prakriti Diagnostic Assessment
          </button>

          <button
            onClick={() => setActiveTab('aahar')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-bold text-white bg-amber-950/60 hover:bg-amber-950 border border-amber-700/80 transition-all"
          >
            Explore Sattvic Meal Plans
          </button>
        </div>
      </div>

    </section>
  );
};
