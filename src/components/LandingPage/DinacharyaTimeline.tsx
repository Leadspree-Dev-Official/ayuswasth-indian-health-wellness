import React from 'react';
import { Sun, Moon, Clock, Sparkles, Droplet, ArrowRight } from 'lucide-react';

interface DinacharyaTimelineProps {
  setActiveTab: (tab: string) => void;
}

export const DinacharyaTimeline: React.FC<DinacharyaTimelineProps> = ({ setActiveTab }) => {
  const steps = [
    {
      phase: 'Dawn (Brahma Muhurta)',
      time: '5:00 AM - 6:00 AM',
      title: 'Ushapana & Gratitude',
      desc: 'Drink warm water stored in a copper vessel to stimulate peristalsis and flush digestive toxins (Ama).',
      icon: '🌅',
      tag: 'Vata Awakening'
    },
    {
      phase: 'Morning Purification',
      time: '6:30 AM - 7:30 AM',
      title: 'Jivha Nirlekhana & Abhyanga',
      desc: 'Scrape tongue with pure copper scraper, oil pulling (Gandusha), and warm sesame oil self-massage.',
      icon: '☀️',
      tag: 'Kapha Clearing'
    },
    {
      phase: 'Midday Agni Peak',
      time: '12:00 PM - 1:30 PM',
      title: 'Main Sattvic Meal',
      desc: 'Consume your largest meal when solar energy and digestive fire (Agni) are at their maximum intensity.',
      icon: '🍽️',
      tag: 'Pitta Digestion'
    },
    {
      phase: 'Late Afternoon',
      time: '5:00 PM - 6:00 PM',
      title: 'Pranayama & Tulsi Tea',
      desc: 'Sip warm Tulsi-Ginger tea, practice 10 minutes of Anulom Vilom breathwork to calm mental chatter.',
      icon: '☕',
      tag: 'Vata Harmonizing'
    },
    {
      phase: 'Night Calm',
      time: '9:00 PM - 10:00 PM',
      title: 'Golden Milk & Sleep',
      desc: 'Drink warm A2 milk with turmeric, nutmeg, and cardamom. Unplug digital screens for restorative sleep.',
      icon: '🌙',
      tag: 'Ojas Building'
    }
  ];

  return (
    <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
      
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Dinacharya • Daily Circadian Rhythm Alignment
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Sync Your Body Clock with Nature
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Ayurveda emphasizes that performing specific health rituals at optimal times of day maximizes vitality, prevents chronic fatigue, and boosts immunity.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('dinacharya')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 transition-all shadow-xs shrink-0"
        >
          <Clock className="w-4 h-4 text-amber-300" />
          Track Your Daily Dinacharya
        </button>
      </div>

      {/* Timeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {step.tag}
                </span>
              </div>

              <div className="text-[11px] font-bold uppercase text-amber-800 tracking-wider">
                {step.time}
              </div>

              <h3 className="font-serif font-bold text-stone-900 text-sm">{step.title}</h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="pt-2 text-[10px] font-bold text-stone-400 border-t border-stone-200/60 uppercase tracking-widest">
              {step.phase}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
