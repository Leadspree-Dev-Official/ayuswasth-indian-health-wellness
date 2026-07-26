import React, { useState, useEffect } from 'react';
import { BrandProvider, useBrand } from './context/BrandContext';
import { BrandTopBanner } from './components/Onboarding/BrandTopBanner';
import { BrandOnboardingModal } from './components/Onboarding/BrandOnboardingModal';
import { AdminConsole } from './components/Admin/AdminConsole';
import { Toast } from './components/Common/Toast';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage/LandingPage';
import { PrakritiQuizModal } from './components/PrakritiQuizModal';
import { DietPlanner } from './components/DietPlanner';
import { YogaStudio } from './components/YogaStudio';
import { HerbalRemedyVault } from './components/HerbalRemedyVault';
import { DinacharyaTracker } from './components/DinacharyaTracker';
import { DoshaGuideModal } from './components/DoshaGuideModal';
import { Footer } from './components/Footer';
import { PrakritiScore } from './types';

function MainAppContent() {
  const { activeTab, setActiveTab } = useBrand();
  const [prakritiScore, setPrakritiScore] = useState<PrakritiScore | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDoshaGuideOpen, setIsDoshaGuideOpen] = useState(false);

  // Sync hash routing for #/admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin' || window.location.pathname === '/admin') {
        setActiveTab('admin');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveTab]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950">
      
      {/* Top Brand Customization Banner */}
      <BrandTopBanner />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        prakritiScore={prakritiScore}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenDoshaGuide={() => setIsDoshaGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={setActiveTab}
            onOpenQuiz={() => setIsQuizOpen(true)}
            prakritiScore={prakritiScore}
          />
        )}

        {activeTab === 'prakriti' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Ayurvedic Prakriti Diagnostic</h2>
            <p className="text-sm text-stone-600 max-w-xl mx-auto">
              Discover your unique Tri-Dosha ratio (Vata, Pitta, Kapha) with our classical multi-question diagnostic engine.
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-8 py-4 rounded-2xl bg-amber-800 text-white font-bold text-sm shadow-lg hover:bg-amber-900 transition-all hover:scale-105"
            >
              Launch Interactive Prakriti Assessment
            </button>
          </div>
        )}

        {activeTab === 'aahar' && <DietPlanner prakritiScore={prakritiScore} />}

        {activeTab === 'yoga' && <YogaStudio />}

        {activeTab === 'dravyaguna' && <HerbalRemedyVault prakritiScore={prakritiScore} />}

        {activeTab === 'dinacharya' && <DinacharyaTracker />}

        {activeTab === 'admin' && <AdminConsole />}
      </main>

      {/* Onboarding Engine Modal & Toast */}
      <BrandOnboardingModal />
      <Toast />

      {/* Modals */}
      <PrakritiQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        prakritiScore={prakritiScore}
        setPrakritiScore={setPrakritiScore}
        setActiveTab={setActiveTab}
      />

      <DoshaGuideModal
        isOpen={isDoshaGuideOpen}
        onClose={() => setIsDoshaGuideOpen(false)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onOpenQuiz={() => setIsQuizOpen(true)} />

    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <MainAppContent />
    </BrandProvider>
  );
}
