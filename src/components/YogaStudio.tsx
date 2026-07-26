import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Clock, ShieldAlert, ChevronRight, CheckCircle2 } from 'lucide-react';
import { yogaPoses, pranayamaSessions } from '../data/yogaData';
import { YogaPose, PranayamaSession } from '../types';

export const YogaStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'poses' | 'pranayama' | 'ai-sequence'>('pranayama');
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);

  // Pranayama Timer State
  const [activePranayama, setActivePranayama] = useState<PranayamaSession>(pranayamaSessions[0]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(pranayamaSessions[0].inhaleSec);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // AI Sequence state
  const [targetGoal, setTargetGoal] = useState('Lower Back Relief & Anxiety Calming');
  const [durationMins, setDurationMins] = useState(20);
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [generatedSequence, setGeneratedSequence] = useState<{
    sequenceTitle?: string;
    totalDuration?: string;
    poses?: Array<{
      sanskritName: string;
      englishName: string;
      duration: string;
      instruction: string;
      focus: string;
    }>;
  } | null>(null);
  const [generatingSequence, setGeneratingSequence] = useState(false);

  // Breath Cycle Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isBreathing) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Phase transition
          if (breathPhase === 'Inhale') {
            if (activePranayama.holdSec > 0) {
              setBreathPhase('Hold');
              return activePranayama.holdSec;
            } else {
              setBreathPhase('Exhale');
              return activePranayama.exhaleSec;
            }
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return activePranayama.exhaleSec;
          } else if (breathPhase === 'Exhale') {
            if (activePranayama.holdAfterExhaleSec > 0) {
              setBreathPhase('Pause');
              return activePranayama.holdAfterExhaleSec;
            } else {
              setBreathPhase('Inhale');
              setCompletedRounds((r) => r + 1);
              return activePranayama.inhaleSec;
            }
          } else if (breathPhase === 'Pause') {
            setBreathPhase('Inhale');
            setCompletedRounds((r) => r + 1);
            return activePranayama.inhaleSec;
          }
          return 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing, breathPhase, activePranayama]);

  const handleSelectPranayama = (p: PranayamaSession) => {
    setIsBreathing(false);
    setActivePranayama(p);
    setBreathPhase('Inhale');
    setSecondsLeft(p.inhaleSec);
    setCompletedRounds(0);
  };

  const handleResetBreath = () => {
    setIsBreathing(false);
    setBreathPhase('Inhale');
    setSecondsLeft(activePranayama.inhaleSec);
    setCompletedRounds(0);
  };

  const handleGenerateSequence = async () => {
    setGeneratingSequence(true);
    try {
      const res = await fetch('/api/generate-yoga-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetGoal, durationMins, experienceLevel })
      });
      const data = await res.json();
      setGeneratedSequence(data);
    } catch (e) {
      console.error('Failed to generate sequence:', e);
    } finally {
      setGeneratingSequence(false);
    }
  };

  // Compute Circle Scale for Breathing Ring
  let circleScale = 1;
  if (breathPhase === 'Inhale') circleScale = 1.35;
  if (breathPhase === 'Hold') circleScale = 1.35;
  if (breathPhase === 'Exhale') circleScale = 0.85;
  if (breathPhase === 'Pause') circleScale = 0.85;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5" />
            Yog & Pranayama Studio • Prana Vitality
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Harmonize Breath & Physical Postures
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            Practice traditional Indian Pranayama breathing, explore authentic Asanas, or let AI generate a customized yoga routine for your body.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-stone-950 p-1.5 rounded-2xl border border-stone-800 shrink-0">
          <button
            onClick={() => setActiveTab('pranayama')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pranayama' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Pranayama Breathing
          </button>
          <button
            onClick={() => setActiveTab('poses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'poses' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Asana Vault
          </button>
          <button
            onClick={() => setActiveTab('ai-sequence')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ai-sequence' ? 'bg-emerald-700 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Sequence
          </button>
        </div>
      </div>

      {/* TAB 1: PRANAYAMA BREATHING TIMER */}
      {activeTab === 'pranayama' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Technique Select List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif font-bold text-stone-900 text-lg">Select Pranayama Technique</h3>
            <div className="space-y-3">
              {pranayamaSessions.map((p) => {
                const isSelected = activePranayama.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPranayama(p)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-emerald-700 shadow-md'
                        : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-serif italic ${isSelected ? 'text-emerald-300' : 'text-amber-800'}`}>
                        {p.sanskritName}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {p.recommendedRounds} Rounds
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base mt-1">{p.name}</h4>
                    <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-stone-600'}`}>
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Breathing Stage */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col items-center justify-center space-y-8 min-h-[460px]">
            
            <div className="text-center space-y-1">
              <span className="text-xs font-serif italic text-amber-800">{activePranayama.sanskritName}</span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">{activePranayama.name}</h3>
            </div>

            {/* Breathing Circle Ring */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Outer Pulsing Glow */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/20 via-amber-300/20 to-teal-400/20 transition-transform duration-1000 ease-in-out"
                style={{ transform: `scale(${circleScale})` }}
              />

              {/* Main Animated Circle */}
              <div
                className={`w-52 h-52 rounded-full border-4 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-1000 ease-in-out ${
                  breathPhase === 'Inhale'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                    : breathPhase === 'Hold'
                    ? 'border-amber-500 bg-amber-50 text-amber-950'
                    : 'border-sky-500 bg-sky-50 text-sky-950'
                }`}
                style={{ transform: `scale(${circleScale})` }}
              >
                <span className="text-xs uppercase font-bold tracking-widest opacity-80">{breathPhase}</span>
                <span className="text-5xl font-serif font-bold my-1">{secondsLeft}s</span>
                <span className="text-[11px] font-medium opacity-70">
                  {breathPhase === 'Inhale' && 'Slow Deep Belly Inhale'}
                  {breathPhase === 'Hold' && 'Gently Retain Breath'}
                  {breathPhase === 'Exhale' && 'Smooth Complete Exhale'}
                  {breathPhase === 'Pause' && 'Pause Quietly'}
                </span>
              </div>
            </div>

            {/* Rounds Counter */}
            <div className="flex items-center gap-6 text-xs font-semibold text-stone-600 bg-stone-100 px-6 py-2.5 rounded-full">
              <span>Completed Rounds: <strong className="text-emerald-800">{completedRounds}</strong> / {activePranayama.recommendedRounds}</span>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsBreathing(!isBreathing)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-md"
              >
                {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                {isBreathing ? 'Pause Practice' : 'Begin Practice'}
              </button>

              <button
                onClick={handleResetBreath}
                className="p-3.5 rounded-2xl text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-300"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: ASANA VAULT */}
      {activeTab === 'poses' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yogaPoses.map((pose) => (
              <div
                key={pose.id}
                onClick={() => setSelectedPose(pose)}
                className="bg-white rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row cursor-pointer group"
              >
                <div className="md:w-2/5 h-48 md:h-auto bg-stone-100 relative overflow-hidden">
                  <img src={pose.image} alt={pose.englishName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:w-3/5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-serif italic text-amber-800">{pose.sanskritName}</div>
                    <h3 className="text-lg font-serif font-bold text-stone-900">{pose.englishName}</h3>
                    <p className="text-xs text-stone-500 font-medium">{pose.targetDosha}</p>
                  </div>

                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-2 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{pose.duration}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {pose.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>View Step-by-Step</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AI CUSTOM SEQUENCE */}
      {activeTab === 'ai-sequence' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                AI Custom Yoga & Pranayama Routine Builder
              </h3>
              <p className="text-xs text-stone-600">
                Generate a personalized yoga flow targeting your specific physical tightness, stress levels, or energy state.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Health Focus / Target Goal</label>
                <input
                  type="text"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder="e.g. Lower Back Relief, Anxiety, Digestion..."
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Session Duration</label>
                <select
                  value={durationMins}
                  onChange={(e) => setDurationMins(Number(e.target.value))}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-600"
                >
                  <option value={10}>10 Minutes Quick Flow</option>
                  <option value={20}>20 Minutes Balanced Practice</option>
                  <option value={30}>30 Minutes Rejuvenating Session</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full p-3 rounded-xl text-xs bg-stone-50 border border-stone-300 font-medium focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Beginner">Gentle Beginner</option>
                  <option value="Intermediate">Intermediate Flow</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateSequence}
              disabled={generatingSequence}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              {generatingSequence ? 'Crafting Yoga Sequence...' : 'Generate AI Yoga Sequence'}
            </button>
          </div>

          {/* Sequence Output */}
          {generatingSequence ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <Sparkles className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Structuring custom yoga sequence with AI...</p>
            </div>
          ) : generatedSequence && generatedSequence.poses ? (
            <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-2xl font-serif font-bold text-stone-900">{generatedSequence.sequenceTitle}</h3>
                <p className="text-xs text-emerald-800 font-semibold mt-1">Total Duration: {generatedSequence.totalDuration}</p>
              </div>

              <div className="space-y-4">
                {generatedSequence.poses.map((pose, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-serif italic font-semibold text-amber-800">{pose.sanskritName}</span>
                        <span className="font-bold text-stone-900">({pose.englishName})</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] ml-auto">
                          {pose.duration}
                        </span>
                      </div>
                      <p className="text-stone-700 leading-relaxed">{pose.instruction}</p>
                      <div className="text-[11px] font-semibold text-emerald-800">Focus: {pose.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* POSE DETAIL MODAL */}
      {selectedPose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900 my-8">
            <div className="relative h-56 bg-stone-100">
              <img src={selectedPose.image} alt={selectedPose.englishName} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPose(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <div className="text-xs font-serif italic text-amber-800">{selectedPose.sanskritName}</div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{selectedPose.englishName}</h3>
                <p className="text-xs text-stone-500 font-medium">{selectedPose.targetDosha}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h4 className="font-serif font-bold text-emerald-950 text-xs uppercase tracking-wider">Health Benefits</h4>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                  {selectedPose.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-sm">Step-by-Step Guidance</h4>
                <ol className="space-y-2 text-xs text-stone-700">
                  {selectedPose.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
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
