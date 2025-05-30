
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Play } from 'lucide-react';
import { Assumptions } from '@/pages/ScenarioModeling';

interface Scenario {
  id: string;
  name: string;
  assumptions: Assumptions;
}

interface ScenarioComparisonProps {
  currentScenario: { name: string; assumptions: Assumptions };
  savedScenarios: Scenario[];
  onLoadScenario: (assumptions: Assumptions) => void;
}

const ScenarioComparison = ({ currentScenario, savedScenarios, onLoadScenario }: ScenarioComparisonProps) => {
  const calculateProjectedNAV = (assumptions: Assumptions) => {
    const baseGrowth = (assumptions.privateEquityIRR * 0.35 + 
                       assumptions.hedgeFundsIRR * 0.25 + 
                       assumptions.realEstateIRR * 0.20 + 
                       assumptions.infrastructureIRR * 0.15 + 
                       8 * 0.05) / 100;
    
    const marketImpact = assumptions.marketVolatility === 'high' ? 0.85 : 
                        assumptions.marketVolatility === 'low' ? 1.15 : 1.0;
    
    const economicImpact = 1 + (assumptions.economicGrowth / 100) * 0.3;
    const adjustedGrowth = baseGrowth * marketImpact * economicImpact;
    
    return 2400 * Math.pow(1 + adjustedGrowth, 5); // 5-year projection
  };

  const calculatePortfolioIRR = (assumptions: Assumptions) => {
    return (assumptions.privateEquityIRR * 0.35 + 
            assumptions.hedgeFundsIRR * 0.25 + 
            assumptions.realEstateIRR * 0.20 + 
            assumptions.infrastructureIRR * 0.15 + 
            8 * 0.05).toFixed(1);
  };

  const allScenarios = [currentScenario, ...savedScenarios];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-900">Scenario</th>
                  <th className="text-right p-4 font-medium text-gray-900">Portfolio IRR</th>
                  <th className="text-right p-4 font-medium text-gray-900">5-Year NAV</th>
                  <th className="text-right p-4 font-medium text-gray-900">Capital Call Freq.</th>
                  <th className="text-right p-4 font-medium text-gray-900">Market Vol.</th>
                  <th className="text-center p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allScenarios.map((scenario, index) => {
                  const isCurrentScenario = index === 0;
                  const projectedNAV = calculateProjectedNAV(scenario.assumptions);
                  const portfolioIRR = calculatePortfolioIRR(scenario.assumptions);
                  
                  return (
                    <tr key={scenario.name} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{scenario.name}</span>
                          {isCurrentScenario && (
                            <Badge variant="secondary">Current</Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-right p-4 font-mono">{portfolioIRR}%</td>
                      <td className="text-right p-4 font-mono">
                        ${(projectedNAV / 1000).toFixed(1)}B
                      </td>
                      <td className="text-right p-4">
                        {scenario.assumptions.capitalCallFrequency} months
                      </td>
                      <td className="text-right p-4 capitalize">
                        {scenario.assumptions.marketVolatility}
                      </td>
                      <td className="text-center p-4">
                        {!isCurrentScenario && (
                          <div className="flex items-center justify-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onLoadScenario(scenario.assumptions)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Load
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Best Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const bestScenario = allScenarios.reduce((best, current) => 
                parseFloat(calculatePortfolioIRR(current.assumptions)) > 
                parseFloat(calculatePortfolioIRR(best.assumptions)) ? current : best
              );
              return (
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {calculatePortfolioIRR(bestScenario.assumptions)}%
                  </p>
                  <p className="text-sm text-gray-600">{bestScenario.name}</p>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Highest NAV</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const highestNAVScenario = allScenarios.reduce((highest, current) => 
                calculateProjectedNAV(current.assumptions) > 
                calculateProjectedNAV(highest.assumptions) ? current : highest
              );
              const nav = calculateProjectedNAV(highestNAVScenario.assumptions);
              return (
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    ${(nav / 1000).toFixed(1)}B
                  </p>
                  <p className="text-sm text-gray-600">{highestNAVScenario.name}</p>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Conservative</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const conservativeScenario = allScenarios.reduce((conservative, current) => 
                current.assumptions.marketVolatility === 'low' && 
                current.assumptions.economicGrowth < conservative.assumptions.economicGrowth ? 
                current : conservative
              );
              return (
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {calculatePortfolioIRR(conservativeScenario.assumptions)}%
                  </p>
                  <p className="text-sm text-gray-600">{conservativeScenario.name}</p>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioComparison;
