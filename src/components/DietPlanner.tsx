import React, { useState } from 'react';
import { Utensils, Sparkles, Clock, Flame, ShieldCheck, Check, Filter, Search, ChevronRight, X, HeartPulse } from 'lucide-react';
import { indianRecipes } from '../data/recipes';
import { Recipe, MealPlanDay, PrakritiScore } from '../types';

interface DietPlannerProps {
  prakritiScore: PrakritiScore | null;
}

export const DietPlanner: React.FC<DietPlannerProps> = ({ prakritiScore }) => {
  const [activeSubTab, setActiveSubTab] = useState<'vault' | 'ai-generator'>('vault');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // AI Generator state
  const [doshaFocus, setDoshaFocus] = useState<string>(prakritiScore ? prakritiScore.dominant : 'Tridoshic');
  const [dietaryPref, setDietaryPref] = useState('Sattvic Vegetarian');
  const [healthGoal, setHealthGoal] = useState('Gut Health & Agni Reset');
  const [regionPreference, setRegionPreference] = useState('Pan-Indian');
  const [mealPlan, setMealPlan] = useState<MealPlanDay[] | null>(null);
  const [generating, setGenerating] = useState(false);

  // Filter recipes
  const filteredRecipes = indianRecipes.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesAttr = selectedAttribute === 'All' || r.attributes.includes(selectedAttribute as any);
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesAttr && matchesSearch;
  });

  const handleGeneratePlan = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dosha: doshaFocus,
          dietaryPref,
          goal: healthGoal,
          regionPreference
        })
      });
      const data = await res.json();
      setMealPlan(data.plan || []);
    } catch (err) {
      console.error('Failed to generate meal plan:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-amber-900 via-orange-950 to-stone-900 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold tracking-wider uppercase">
            <Utensils className="w-3.5 h-3.5" />
            Aahar Science • Nourishment as Medicine
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Sattvic & Regional Indian Nutrition
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            In Ayurveda, food (Aahar) is regarded as the primary medicine. Explore wholesome Indian recipes tailored to balance your Agni and Doshas.
          </p>
        </div>

        {/* SubTab Toggle */}
        <div className="flex bg-amber-950/80 p-1.5 rounded-2xl border border-amber-800/80 shrink-0">
          <button
            onClick={() => setActiveSubTab('vault')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'vault'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Recipe Vault
          </button>
          <button
            onClick={() => setActiveSubTab('ai-generator')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'ai-generator'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            AI 3-Day Plan
          </button>
        </div>
      </div>

      {/* SUBTAB 1: RECIPE VAULT */}
      {activeSubTab === 'vault' ? (
        <div className="space-y-6">
          
          {/* Filters & Search Bar */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search recipes, ingredients (e.g. kitchari, moong, ragi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-stone-50 border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {['All', 'Breakfast', 'Lunch', 'Beverages & Kadha'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-amber-100/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Attribute Tags */}
            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 overflow-x-auto">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Filter:
              </span>
              {['All', 'Sattvic', 'High Protein', 'Gut Healing', 'Gluten Free', 'Immunity', 'Diabetic Friendly'].map((attr) => (
                <button
                  key={attr}
                  onClick={() => setSelectedAttribute(attr)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                    selectedAttribute === attr
                      ? 'bg-orange-700 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setActiveRecipe(recipe)}
                className="group bg-white rounded-3xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
                      {recipe.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-700/90 text-amber-100 text-[10px] font-semibold">
                      {recipe.region}
                    </span>
                  </div>
                </div>

                {/* Recipe Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-amber-900 font-serif italic">
                      <span>{recipe.sanskritName}</span>
                      <span className="font-sans font-semibold text-stone-500">{recipe.calories} kcal</span>
                    </div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg group-hover:text-amber-800 transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Attributes & Time */}
                  <div className="space-y-3 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {recipe.cookTime}
                      </span>
                      <span className="font-semibold text-emerald-800">
                        Protein: {recipe.protein}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                        <span>Vata: {recipe.doshaSuitability.vata}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Recipe <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* SUBTAB 2: AI MEAL PLANNER */
        <div className="space-y-8">
          
          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Customize Your Sattvic Indian Meal Plan
              </h3>
              <p className="text-xs text-stone-600">
                AI generates a 3-day balanced meal breakdown tailored to your Doshas and lifestyle goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Dosha Focus */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Dosha Constitution Focus
                </label>
                <select
                  value={doshaFocus}
                  onChange={(e) => setDoshaFocus(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-amber-600"
                >
                  <option value="Tridoshic">Tridoshic (All 3 Balanced)</option>
                  <option value="Vata Pacifying">Vata Pacifying (Warm, Unctuous, Grounding)</option>
                  <option value="Pitta Pacifying">Pitta Pacifying (Cooling, Mild, Sweet)</option>
                  <option value="Kapha Pacifying">Kapha Pacifying (Light, Warm, Spicy)</option>
                </select>
              </div>

              {/* Dietary Pref */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Dietary Preference
                </label>
                <select
                  value={dietaryPref}
                  onChange={(e) => setDietaryPref(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-amber-600"
                >
                  <option value="Sattvic Vegetarian">Sattvic Pure Vegetarian (No Onion/Garlic)</option>
                  <option value="Standard Vegetarian">Standard Indian Vegetarian</option>
                  <option value="Vegan Plant Based">Vegan (Dairy-Free / Almond Milk)</option>
                  <option value="Gluten Free Millets">Gluten-Free Millets & Lentils</option>
                </select>
              </div>

              {/* Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Primary Health Goal
                </label>
                <select
                  value={healthGoal}
                  onChange={(e) => setHealthGoal(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-amber-600"
                >
                  <option value="Gut Health & Agni Reset">Gut Health & Agni Detox</option>
                  <option value="Immunity & Vitality">Immunity & Ojas Enhancement</option>
                  <option value="Weight Balance & Metabolism">Metabolic Fat Burning</option>
                  <option value="Calm & Sleep Support">Stress Reduction & Calming</option>
                </select>
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Cuisine Region
                </label>
                <select
                  value={regionPreference}
                  onChange={(e) => setRegionPreference(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-amber-600"
                >
                  <option value="Pan-Indian">Pan-Indian Mixture</option>
                  <option value="North Indian">North Indian Delights</option>
                  <option value="South Indian">South Indian Fermented/Millet</option>
                  <option value="Maharashtrian / West">West Indian / Maharashtrian</option>
                </select>
              </div>

            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={generating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              {generating ? 'Crafting Custom Sattvic Plan...' : 'Generate 3-Day Sattvic Plan'}
            </button>
          </div>

          {/* Generated Plan Display */}
          {generating ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Formulating your personalized Indian Sattvic meal sequence...</p>
            </div>
          ) : mealPlan && mealPlan.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Your 3-Day Ayurvedic Sattvic Plan</h3>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  Target: {doshaFocus}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mealPlan.map((dayPlan) => (
                  <div
                    key={dayPlan.day}
                    className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                          Day {dayPlan.day}
                        </span>
                        <span className="text-[11px] font-medium text-stone-500">Sattvic Balanced</span>
                      </div>

                      <div className="space-y-3 text-xs text-stone-700">
                        <div>
                          <div className="font-bold text-stone-900 uppercase text-[10px] text-amber-800 mb-0.5">Breakfast</div>
                          <p className="leading-relaxed">{dayPlan.breakfast}</p>
                        </div>

                        <div>
                          <div className="font-bold text-stone-900 uppercase text-[10px] text-amber-800 mb-0.5">Main Lunch</div>
                          <p className="leading-relaxed">{dayPlan.lunch}</p>
                        </div>

                        <div>
                          <div className="font-bold text-stone-900 uppercase text-[10px] text-amber-800 mb-0.5">Evening Snack</div>
                          <p className="leading-relaxed">{dayPlan.eveningSnack}</p>
                        </div>

                        <div>
                          <div className="font-bold text-stone-900 uppercase text-[10px] text-amber-800 mb-0.5">Light Dinner</div>
                          <p className="leading-relaxed">{dayPlan.dinner}</p>
                        </div>

                        <div>
                          <div className="font-bold text-stone-900 uppercase text-[10px] text-emerald-800 mb-0.5">Herbal Brew</div>
                          <p className="leading-relaxed font-medium text-emerald-900">{dayPlan.herbalKadha}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 font-serif italic">
                      💡 <strong>Vaidya Tip:</strong> {dayPlan.dailyTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

        </div>
      )}

      {/* RECIPE DETAIL MODAL */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900 my-8">
            
            <div className="relative h-64 bg-stone-100">
              <img src={activeRecipe.image} alt={activeRecipe.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActiveRecipe(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <div className="text-xs font-serif italic text-amber-800">{activeRecipe.sanskritName}</div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{activeRecipe.title}</h3>
                <p className="text-xs text-stone-600 pt-1 leading-relaxed">{activeRecipe.description}</p>
              </div>

              {/* Nutrition Summary Bar */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-amber-50 rounded-2xl text-center text-xs">
                <div>
                  <div className="text-stone-500 text-[10px]">Calories</div>
                  <div className="font-bold text-amber-900">{activeRecipe.calories} kcal</div>
                </div>
                <div>
                  <div className="text-stone-500 text-[10px]">Protein</div>
                  <div className="font-bold text-emerald-800">{activeRecipe.protein}</div>
                </div>
                <div>
                  <div className="text-stone-500 text-[10px]">Fiber</div>
                  <div className="font-bold text-amber-900">{activeRecipe.fiber}</div>
                </div>
              </div>

              {/* Ayurvedic Benefits */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h4 className="font-serif font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Ayurvedic Health Benefits
                </h4>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                  {activeRecipe.ayurvedicBenefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-sm">Ingredients</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
                      <Check className="w-3.5 h-3.5 text-amber-700" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-sm">Preparation Steps</h4>
                <ol className="space-y-2 text-xs text-stone-700">
                  {activeRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
