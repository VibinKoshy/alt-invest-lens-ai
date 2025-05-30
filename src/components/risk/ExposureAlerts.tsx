
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useState } from 'react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    category: 'Concentration Risk',
    title: 'Private Equity allocation approaching limit',
    description: 'Current allocation (38.5%) is within 1.5% of the 40% limit',
    timestamp: '2 hours ago',
    actionRequired: true
  },
  {
    id: 2,
    type: 'warning',
    category: 'Geographic Exposure',
    title: 'North America concentration high',
    description: 'Regional allocation at 58.2% of 60% limit',
    timestamp: '4 hours ago',
    actionRequired: false
  },
  {
    id: 3,
    type: 'info',
    category: 'ESG Compliance',
    title: 'Fossil fuel exclusion review needed',
    description: '2 positions require ESG compliance review',
    timestamp: '1 day ago',
    actionRequired: true
  },
  {
    id: 4,
    type: 'warning',
    category: 'Liquidity Risk',
    title: 'Quarterly liquidity requirements',
    description: 'Q4 liquidity needs may exceed available cash',
    timestamp: '2 days ago',
    actionRequired: true
  },
  {
    id: 5,
    type: 'info',
    category: 'Regulatory',
    title: 'Monthly reporting due',
    description: 'October regulatory filing due in 5 days',
    timestamp: '3 days ago',
    actionRequired: false
  }
];

interface ExposureAlertsProps {
  filter: 'all' | 'critical' | 'warning';
  onFilterChange: (filter: 'all' | 'critical' | 'warning') => void;
}

const ExposureAlerts = ({ filter, onFilterChange }: ExposureAlertsProps) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (dismissedAlerts.includes(alert.id)) return false;
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const dismissAlert = (alertId: number) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Exposure Alerts</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'critical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('critical')}
            >
              Critical
            </Button>
            <Button
              variant={filter === 'warning' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('warning')}
            >
              Warning
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Info className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No alerts matching current filter</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                      <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                        {alert.category}
                      </Badge>
                      {alert.actionRequired && (
                        <Badge variant="outline" className="text-xs text-orange-600">
                          Action Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <span className="text-xs text-gray-400">{alert.timestamp}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissAlert(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExposureAlerts;
