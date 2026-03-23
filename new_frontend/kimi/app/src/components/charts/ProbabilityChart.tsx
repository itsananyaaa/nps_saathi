import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

interface ProbabilityChartProps {
  data: {
    range: string;
    probability: number;
    isMedian: boolean;
  }[];
  height?: number;
}

export function ProbabilityChart({ data, height = 250 }: ProbabilityChartProps) {
  const formatXAxis = (value: string) => {
    // Shorten large numbers
    const num = parseInt(value.replace(/[^0-9]/g, ''));
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(0)}L`;
    return value;
  };

  const formatTooltip = (value: number, _name: string, props: any) => {
    const range = props.payload.range;
    return [`${value}% probability`, range];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis 
          dataKey="range"
          stroke="#6b7280"
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatXAxis}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          label={{ value: 'Probability', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
        />
        <Tooltip 
          formatter={formatTooltip}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
          }}
        />
        <ReferenceLine y={0} stroke="#e5e7eb" />
        <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.isMedian ? '#3b82f6' : '#93c5fd'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
