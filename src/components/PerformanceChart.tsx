
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', portfolio: 8.2, benchmark: 7.1 },
  { month: 'Feb', portfolio: 9.1, benchmark: 7.8 },
  { month: 'Mar', portfolio: 8.8, benchmark: 8.2 },
  { month: 'Apr', portfolio: 10.2, benchmark: 8.9 },
  { month: 'May', portfolio: 11.5, benchmark: 9.2 },
  { month: 'Jun', portfolio: 12.1, benchmark: 9.8 },
  { month: 'Jul', portfolio: 13.2, benchmark: 10.1 },
  { month: 'Aug', portfolio: 12.8, benchmark: 9.9 },
  { month: 'Sep', portfolio: 14.1, benchmark: 10.5 },
  { month: 'Oct', portfolio: 15.2, benchmark: 11.2 },
  { month: 'Nov', portfolio: 16.8, benchmark: 11.8 },
  { month: 'Dec', portfolio: 17.5, benchmark: 12.1 }
];

const PerformanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance vs Benchmark</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name === 'portfolio' ? 'Portfolio' : 'Benchmark']}
            labelStyle={{ color: '#374151' }}
          />
          <Line 
            type="monotone" 
            dataKey="portfolio" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#6b7280" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
