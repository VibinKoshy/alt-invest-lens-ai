
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const allocationData = [
  {
    assetClass: 'Private Equity',
    target: 35,
    current: 38.5,
    tolerance: 5,
    status: 'warning',
    trend: 'up',
    rebalanceAction: 'Reduce by $15M'
  },
  {
    assetClass: 'Hedge Funds',
    target: 25,
    current: 23.2,
    tolerance: 5,
    status: 'good',
    trend: 'down',
    rebalanceAction: 'Increase by $8M'
  },
  {
    assetClass: 'Real Estate',
    target: 20,
    current: 19.8,
    tolerance: 3,
    status: 'good',
    trend: 'up',
    rebalanceAction: 'On target'
  },
  {
    assetClass: 'Infrastructure',
    target: 15,
    current: 13.1,
    tolerance: 3,
    status: 'good',
    trend: 'up',
    rebalanceAction: 'Increase by $5M'
  },
  {
    assetClass: 'Credit',
    target: 5,
    current: 5.4,
    tolerance: 2,
    status: 'good',
    trend: 'up',
    rebalanceAction: 'On target'
  }
];

interface AllocationComplianceProps {
  detailed?: boolean;
}

const AllocationCompliance = ({ detailed = false }: AllocationComplianceProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getProgressValue = (current: number, target: number, tolerance: number) => {
    const deviation = Math.abs(current - target);
    const complianceScore = Math.max(0, (tolerance - deviation) / tolerance) * 100;
    return Math.min(100, complianceScore);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Strategic Allocation Compliance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {allocationData.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">{item.assetClass}</span>
                {getTrendIcon(item.trend)}
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {item.current}% (Target: {item.target}%)
                </span>
                <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs">
                  {item.status}
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={getProgressValue(item.current, item.target, item.tolerance)} 
                className="h-2"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Tolerance: ±{item.tolerance}%</span>
              <span className={getStatusColor(item.status)}>{item.rebalanceAction}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AllocationCompliance;
