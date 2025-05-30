
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const data = [
  { name: 'Private Equity', value: 35, color: '#1f2937' },
  { name: 'Hedge Funds', value: 25, color: '#3b82f6' },
  { name: 'Real Estate', value: 20, color: '#6366f1' },
  { name: 'Infrastructure', value: 15, color: '#8b5cf6' },
  { name: 'Other Alternatives', value: 5, color: '#a855f7' }
];

const AllocationChart = () => {
  const isMobile = useIsMobile();

  // Responsive chart dimensions
  const chartHeight = isMobile ? 250 : 300;
  const innerRadius = isMobile ? 40 : 60;
  const outerRadius = isMobile ? 80 : 120;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllocationChart;
