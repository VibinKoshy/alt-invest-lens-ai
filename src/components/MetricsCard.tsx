
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  subtitle?: string;
}

const MetricsCard = ({ title, value, change, changeType, subtitle }: MetricsCardProps) => {
  const isPositive = changeType === 'positive';
  
  return (
    <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
