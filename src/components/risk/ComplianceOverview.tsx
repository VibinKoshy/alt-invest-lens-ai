
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const overviewMetrics = [
  {
    title: 'Overall Compliance Score',
    value: '94%',
    status: 'good',
    trend: 'up',
    change: '+2%',
    description: 'Exceeds regulatory requirements'
  },
  {
    title: 'Active Alerts',
    value: '3',
    status: 'warning',
    trend: 'down',
    change: '-2',
    description: '1 critical, 2 warnings'
  },
  {
    title: 'ESG Compliance',
    value: '91%',
    status: 'good',
    trend: 'up',
    change: '+5%',
    description: 'Above target threshold'
  },
  {
    title: 'Concentration Risk',
    value: 'Medium',
    status: 'moderate',
    trend: 'stable',
    change: '0%',
    description: 'Within acceptable limits'
  }
];

interface ComplianceOverviewProps {
  detailed?: boolean;
}

const ComplianceOverview = ({ detailed = false }: ComplianceOverviewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'moderate': return 'text-blue-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'moderate': return 'outline';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 col-span-full">
      {overviewMetrics.map((metric, index) => (
        <Card key={index} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <Badge variant={getStatusBadgeVariant(metric.status)} className="text-xs">
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(metric.trend)}
                <span className="text-sm font-medium text-gray-600">{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComplianceOverview;
