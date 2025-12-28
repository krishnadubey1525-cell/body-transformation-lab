import { ProgressEntry } from '@/types/fitness';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { format } from 'date-fns';
import { useState } from 'react';
import { Scale, Ruler, Dumbbell } from 'lucide-react';

interface ProgressChartsProps {
  entries: ProgressEntry[];
}

type ChartType = 'weight' | 'measurements' | 'workouts';

export function ProgressCharts({ entries }: ProgressChartsProps) {
  const [activeChart, setActiveChart] = useState<ChartType>('weight');

  const chartData = entries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      ...entry,
      dateLabel: format(new Date(entry.date), 'MMM d'),
      dateShort: format(new Date(entry.date), 'dd'),
    }));

  // Calculate workout stats
  const workoutData = chartData.map((entry, index) => {
    const weekStart = Math.floor(index / 7);
    return {
      ...entry,
      week: `Week ${weekStart + 1}`,
      completed: entry.workoutCompleted ? 1 : 0,
    };
  });

  // Group by week for workout chart
  const weeklyWorkouts = workoutData.reduce((acc, entry) => {
    const week = entry.week;
    if (!acc[week]) {
      acc[week] = { week, completed: 0, total: 0 };
    }
    acc[week].total += 1;
    acc[week].completed += entry.completed;
    return acc;
  }, {} as Record<string, { week: string; completed: number; total: number }>);

  const weeklyData = Object.values(weeklyWorkouts);

  const charts = [
    { id: 'weight' as const, label: 'Weight', icon: Scale },
    { id: 'measurements' as const, label: 'Measurements', icon: Ruler },
    { id: 'workouts' as const, label: 'Workouts', icon: Dumbbell },
  ];

  if (entries.length === 0) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <div className="text-muted-foreground">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No progress data yet</p>
          <p className="text-sm mt-2">Start logging your progress to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Toggle */}
      <div className="flex flex-wrap gap-2">
        {charts.map((chart) => (
          <button
            key={chart.id}
            onClick={() => setActiveChart(chart.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeChart === chart.id
                ? 'bg-primary text-primary-foreground'
                : 'glass-card hover:bg-muted'
            }`}
          >
            <chart.icon className="w-4 h-4" />
            {chart.label}
          </button>
        ))}
      </div>

      {/* Weight Chart */}
      {activeChart === 'weight' && (
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-display text-xl mb-4">Weight Progress</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="dateLabel"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#weightGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Start</div>
              <div className="font-display text-xl">{chartData[0]?.weight} kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="font-display text-xl gradient-text">
                {chartData[chartData.length - 1]?.weight} kg
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Change</div>
              <div className={`font-display text-xl ${
                (chartData[chartData.length - 1]?.weight - chartData[0]?.weight) < 0
                  ? 'text-green-400'
                  : 'text-accent'
              }`}>
                {((chartData[chartData.length - 1]?.weight || 0) - (chartData[0]?.weight || 0)).toFixed(1)} kg
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Measurements Chart */}
      {activeChart === 'measurements' && (
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-display text-xl mb-4">Body Measurements</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="dateLabel"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line
                  type="monotone"
                  dataKey="chest"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  name="Chest"
                />
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))' }}
                  name="Waist"
                />
                <Line
                  type="monotone"
                  dataKey="arms"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                  name="Arms"
                />
                <Line
                  type="monotone"
                  dataKey="thighs"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b' }}
                  name="Thighs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Chest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Waist</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
              <span className="text-sm text-muted-foreground">Arms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
              <span className="text-sm text-muted-foreground">Thighs</span>
            </div>
          </div>
        </div>
      )}

      {/* Workouts Chart */}
      {activeChart === 'workouts' && (
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-display text-xl mb-4">Workout Completion</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar
                  dataKey="completed"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  name="Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Workout Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total Workouts</div>
              <div className="font-display text-2xl gradient-text">
                {entries.filter((e) => e.workoutCompleted).length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Completion Rate</div>
              <div className="font-display text-2xl text-accent">
                {entries.length > 0
                  ? Math.round(
                      (entries.filter((e) => e.workoutCompleted).length / entries.length) * 100
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
