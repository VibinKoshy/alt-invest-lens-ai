
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Leaf, Users, Shield } from 'lucide-react';

const esgMetrics = [
  {
    category: 'ESG Rating Compliance',
    icon: <Shield className="h-5 w-5 text-blue-600" />,
    current: 91,
    target: 85,
    unit: '%',
    status: 'good',
    description: 'Portfolio average ESG score'
  },
  {
    category: 'Carbon Intensity Target',
    icon: <Leaf className="h-5 w-5 text-green-600" />,
    current: 142,
    target: 150,
    unit: 'tCO2e/$M',
    status: 'good',
    description: 'Scope 1+2 emissions intensity'
  },
  {
    category: 'Impact Investment Allocation',
    icon: <Users className="h-5 w-5 text-purple-600" />,
    current: 12.5,
    target: 10.0,
    unit: '%',
    status: 'good',
    description: 'UN SDG aligned investments'
  }
];

const exclusionScreening = [
  { category: 'Tobacco', compliant: true, positions: 0 },
  { category: 'Weapons', compliant: true, positions: 0 },
  { category: 'Fossil Fuels', compliant: false, positions: 2 },
  { category: 'Gambling', compliant: true, positions: 0 }
];

interface ESGComplianceProps {
  detailed?: boolean;
}

const ESGCompliance = ({ detailed = false }: ESGComplianceProps) => {
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

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">ESG Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {esgMetrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {metric.icon}
                  <div>
                    <span className="text-sm font-medium text-gray-700">{metric.category}</span>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {metric.current}{metric.unit} / {metric.target}{metric.unit}
                  </span>
                  <Badge variant={getStatusBadgeVariant(metric.status)} className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={Math.min(100, (metric.current / metric.target) * 100)} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Exclusion Screening</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {exclusionScreening.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{item.positions} positions</span>
                  <Badge 
                    variant={item.compliant ? 'default' : 'destructive'} 
                    className="text-xs"
                  >
                    {item.compliant ? 'Compliant' : 'Review Required'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ESGCompliance;
