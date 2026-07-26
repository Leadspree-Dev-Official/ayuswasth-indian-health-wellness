import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Circle, Sun, Moon, Flame, Plus, Droplet } from 'lucide-react';
import { initialDinacharyaItems } from '../data/dinacharyaData';
import { DinacharyaItem } from '../types';

export const DinacharyaTracker: React.FC = () => {
  const [items, setItems] = useState<DinacharyaItem[]>(initialDinacharyaItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [warmWaterCups, setWarmWaterCups] = useState(3);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const filteredItems = items.filter(
    (i) => selectedCategory === 'All' || i.category === selectedCategory
  );

  const completedCount = items.filter((i) => i.completed).length;
  const progressPct = Math.round((completedCount / items.length) * 100);

  const handleAddCustomHabit = () => {
    if (!newItemTitle.trim()) return;
    const newItem: DinacharyaItem = {
      id: Date.now().toString(),
      timeSlot: 'Flexible',
      sanskritTitle: 'Sva-Routines',
      englishTitle: newItemTitle,
      description: 'Personalized wellness habit added to daily Dinacharya schedule.',
      benefits: 'Supports individual health balance and routine consistency.',
      completed: false,
      category: 'Morning'
    };
    setItems((prev) => [...prev, newItem]);
    setNewItemTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-orange-950 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Dinacharya • Daily Ayurvedic Routine
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Synchronize Life with Natural Cycles
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            Dinacharya is the ancient science of aligning daily activities with circadian energy rhythms to prevent disease and foster longevity.
          </p>
        </div>

        {/* Progress Ring Card */}
        <div className="p-5 rounded-2xl bg-amber-900/60 border border-amber-700/80 flex items-center gap-5 shrink-0">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" className="text-amber-950" fill="transparent" />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                className="text-amber-400 transition-all duration-500"
                fill="transparent"
                strokeDasharray={200}
                strokeDashoffset={200 - (200 * progressPct) / 100}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-serif font-bold text-lg text-amber-200">{progressPct}%</span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase text-amber-300 tracking-wider">Daily Score</div>
            <div className="text-sm font-semibold text-white mt-0.5">{completedCount} of {items.length} Routines</div>
            <p className="text-[11px] text-stone-300 mt-1">Keep up your circadian rhythm</p>
          </div>
        </div>
      </div>

      {/* Warm Water & Hydration Tracker Bar */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base">Ushapana & Warm Water Sips</h3>
            <p className="text-xs text-stone-500">Track warm copper water and herbal infusions logged today (Goal: 6-8 cups).</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setWarmWaterCups(Math.max(0, warmWaterCups - 1))}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-base flex items-center justify-center"
          >
            -
          </button>
          <span className="font-serif font-bold text-xl text-sky-900 px-3">{warmWaterCups} Cups</span>
          <button
            onClick={() => setWarmWaterCups(warmWaterCups + 1)}
            className="w-9 h-9 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold text-base flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Routine Category Filters & Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Morning', 'Afternoon', 'Evening', 'Night'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 transition-colors shrink-0 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          Add Custom Habit
        </button>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
              item.completed
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-white border-stone-200/80 hover:border-amber-300 hover:bg-amber-50/30 text-stone-900 shadow-2xs'
            }`}
          >
            <div className={`mt-1 transition-colors ${item.completed ? 'text-emerald-700' : 'text-stone-300'}`}>
              {item.completed ? <CheckCircle2 className="w-6 h-6 fill-emerald-100" /> : <Circle className="w-6 h-6" />}
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider">
                  {item.timeSlot}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {item.category}
                </span>
              </div>

              <div className="font-serif font-bold text-base flex items-baseline gap-2">
                <span>{item.englishTitle}</span>
                <span className="text-xs font-normal italic text-stone-500">({item.sanskritTitle})</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
              
              <div className="pt-1 text-[11px] font-semibold text-emerald-800">
                ✨ {item.benefits}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xl max-w-md w-full space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg">Add Custom Dinacharya Habit</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase">Habit Title</label>
              <input
                type="text"
                placeholder="e.g. 15-min Sun Bathing, Nasya Drop..."
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomHabit}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-800 hover:bg-amber-900"
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
