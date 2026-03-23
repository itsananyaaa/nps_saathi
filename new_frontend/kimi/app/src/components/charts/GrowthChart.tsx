import { 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';

interface GrowthChartProps {
  data: {
    age: number;
    corpus: number;
    contribution: number;
  }[];
  height?: number;
}

export function GrowthChart({ data, height = 300 }: GrowthChartProps) {
  const formatYAxis = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const formatTooltip = (value: number, name: string) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
    return [formatted, name === 'corpus' ? 'Total Corpus' : 'Total Contribution'];
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="corpusGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="age" 
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: '#6b7280' }}
        />
        <YAxis 
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatYAxis}
        />
        <Tooltip 
          formatter={formatTooltip}
          labelFormatter={(label) => `Age: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px',
          }}
        />
        <Area
          type="monotone"
          dataKey="corpus"
          stroke="none"
          fill="url(#corpusGradient)"
        />
        <Line
          type="monotone"
          dataKey="corpus"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="contribution"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
