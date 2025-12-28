import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ProgressEntry } from '@/types/fitness';
import { Plus } from 'lucide-react';

interface ProgressLoggerProps {
  onAddEntry: (entry: ProgressEntry) => void;
}

export function ProgressLogger({ onAddEntry }: ProgressLoggerProps) {
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight) return;

    const entry: ProgressEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      weight: parseFloat(weight),
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      hips: hips ? parseFloat(hips) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      thighs: thighs ? parseFloat(thighs) : undefined,
      workoutCompleted,
      notes: notes || undefined,
    };

    onAddEntry(entry);
    
    // Reset form
    setWeight('');
    setChest('');
    setWaist('');
    setHips('');
    setArms('');
    setThighs('');
    setWorkoutCompleted(false);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl">
      <h3 className="font-display text-2xl mb-6 gradient-text">Log Progress</h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70.5"
            required
            className="bg-secondary/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="chest">Chest (cm)</Label>
          <Input
            id="chest"
            type="number"
            step="0.1"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            placeholder="100"
            className="bg-secondary/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="waist">Waist (cm)</Label>
          <Input
            id="waist"
            type="number"
            step="0.1"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="80"
            className="bg-secondary/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hips">Hips (cm)</Label>
          <Input
            id="hips"
            type="number"
            step="0.1"
            value={hips}
            onChange={(e) => setHips(e.target.value)}
            placeholder="95"
            className="bg-secondary/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arms">Arms (cm)</Label>
          <Input
            id="arms"
            type="number"
            step="0.1"
            value={arms}
            onChange={(e) => setArms(e.target.value)}
            placeholder="35"
            className="bg-secondary/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="thighs">Thighs (cm)</Label>
          <Input
            id="thighs"
            type="number"
            step="0.1"
            value={thighs}
            onChange={(e) => setThighs(e.target.value)}
            placeholder="55"
            className="bg-secondary/50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Checkbox
          id="workout"
          checked={workoutCompleted}
          onCheckedChange={(checked) => setWorkoutCompleted(checked as boolean)}
        />
        <Label htmlFor="workout" className="cursor-pointer">
          Completed today's workout
        </Label>
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling? Any observations..."
          className="bg-secondary/50 resize-none"
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full" variant="hero">
        <Plus className="w-4 h-4 mr-2" />
        Log Entry
      </Button>
    </form>
  );
}
