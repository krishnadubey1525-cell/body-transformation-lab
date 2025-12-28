import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile } from '@/types/fitness';
import { ArrowLeft, ArrowRight, User, Target, Activity } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const goals = [
  { value: 'lose-weight', label: 'Lose Weight', icon: '🔥' },
  { value: 'gain-muscle', label: 'Build Muscle', icon: '💪' },
  { value: 'aesthetic', label: 'Aesthetic Body', icon: '✨' },
  { value: 'gain-height', label: 'Maximize Height', icon: '📏' },
  { value: 'general-fitness', label: 'General Fitness', icon: '❤️' },
] as const;

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Light', desc: '1-3 days/week' },
  { value: 'moderate', label: 'Moderate', desc: '3-5 days/week' },
  { value: 'active', label: 'Active', desc: '6-7 days/week' },
  { value: 'very-active', label: 'Very Active', desc: 'Intense daily training' },
] as const;

export function ProfileForm({ onSubmit, onBack }: ProfileFormProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'male',
    activityLevel: 'moderate',
    healthIssues: '',
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (profile.height && profile.weight && profile.age && profile.goal) {
      onSubmit(profile as UserProfile);
    }
  };

  const isStep1Valid = profile.height && profile.weight && profile.age && profile.gender;
  const isStep2Valid = profile.goal;
  const isStep3Valid = profile.activityLevel;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg transition-all ${
                  step >= i
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 rounded ${step > i ? 'bg-primary' : 'bg-secondary'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass-card rounded-2xl p-8">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl">Your Details</h2>
                  <p className="text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={profile.height || ''}
                      onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={profile.weight || ''}
                      onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={profile.age || ''}
                      onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <div className="flex gap-2 mt-2">
                      {['male', 'female'].map((g) => (
                        <button
                          key={g}
                          onClick={() => setProfile({ ...profile, gender: g as 'male' | 'female' })}
                          className={`flex-1 py-2.5 rounded-lg capitalize font-medium transition-all ${
                            profile.gender === g
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="health">Health Issues (optional)</Label>
                  <Textarea
                    id="health"
                    placeholder="Any injuries, conditions, or limitations..."
                    value={profile.healthIssues}
                    onChange={(e) => setProfile({ ...profile, healthIssues: e.target.value })}
                    className="mt-2 bg-secondary border-border resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-3xl">Your Goal</h2>
                  <p className="text-muted-foreground">What do you want to achieve?</p>
                </div>
              </div>

              <div className="grid gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setProfile({ ...profile, goal: goal.value })}
                    className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                      profile.goal === goal.value
                        ? 'bg-primary/20 border-2 border-primary'
                        : 'bg-secondary border-2 border-transparent hover:border-border'
                    }`}
                  >
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-semibold text-lg">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-3xl">Activity Level</h2>
                  <p className="text-muted-foreground">How active are you currently?</p>
                </div>
              </div>

              <div className="grid gap-3">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setProfile({ ...profile, activityLevel: level.value })}
                    className={`flex items-center justify-between p-4 rounded-xl text-left transition-all ${
                      profile.activityLevel === level.value
                        ? 'bg-primary/20 border-2 border-primary'
                        : 'bg-secondary border-2 border-transparent hover:border-border'
                    }`}
                  >
                    <span className="font-semibold">{level.label}</span>
                    <span className="text-sm text-muted-foreground">{level.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="ghost" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!isStep3Valid}
              >
                Generate My Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
