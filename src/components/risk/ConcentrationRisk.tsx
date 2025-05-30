
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const concentrationData = [
  {
    category: 'Single Investment',
    current: 4.2,
    limit: 5.0,
    status: 'good',
    description: 'Largest single position'
  },
  {
    category: 'Asset Class (PE)',
    current: 38.5,
    limit: 40.0,
    status: 'warning',
    description: 'Private Equity allocation'
  },
  {
    category: 'Geographic (North America)',
    current: 58.2,
    limit: 60.0,
    status: 'warning',
    description: 'Regional concentration'
  },
  {
    category: 'Vintage Year (2023)',
    current: 18.7,
    limit: 25.0,
    status: 'good',
    description: 'Single vintage exposure'
  },
  {
    category: 'Manager Concentration',
    current: 15.3,
    limit: 20.0,
    status: 'good',
    description: 'Top manager exposure'
  }
];

interface ConcentrationRiskProps {
  detailed?: boolean;
}

const ConcentrationRisk = ({ detailed = false }: ConcentrationRiskProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
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

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Concentration Risk Monitor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {concentrationData.map((item, index) => (
          <div key={index} className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-xs md:text-sm font-medium text-gray-700 block">{item.category}</span>
                <p className="text-xs text-gray-500 leading-tight">{item.description}</p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                <span className="text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">
                  {item.current}% / {item.limit}%
                </span>
                <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs">
                  {item.status}
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={(item.current / item.limit) * 100} 
                className="h-2 md:h-3"
              />
              <div 
                className={`absolute top-0 left-0 h-2 md:h-3 rounded-full transition-all ${getProgressColor(item.status)}`}
                style={{ width: `${(item.current / item.limit) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ConcentrationRisk;
