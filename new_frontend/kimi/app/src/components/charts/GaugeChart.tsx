import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue?: number;
  size?: number;
}

export function GaugeChart({ value, maxValue = 100, size = 200 }: GaugeChartProps) {
  const percentage = Math.min(value / maxValue, 1);
  
  // Create gauge segments
  const data = [
    { name: 'filled', value: percentage * 75 }, // 75% of circle for gauge
    { name: 'empty', value: 75 - percentage * 75 },
    { name: 'hidden', value: 25 }, // 25% hidden (bottom)
  ];

  const getColor = (val: number) => {
    if (val >= 80) return '#22c55e';
    if (val >= 60) return '#3b82f6';
    if (val >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const color = getColor(value);

  return (
    <div className="relative" style={{ width: size, height: size * 0.7 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={size * 0.35}
            outerRadius={size * 0.5}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
        <span className="text-4xl font-bold" style={{ color }}>{value}</span>
        <span className="text-sm text-gray-500">/ {maxValue}</span>
      </div>

      {/* Gauge Labels */}
      <div className="absolute bottom-0 left-0 text-xs text-gray-400">0</div>
      <div className="absolute bottom-0 right-0 text-xs text-gray-400">{maxValue}</div>
    </div>
  );
}
