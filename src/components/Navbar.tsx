import React, { useState } from 'react';
import { Sparkles, HeartPulse, Utensils, Activity, Leaf, Sun, Menu, X, BookOpen, Key, Palette } from 'lucide-react';
import { PrakritiScore } from '../types';
import { useBrand } from '../context/BrandContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  prakritiScore: PrakritiScore | null;
  onOpenQuiz: () => void;
  onOpenDoshaGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  prakritiScore,
  onOpenQuiz,
  onOpenDoshaGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { brandProfile, setIsModalOpen } = useBrand();

  const navItems = [
    { id: 'home', label: 'Home', icon: Sun },
    { id: 'prakriti', label: 'Prakriti Diagnostic', icon: HeartPulse },
    { id: 'aahar', label: 'Aahar (Nutrition)', icon: Utensils },
    { id: 'yoga', label: 'Yog & Pranayama', icon: Activity },
    { id: 'dravyaguna', label: 'Herbal Remedies & AI Vaidya', icon: Leaf },
    { id: 'dinacharya', label: 'Daily Dinacharya Tracker', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
              <span className="font-serif text-2xl font-bold tracking-wider">ॐ</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-amber-950 flex items-center gap-1.5">
                {brandProfile.businessName} <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-sans font-medium uppercase tracking-wider">Ayurveda</span>
              </span>
              <p className="text-xs text-stone-500 font-sans tracking-wide">Modern Indian Health & Wellness</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'text-stone-700 hover:text-amber-800 hover:bg-amber-100/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100/90 hover:bg-amber-200 rounded-xl transition-all border border-amber-300"
              title="Design Your Brand Demo"
            >
              <Palette className="w-3.5 h-3.5 text-amber-800" />
              Custom Brand
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-800 hover:text-amber-950 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-all border border-stone-200"
              title="Executive Admin Console"
            >
              <Key className="w-3.5 h-3.5 text-amber-800" />
              Admin
            </button>

            <button
              onClick={onOpenDoshaGuide}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-amber-900 bg-stone-100 hover:bg-amber-100/80 rounded-xl transition-all border border-stone-200"
              title="Learn about Vata, Pitta & Kapha"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              Dosha Guide
            </button>

            {prakritiScore ? (
              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200 rounded-xl transition-all border border-emerald-300 shadow-2xs"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Dosha: <span className="uppercase font-bold tracking-wider">{prakritiScore.dominant}</span>
              </button>
            ) : (
              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <HeartPulse className="w-4 h-4 text-amber-200" />
                Find My Prakriti
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 rounded-lg hover:bg-stone-200/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-amber-900/10 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-700 text-white font-semibold'
                    : 'text-stone-700 hover:bg-amber-100/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-950 bg-amber-200/80 rounded-xl"
            >
              <Palette className="w-4 h-4 text-amber-900" />
              Design Your Brand Demo
            </button>

            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-stone-900 bg-stone-200 rounded-xl"
            >
              <Key className="w-4 h-4 text-amber-800" />
              🔑 Admin Console
            </button>

            <button
              onClick={() => {
                onOpenDoshaGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-800 bg-stone-200/80 rounded-xl"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              Explore Dosha Guide
            </button>

            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-amber-700 rounded-xl"
            >
              <HeartPulse className="w-4 h-4" />
              {prakritiScore ? `Prakriti: ${prakritiScore.dominant.toUpperCase()}` : 'Take Prakriti Diagnostic'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

