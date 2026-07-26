import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, HeartPulse, Sparkles, RefreshCw, Download, FileText, Utensils, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { prakritiQuestions } from '../data/prakritiQuestions';
import { PrakritiScore, DoshaType } from '../types';

interface PrakritiQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  prakritiScore: PrakritiScore | null;
  setPrakritiScore: (score: PrakritiScore) => void;
  setActiveTab: (tab: string) => void;
}

export const PrakritiQuizModal: React.FC<PrakritiQuizModalProps> = ({
  isOpen,
  onClose,
  prakritiScore,
  setPrakritiScore,
  setActiveTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, DoshaType>>({});
  const [aiReport, setAiReport] = useState<{
    summary?: string;
    recommendations?: string[];
    foodsToFavor?: string[];
    foodsToAvoid?: string[];
    dinacharyaFocus?: string;
  } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = prakritiQuestions[currentStep];
  const isLastQuestion = currentStep === prakritiQuestions.length - 1;

  const handleSelectOption = (dosha: DoshaType) => {
    setUserAnswers((prev) => ({ ...prev, [prakritiQuestions[currentStep].id]: dosha }));
  };

  const calculateResult = async () => {
    let vataCount = 0;
    let pittaCount = 0;
    let kaphaCount = 0;

    Object.values(userAnswers).forEach((d) => {
      if (d === 'vata') vataCount++;
      if (d === 'pitta') pittaCount++;
      if (d === 'kapha') kaphaCount++;
    });

    const total = Object.keys(userAnswers).length || 1;
    const vataPct = Math.round((vataCount / total) * 100);
    const pittaPct = Math.round((pittaCount / total) * 100);
    const kaphaPct = Math.round((kaphaCount / total) * 100);

    let dominant = 'Vata';
    if (pittaPct >= vataPct && pittaPct >= kaphaPct) dominant = 'Pitta';
    if (kaphaPct >= vataPct && kaphaPct >= pittaPct) dominant = 'Kapha';
    if (vataPct === pittaPct && vataPct > kaphaPct) dominant = 'Vata-Pitta';
    if (pittaPct === kaphaPct && pittaPct > vataPct) dominant = 'Pitta-Kapha';
    if (vataPct === kaphaPct && vataPct > pittaPct) dominant = 'Vata-Kapha';

    const result: PrakritiScore = {
      vata: vataPct,
      pitta: pittaPct,
      kapha: kaphaPct,
      dominant,
    };

    setPrakritiScore(result);

    // Launch celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Fetch AI Analysis Report
    setLoadingAi(true);
    try {
      const res = await fetch('/api/prakriti-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: result, answers: userAnswers })
      });
      const data = await res.json();
      setAiReport(data);
    } catch (e) {
      console.error('Failed to load AI Prakriti analysis:', e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResult();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setAiReport(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-stone-50 rounded-3xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-900 text-white border-b border-amber-800">
          <div className="flex items-center gap-2.5">
            <HeartPulse className="w-5 h-5 text-amber-300" />
            <h2 className="font-serif font-bold text-lg">Prakriti Diagnostic Assessment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-800 transition-colors"
          >
            <X className="w-5 h-5 text-amber-200" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* If Result exists and quiz completed */}
          {prakritiScore && Object.keys(userAnswers).length === prakritiQuestions.length ? (
            <div className="space-y-6">
              
              {/* Constitutional Summary Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-100/90 via-stone-100 to-emerald-100/60 border border-amber-300 shadow-xs text-center space-y-3">
                <span className="px-3 py-1 rounded-full bg-amber-800 text-amber-100 text-xs font-bold uppercase tracking-widest">
                  Diagnostic Result
                </span>
                <h3 className="text-3xl font-serif font-bold text-amber-950">
                  Your Dominant Prakriti: <span className="text-orange-700 underline capitalize">{prakritiScore.dominant}</span>
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Ayurveda identifies this unique elemental energy ratio present since birth.
                </p>

                {/* Dosha Progress Meters */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="text-xs font-bold text-stone-600 uppercase mb-1">Vata (Air/Ether)</div>
                    <div className="text-xl font-serif font-bold text-sky-700">{prakritiScore.vata}%</div>
                    <div className="w-full h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${prakritiScore.vata}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="text-xs font-bold text-stone-600 uppercase mb-1">Pitta (Fire/Water)</div>
                    <div className="text-xl font-serif font-bold text-amber-700">{prakritiScore.pitta}%</div>
                    <div className="w-full h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${prakritiScore.pitta}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="text-xs font-bold text-stone-600 uppercase mb-1">Kapha (Earth/Water)</div>
                    <div className="text-xl font-serif font-bold text-emerald-800">{prakritiScore.kapha}%</div>
                    <div className="w-full h-2 bg-stone-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${prakritiScore.kapha}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Report Section */}
              {loadingAi ? (
                <div className="p-8 text-center bg-stone-100 rounded-2xl border border-stone-200 space-y-3">
                  <Sparkles className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                  <p className="text-sm font-medium text-stone-700">Synthesizing deep Ayurvedic report with Gemini AI...</p>
                </div>
              ) : aiReport ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                    <h4 className="font-serif font-bold text-stone-900 flex items-center gap-2 text-base">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Vaidya AI Deep Analysis
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed">{aiReport.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                      <h5 className="font-serif font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Foods to Favor
                      </h5>
                      <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside">
                        {aiReport.foodsToFavor?.map((food, i) => (
                          <li key={i}>{food}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                      <h5 className="font-serif font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                        Foods to Minimize
                      </h5>
                      <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                        {aiReport.foodsToAvoid?.map((food, i) => (
                          <li key={i}>{food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {aiReport.recommendations && (
                    <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                      <h5 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                        Key Lifestyle Recommendations
                      </h5>
                      <ul className="text-xs text-stone-700 space-y-1.5">
                        {aiReport.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Diagnostic
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      setActiveTab('aahar');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 transition-colors"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    Get Sattvic Meal Plan
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-300"
                  >
                    Done
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Active Question Screen */
            <div className="space-y-6">
              
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-stone-600">
                  <span>Question {currentStep + 1} of {prakritiQuestions.length}</span>
                  <span className="text-amber-800 font-bold">{currentQuestion.category}</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / prakritiQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {currentQuestion.title}
                </h3>
                <p className="text-xs text-stone-600">{currentQuestion.subtitle}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = userAnswers[currentQuestion.id] === opt.dosha;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.dosha)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-medium shadow-xs'
                          : 'bg-white border-stone-200 hover:bg-amber-50/50 hover:border-amber-300 text-stone-800'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-700 bg-amber-700 text-white' : 'border-stone-300 bg-white'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-200 hover:bg-stone-300 disabled:opacity-40 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!userAnswers[currentQuestion.id]}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 disabled:opacity-40 transition-all shadow-sm"
                >
                  {isLastQuestion ? 'Generate Analysis' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
