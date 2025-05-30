
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const riskMetrics = [
  {
    metric: 'Portfolio VaR (95%)',
    value: '8.2%',
    level: 65,
    status: 'moderate'
  },
  {
    metric: 'Concentration Risk',
    value: 'Medium',
    level: 45,
    status: 'good'
  },
  {
    metric: 'Liquidity Risk',
    value: 'High',
    level: 78,
    status: 'warning'
  },
  {
    metric: 'Vintage Diversification',
    value: 'Good',
    level: 35,
    status: 'good'
  }
];

const RiskMetrics = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'moderate': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'moderate': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
              <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={metric.level} 
                className="h-2"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor(metric.status)}`}
                style={{ width: `${metric.level}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RiskMetrics;
