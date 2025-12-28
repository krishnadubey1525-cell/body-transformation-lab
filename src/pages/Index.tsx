import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProfileForm } from '@/components/ProfileForm';
import { ResultsSection } from '@/components/ResultsSection';
import { UserProfile, FitnessResult } from '@/types/fitness';
import { generateFitnessResult } from '@/lib/fitnessCalculator';

type View = 'hero' | 'form' | 'results';

const Index = () => {
  const [view, setView] = useState<View>('hero');
  const [result, setResult] = useState<FitnessResult | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleGetStarted = () => setView('form');
  const handleBackToHero = () => setView('hero');

  const handleFormSubmit = (userProfile: UserProfile) => {
    const fitnessResult = generateFitnessResult(userProfile);
    setProfile(userProfile);
    setResult(fitnessResult);
    setView('results');
  };

  const handleReset = () => {
    setView('hero');
    setResult(null);
    setProfile(null);
  };

  return (
    <main className="min-h-screen">
      {view === 'hero' && <HeroSection onGetStarted={handleGetStarted} />}
      {view === 'form' && <ProfileForm onSubmit={handleFormSubmit} onBack={handleBackToHero} />}
      {view === 'results' && result && profile && (
        <ResultsSection result={result} profile={profile} onReset={handleReset} />
      )}
    </main>
  );
};

export default Index;
