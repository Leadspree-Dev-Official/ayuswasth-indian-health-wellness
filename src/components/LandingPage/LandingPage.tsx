import React from 'react';
import { HeroSection } from '../HeroSection';
import { TridoshaExplorer } from './TridoshaExplorer';
import { PillarsGrid } from './PillarsGrid';
import { FeaturedRecipesTeaser } from './FeaturedRecipesTeaser';
import { MiniPranayamaWidget } from './MiniPranayamaWidget';
import { DinacharyaTimeline } from './DinacharyaTimeline';
import { VaidyaSpotlight } from './VaidyaSpotlight';
import { FaqSection } from './FaqSection';
import { PrakritiScore } from '../../types';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
  onOpenQuiz: () => void;
  prakritiScore: PrakritiScore | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  onOpenQuiz,
  prakritiScore,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Expansive Hero Section */}
      <HeroSection
        setActiveTab={setActiveTab}
        onOpenQuiz={onOpenQuiz}
        prakritiScore={prakritiScore}
      />

      {/* Main Container for Landing Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Interactive Tridosha Bio-Energy Explorer */}
        <TridoshaExplorer onOpenQuiz={onOpenQuiz} setActiveTab={setActiveTab} />

        {/* The 5 Pillars of Swastha Ayurveda */}
        <PillarsGrid setActiveTab={setActiveTab} onOpenQuiz={onOpenQuiz} />

        {/* Featured Sattvic Recipes & AI Meal Engine Teaser */}
        <FeaturedRecipesTeaser setActiveTab={setActiveTab} />

        {/* 1-Minute Mindful Breath Reset Widget */}
        <MiniPranayamaWidget />

        {/* Daily Dinacharya Circadian Journey Timeline */}
        <DinacharyaTimeline setActiveTab={setActiveTab} />

        {/* AI Vaidya Consultation Spotlight */}
        <VaidyaSpotlight setActiveTab={setActiveTab} />

        {/* Classical Wisdom & FAQ Section */}
        <FaqSection onOpenQuiz={onOpenQuiz} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
