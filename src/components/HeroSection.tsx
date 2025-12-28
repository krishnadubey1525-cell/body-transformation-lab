import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Apple, Flame } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in">
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Transform Your Body, Transform Your Life</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-6 animate-slide-up">
          <span className="block text-foreground">UNLOCK YOUR</span>
          <span className="gradient-text">FULL POTENTIAL</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Get personalized diet plans, workout routines, and supplement recommendations 
          tailored to your unique body and goals.
        </p>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="hero" size="xl" onClick={onGetStarted} className="group">
            Start Your Transformation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card px-5 py-3 rounded-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Apple className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Custom Diet Plans</span>
          </div>
          <div className="glass-card px-5 py-3 rounded-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-medium">Workout Routines</span>
          </div>
          <div className="glass-card px-5 py-3 rounded-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Supplement Guide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
