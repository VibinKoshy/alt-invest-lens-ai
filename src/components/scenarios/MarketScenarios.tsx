
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { Assumptions } from '@/pages/ScenarioModeling';

interface MarketScenariosProps {
  onLoadScenario: (assumptions: Assumptions) => void;
}

const MarketScenarios = ({ onLoadScenario }: MarketScenariosProps) => {
  const presetScenarios: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    severity: 'positive' | 'negative' | 'neutral' | 'warning';
    assumptions: Assumptions;
  }> = [
    {
      id: 'bull-market',
      name: 'Bull Market (2021-2022)',
      description: 'Strong economic growth, low rates, high market confidence',
      icon: <TrendingUp className="h-5 w-5" />,
      severity: 'positive',
      assumptions: {
        capitalCallFrequency: 8,
        distributionTiming: 'quarterly',
        commitmentPace: 150,
        reserveRatio: 10,
        privateEquityIRR: 22,
        hedgeFundsIRR: 18,
        realEstateIRR: 15,
        infrastructureIRR: 12,
        economicGrowth: 6,
        interestRate: 1.5,
        marketVolatility: 'low',
        inflation: 2
      }
    },
    {
      id: 'financial-crisis',
      name: 'Financial Crisis (2008)',
      description: 'Market crash, credit freeze, economic recession',
      icon: <TrendingDown className="h-5 w-5" />,
      severity: 'negative',
      assumptions: {
        capitalCallFrequency: 18,
        distributionTiming: 'annual',
        commitmentPace: 50,
        reserveRatio: 25,
        privateEquityIRR: 8,
        hedgeFundsIRR: 5,
        realEstateIRR: 3,
        infrastructureIRR: 6,
        economicGrowth: -3,
        interestRate: 2,
        marketVolatility: 'high',
        inflation: 1
      }
    },
    {
      id: 'covid-recovery',
      name: 'COVID-19 Recovery (2020-2021)',
      description: 'Pandemic impact, fiscal stimulus, uneven recovery',
      icon: <Activity className="h-5 w-5" />,
      severity: 'warning',
      assumptions: {
        capitalCallFrequency: 15,
        distributionTiming: 'quarterly',
        commitmentPace: 80,
        reserveRatio: 20,
        privateEquityIRR: 12,
        hedgeFundsIRR: 10,
        realEstateIRR: 8,
        infrastructureIRR: 9,
        economicGrowth: 2,
        interestRate: 0.5,
        marketVolatility: 'high',
        inflation: 4
      }
    },
    {
      id: 'inflation-spike',
      name: 'Inflation Spike (2022-2023)',
      description: 'High inflation, aggressive rate hikes, market uncertainty',
      icon: <AlertTriangle className="h-5 w-5" />,
      severity: 'warning',
      assumptions: {
        capitalCallFrequency: 14,
        distributionTiming: 'quarterly',
        commitmentPace: 90,
        reserveRatio: 18,
        privateEquityIRR: 10,
        hedgeFundsIRR: 8,
        realEstateIRR: 12,
        infrastructureIRR: 11,
        economicGrowth: 1,
        interestRate: 7,
        marketVolatility: 'medium',
        inflation: 6
      }
    },
    {
      id: 'base-case',
      name: 'Base Case Scenario',
      description: 'Moderate growth, stable markets, normal conditions',
      icon: <Activity className="h-5 w-5" />,
      severity: 'neutral',
      assumptions: {
        capitalCallFrequency: 12,
        distributionTiming: 'quarterly',
        commitmentPace: 100,
        reserveRatio: 15,
        privateEquityIRR: 15,
        hedgeFundsIRR: 12,
        realEstateIRR: 10,
        infrastructureIRR: 8,
        economicGrowth: 3,
        interestRate: 5,
        marketVolatility: 'medium',
        inflation: 2.5
      }
    }
  ];

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const getCardBorder = (severity: string) => {
    switch (severity) {
      case 'positive': return 'border-green-200 hover:border-green-300';
      case 'negative': return 'border-red-200 hover:border-red-300';
      case 'warning': return 'border-yellow-200 hover:border-yellow-300';
      default: return 'border-gray-200 hover:border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Historical Market Scenarios</h3>
        <p className="text-gray-600">
          Apply preset scenarios based on historical market conditions to test portfolio resilience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presetScenarios.map((scenario) => (
          <Card 
            key={scenario.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${getCardBorder(scenario.severity)}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    scenario.severity === 'positive' ? 'bg-green-100 text-green-600' :
                    scenario.severity === 'negative' ? 'bg-red-100 text-red-600' :
                    scenario.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {scenario.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">{scenario.name}</CardTitle>
                  </div>
                </div>
                <Badge variant={getBadgeVariant(scenario.severity)} className="text-xs">
                  {scenario.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {scenario.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Economic Growth:</span>
                  <span className="font-medium">{scenario.assumptions.economicGrowth}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Interest Rate:</span>
                  <span className="font-medium">{scenario.assumptions.interestRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">PE IRR:</span>
                  <span className="font-medium">{scenario.assumptions.privateEquityIRR}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Market Volatility:</span>
                  <span className="font-medium capitalize">{scenario.assumptions.marketVolatility}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                variant="outline"
                onClick={() => onLoadScenario(scenario.assumptions)}
              >
                Apply Scenario
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Custom Scenario Builder</h4>
              <p className="text-sm text-blue-700 mb-3">
                Use the Interactive Modeling tab to create custom scenarios with your own assumptions.
                Save your scenarios for future comparison and analysis.
              </p>
              <div className="text-xs text-blue-600">
                💡 Tip: Start with a preset scenario and modify the assumptions to create variants
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketScenarios;
