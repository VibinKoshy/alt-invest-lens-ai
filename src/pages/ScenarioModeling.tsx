import { useState } from 'react';
import AssumptionControls from '@/components/scenarios/AssumptionControls';
import ForecastDisplay from '@/components/scenarios/ForecastDisplay';
import ScenarioComparison from '@/components/scenarios/ScenarioComparison';
import MarketScenarios from '@/components/scenarios/MarketScenarios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export interface Assumptions {
  capitalCallFrequency: number;
  distributionTiming: 'quarterly' | 'annual';
  commitmentPace: number;
  reserveRatio: number;
  privateEquityIRR: number;
  hedgeFundsIRR: number;
  realEstateIRR: number;
  infrastructureIRR: number;
  economicGrowth: number;
  interestRate: number;
  marketVolatility: 'low' | 'medium' | 'high';
  inflation: number;
}
const defaultAssumptions: Assumptions = {
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
};
const ScenarioModeling = () => {
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);
  const [savedScenarios, setSavedScenarios] = useState<Array<{
    id: string;
    name: string;
    assumptions: Assumptions;
  }>>([]);
  const updateAssumption = (key: keyof Assumptions, value: any) => {
    setAssumptions(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const resetAssumptions = () => {
    setAssumptions(defaultAssumptions);
  };
  const saveScenario = (name: string) => {
    const newScenario = {
      id: Date.now().toString(),
      name,
      assumptions: {
        ...assumptions
      }
    };
    setSavedScenarios(prev => [...prev, newScenario]);
  };
  const loadScenario = (scenarioAssumptions: Assumptions) => {
    setAssumptions(scenarioAssumptions);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Scenario Modeling</h2>
          <p className="text-sm md:text-base text-gray-600">Adjust assumptions and view real-time portfolio forecasts</p>
        </div>

        <Tabs defaultValue="presets" className="space-y-6 md:space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1">
            <TabsTrigger value="presets" className="text-xs sm:text-sm px-2 md:px-4 py-2 whitespace-nowrap">
              Market Scenarios
            </TabsTrigger>
            <TabsTrigger value="modeling" className="text-xs sm:text-sm px-2 md:px-4 py-2 whitespace-nowrap">
              Interactive Modeling
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs sm:text-sm px-2 md:px-4 py-2 whitespace-nowrap">
              Scenario Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presets">
            <MarketScenarios onLoadScenario={loadScenario} />
          </TabsContent>

          <TabsContent value="modeling" className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-1">
                <AssumptionControls assumptions={assumptions} onUpdateAssumption={updateAssumption} onReset={resetAssumptions} onSave={saveScenario} />
              </div>
              <div className="lg:col-span-2">
                <ForecastDisplay assumptions={assumptions} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <ScenarioComparison currentScenario={{
            name: 'Current',
            assumptions
          }} savedScenarios={savedScenarios} onLoadScenario={loadScenario} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
export default ScenarioModeling;
