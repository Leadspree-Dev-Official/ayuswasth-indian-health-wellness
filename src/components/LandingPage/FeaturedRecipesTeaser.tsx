import React from 'react';
import { Utensils, Sparkles, Clock, Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import { indianRecipes } from '../../data/recipes';

interface FeaturedRecipesTeaserProps {
  setActiveTab: (tab: string) => void;
}

export const FeaturedRecipesTeaser: React.FC<FeaturedRecipesTeaserProps> = ({ setActiveTab }) => {
  const topRecipes = indianRecipes.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            Sattvic Aahar • Pure High-Prana Food
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Nourish Your Agni (Digestive Fire)
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            In Ayurvedic medicine, food is considered primary therapy. Sattvic recipes are freshly prepared, wholesome, easily digestible, and promote clarity and peace.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('aahar')}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-900" />
          Generate AI 3-Day Meal Plan
        </button>
      </div>

      {/* 3 Recipe Cards Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setActiveTab('aahar')}
            className="bg-stone-950/80 rounded-2xl border border-amber-900/40 p-5 space-y-4 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-serif italic text-amber-300">{recipe.sanskritName}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                  {recipe.attributes[0] || 'Sattvic'}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {recipe.title}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                {recipe.description}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-stone-400 font-medium pt-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>{recipe.category}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>View Recipe Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner Inside Teaser */}
      <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-amber-200 font-medium">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Includes Ayurvedic spice guidance: Cumin, Mustard seeds, Asafoetida (Hing), Turmeric & A2 Cow Ghee.</span>
        </div>
        <button
          onClick={() => setActiveTab('aahar')}
          className="text-amber-300 font-bold hover:underline shrink-0"
        >
          View All 8+ Classical Recipes →
        </button>
      </div>

    </section>
  );
};
