import { FitnessResult, UserProfile } from '@/types/fitness';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Flame, Apple, Dumbbell, Pill, Clock, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ResultsSectionProps {
  result: FitnessResult;
  profile: UserProfile;
  onReset: () => void;
}

type Tab = 'overview' | 'diet' | 'workout' | 'supplements';

export function ResultsSection({ result, profile, onReset }: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Flame },
    { id: 'diet' as const, label: 'Diet Plan', icon: Apple },
    { id: 'workout' as const, label: 'Workouts', icon: Dumbbell },
    { id: 'supplements' as const, label: 'Supplements', icon: Pill },
  ];

  return (
    <section className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Start Over
          </button>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Plan
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            YOUR <span className="gradient-text">PERSONALIZED</span> PLAN
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your profile: {profile.age} years, {profile.height}cm, {profile.weight}kg
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground glow'
                  : 'glass-card hover:bg-muted'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-sm text-muted-foreground mb-2">BMI</div>
                <div className="font-display text-4xl gradient-text">{result.bmi}</div>
                <div className="text-sm mt-1">{result.bmiCategory}</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-sm text-muted-foreground mb-2">Daily Calories</div>
                <div className="font-display text-4xl text-accent">{result.dailyCalories}</div>
                <div className="text-sm mt-1">kcal/day</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-sm text-muted-foreground mb-2">Protein Target</div>
                <div className="font-display text-4xl">{result.dietPlan.protein}g</div>
                <div className="text-sm mt-1">per day</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-sm text-muted-foreground mb-2">Workout Days</div>
                <div className="font-display text-4xl">{result.workouts.length}</div>
                <div className="text-sm mt-1">per week</div>
              </div>

              {/* Macro breakdown */}
              <div className="glass-card p-6 rounded-2xl md:col-span-2 lg:col-span-4">
                <h3 className="font-display text-2xl mb-4">Daily Macros</h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="font-semibold">{result.dietPlan.protein}g</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Carbs</span>
                      <span className="font-semibold">{result.dietPlan.carbs}g</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Fats</span>
                      <span className="font-semibold">{result.dietPlan.fats}g</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diet' && (
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl mb-6">
                <h3 className="font-display text-2xl mb-2">Daily Target: {result.dietPlan.calories} kcal</h3>
                <p className="text-muted-foreground">
                  Protein: {result.dietPlan.protein}g | Carbs: {result.dietPlan.carbs}g | Fats: {result.dietPlan.fats}g
                </p>
              </div>

              {result.dietPlan.meals.map((meal, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-display text-xl">{meal.name}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <Clock className="w-4 h-4" />
                        {meal.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-display gradient-text">{meal.calories}</span>
                      <span className="text-sm text-muted-foreground ml-1">kcal</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {meal.foods.map((food, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'workout' && (
            <div className="space-y-6">
              {result.workouts.map((workout, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-sm text-primary font-semibold uppercase tracking-wider">
                        {workout.day}
                      </span>
                      <h3 className="font-display text-2xl mt-1">{workout.name}</h3>
                    </div>
                    <div className="text-right text-muted-foreground">
                      {workout.exercises.length} exercises
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-muted-foreground border-b border-border">
                          <th className="pb-3 font-medium">Exercise</th>
                          <th className="pb-3 font-medium text-center">Sets</th>
                          <th className="pb-3 font-medium text-center">Reps</th>
                          <th className="pb-3 font-medium text-center">Rest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workout.exercises.map((exercise, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-4">
                              <div className="font-medium">{exercise.name}</div>
                              {exercise.notes && (
                                <div className="text-sm text-muted-foreground">{exercise.notes}</div>
                              )}
                            </td>
                            <td className="py-4 text-center font-display text-lg">{exercise.sets}</td>
                            <td className="py-4 text-center">{exercise.reps}</td>
                            <td className="py-4 text-center text-muted-foreground">{exercise.rest}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'supplements' && (
            <div className="grid md:grid-cols-2 gap-4">
              {result.supplements.map((supp, index) => (
                <div
                  key={index}
                  className={`glass-card p-6 rounded-2xl relative overflow-hidden ${
                    supp.recommended ? 'border-2 border-primary/50' : ''
                  }`}
                >
                  {supp.recommended && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-primary/20 rounded text-xs text-primary font-semibold">
                      RECOMMENDED
                    </div>
                  )}
                  <h4 className="font-display text-xl mb-3">{supp.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{supp.purpose}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dosage</span>
                      <span>{supp.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timing</span>
                      <span>{supp.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
