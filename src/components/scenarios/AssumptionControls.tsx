
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw, Save } from 'lucide-react';
import { Assumptions } from '@/pages/ScenarioModeling';

interface AssumptionControlsProps {
  assumptions: Assumptions;
  onUpdateAssumption: (key: keyof Assumptions, value: any) => void;
  onReset: () => void;
  onSave: (name: string) => void;
}

const AssumptionControls = ({ assumptions, onUpdateAssumption, onReset, onSave }: AssumptionControlsProps) => {
  const [scenarioName, setScenarioName] = useState('');

  const handleSave = () => {
    if (scenarioName.trim()) {
      onSave(scenarioName);
      setScenarioName('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Scenario Controls
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Capital Management */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Capital Management</h4>
            
            <div className="space-y-2">
              <Label>Capital Call Frequency: {assumptions.capitalCallFrequency} months</Label>
              <Slider
                value={[assumptions.capitalCallFrequency]}
                onValueChange={([value]) => onUpdateAssumption('capitalCallFrequency', value)}
                max={24}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Distribution Timing</Label>
              <Select
                value={assumptions.distributionTiming}
                onValueChange={(value) => onUpdateAssumption('distributionTiming', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Commitment Pace: ${assumptions.commitmentPace}M annually</Label>
              <Slider
                value={[assumptions.commitmentPace]}
                onValueChange={([value]) => onUpdateAssumption('commitmentPace', value)}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Reserve Ratio: {assumptions.reserveRatio}%</Label>
              <Slider
                value={[assumptions.reserveRatio]}
                onValueChange={([value]) => onUpdateAssumption('reserveRatio', value)}
                max={25}
                min={5}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Fund Performance */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Expected Returns</h4>
            
            <div className="space-y-2">
              <Label>Private Equity IRR: {assumptions.privateEquityIRR}%</Label>
              <Slider
                value={[assumptions.privateEquityIRR]}
                onValueChange={([value]) => onUpdateAssumption('privateEquityIRR', value)}
                max={25}
                min={8}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Hedge Funds IRR: {assumptions.hedgeFundsIRR}%</Label>
              <Slider
                value={[assumptions.hedgeFundsIRR]}
                onValueChange={([value]) => onUpdateAssumption('hedgeFundsIRR', value)}
                max={20}
                min={5}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Real Estate IRR: {assumptions.realEstateIRR}%</Label>
              <Slider
                value={[assumptions.realEstateIRR]}
                onValueChange={([value]) => onUpdateAssumption('realEstateIRR', value)}
                max={18}
                min={4}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Infrastructure IRR: {assumptions.infrastructureIRR}%</Label>
              <Slider
                value={[assumptions.infrastructureIRR]}
                onValueChange={([value]) => onUpdateAssumption('infrastructureIRR', value)}
                max={15}
                min={4}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>

          {/* Market Conditions */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Market Environment</h4>
            
            <div className="space-y-2">
              <Label>Economic Growth: {assumptions.economicGrowth}%</Label>
              <Slider
                value={[assumptions.economicGrowth]}
                onValueChange={([value]) => onUpdateAssumption('economicGrowth', value)}
                max={8}
                min={-5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Interest Rate: {assumptions.interestRate}%</Label>
              <Slider
                value={[assumptions.interestRate]}
                onValueChange={([value]) => onUpdateAssumption('interestRate', value)}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Market Volatility</Label>
              <Select
                value={assumptions.marketVolatility}
                onValueChange={(value) => onUpdateAssumption('marketVolatility', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Inflation: {assumptions.inflation}%</Label>
              <Slider
                value={[assumptions.inflation]}
                onValueChange={([value]) => onUpdateAssumption('inflation', value)}
                max={6}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Save Scenario */}
          <div className="space-y-2 pt-4 border-t">
            <Label>Save Current Scenario</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Scenario name..."
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
              <Button onClick={handleSave} disabled={!scenarioName.trim()}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssumptionControls;
