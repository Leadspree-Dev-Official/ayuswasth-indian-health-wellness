import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export const MiniPranayamaWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [seconds, setSeconds] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) return prev - 1;

          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4; // 4s hold
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 4; // 4s exhale
          } else {
            setPhase('Inhale');
            setCompletedCycles((c) => c + 1);
            return 4; // 4s inhale
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setSeconds(4);
    setCompletedCycles(0);
  };

  // Circle animation scale
  let circleScale = 1;
  if (phase === 'Inhale') circleScale = 1.25;
  if (phase === 'Hold') circleScale = 1.25;
  if (phase === 'Exhale') circleScale = 0.85;

  return (
    <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-emerald-700" />
            1-Minute Mindful Breath Reset
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Anulom Vilom & Sama Vritti Breathwork
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Nadi Shodhana (Alternate Nostril Breathing) clears energy blockages (Nadis) in the body, lowers cortisol, calms an agitated mind, and balances both hemispheres of the brain in under 60 seconds.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold block text-emerald-900">🌿 Instant Biological Benefits:</span>
            <p>Stabilizes heart rate variability, regulates blood pressure, and reduces mental fatigue.</p>
          </div>
        </div>

        {/* Right Interactive Ring */}
        <div className="lg:col-span-5 bg-stone-50 p-6 rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-6">
          
          <div className="text-center space-y-1">
            <span className="text-[11px] font-serif italic text-amber-800">Sama Vritti Pranayama</span>
            <h3 className="font-serif font-bold text-stone-900 text-lg">Equal Ratio Calm Breath</h3>
          </div>

          {/* Animated Circle */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            
            <div
              className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center text-center shadow-md transition-transform duration-1000 ease-in-out ${
                phase === 'Inhale'
                  ? 'border-emerald-600 bg-emerald-100/80 text-emerald-950'
                  : phase === 'Hold'
                  ? 'border-amber-600 bg-amber-100/80 text-amber-950'
                  : 'border-sky-600 bg-sky-100/80 text-sky-950'
              }`}
              style={{ transform: `scale(${circleScale})` }}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{phase}</span>
              <span className="text-4xl font-serif font-bold my-0.5">{seconds}s</span>
              <span className="text-[10px] font-medium opacity-70">
                {phase === 'Inhale' && 'Slow Inhale'}
                {phase === 'Hold' && 'Hold Gently'}
                {phase === 'Exhale' && 'Smooth Exhale'}
              </span>
            </div>
          </div>

          <div className="text-xs font-semibold text-stone-600">
            Cycles Completed: <strong className="text-emerald-800 font-bold">{completedCycles}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-xs"
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              {isActive ? 'Pause' : 'Start 1-Min Reset'}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl text-stone-600 bg-white hover:bg-stone-100 border border-stone-200"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
