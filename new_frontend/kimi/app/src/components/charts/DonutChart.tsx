import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  size?: number;
  showLegend?: boolean;
}

export function DonutChart({ data, size = 200, showLegend = true }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.3}
            outerRadius={size * 0.45}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Allocation']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute" style={{ 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        marginTop: '-20px'
      }}>
        <span className="text-lg font-bold text-gray-700">{total}%</span>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <div 
                className="w-3 h-3 rounded-full mb-1" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.name}</span>
              <span className="text-xs font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
