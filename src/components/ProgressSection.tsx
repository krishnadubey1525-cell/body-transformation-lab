import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressLogger } from '@/components/ProgressLogger';
import { ProgressCharts } from '@/components/ProgressCharts';
import { ProgressEntry } from '@/types/fitness';
import { ArrowLeft, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ProgressSectionProps {
  onBack: () => void;
}

const STORAGE_KEY = 'physio-grow-progress';

export function ProgressSection({ onBack }: ProgressSectionProps) {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse progress data:', e);
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (entry: ProgressEntry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plan
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-display text-5xl md:text-6xl mb-4">
            TRACK YOUR <span className="gradient-text">PROGRESS</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Log your measurements and see how far you've come
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Logger + History */}
          <div className="space-y-6">
            <ProgressLogger onAddEntry={handleAddEntry} />

            {/* Entry History */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-display text-xl mb-4">Recent Entries</h3>
              {sortedEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No entries yet. Start logging!
                </p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {sortedEntries.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(new Date(entry.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="font-semibold">{entry.weight} kg</div>
                        {entry.workoutCompleted && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            Workout ✓
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Charts */}
          <div>
            <ProgressCharts entries={entries} />
          </div>
        </div>
      </div>
    </section>
  );
}
