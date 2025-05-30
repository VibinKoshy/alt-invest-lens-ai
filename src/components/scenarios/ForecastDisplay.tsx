
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Assumptions } from '@/pages/ScenarioModeling';

interface ForecastDisplayProps {
  assumptions: Assumptions;
}

const ForecastDisplay = ({ assumptions }: ForecastDisplayProps) => {
  // Generate forecast data based on assumptions
  const navProjections = useMemo(() => {
    const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
    return years.map((year, index) => {
      const baseGrowth = (assumptions.privateEquityIRR * 0.35 + 
                         assumptions.hedgeFundsIRR * 0.25 + 
                         assumptions.realEstateIRR * 0.20 + 
                         assumptions.infrastructureIRR * 0.15 + 
                         8 * 0.05) / 100;
      
      const marketImpact = assumptions.marketVolatility === 'high' ? 0.85 : 
                          assumptions.marketVolatility === 'low' ? 1.15 : 1.0;
      
      const economicImpact = 1 + (assumptions.economicGrowth / 100) * 0.3;
      
      const adjustedGrowth = baseGrowth * marketImpact * economicImpact;
      
      const nav = 2400 * Math.pow(1 + adjustedGrowth, index + 1);
      const p10 = nav * 0.7;
      const p90 = nav * 1.4;
      
      return {
        year,
        nav: Math.round(nav),
        p10: Math.round(p10),
        p90: Math.round(p90)
      };
    });
  }, [assumptions]);

  const cashFlowProjections = useMemo(() => {
    const quarters = Array.from({ length: 40 }, (_, i) => `Q${(i % 4) + 1} ${Math.floor(i / 4) + 2024}`);
    return quarters.map((quarter, index) => {
      const callsFrequency = 12 / assumptions.capitalCallFrequency;
      const calls = (index % Math.max(1, Math.round(12 / assumptions.capitalCallFrequency)) === 0) ? 
                   assumptions.commitmentPace * 0.25 : 0;
      
      const distributions = index > 8 ? 
                           (assumptions.commitmentPace * 0.15 * (1 + index * 0.02)) : 0;
      
      const netCashFlow = distributions - calls;
      
      return {
        quarter,
        calls: -calls,
        distributions,
        netCashFlow
      };
    });
  }, [assumptions]);

  const allocationImpact = useMemo(() => {
    const baseAllocations = [
      { name: 'Private Equity', current: 35, target: 35 },
      { name: 'Hedge Funds', current: 25, target: 25 },
      { name: 'Real Estate', current: 20, target: 20 },
      { name: 'Infrastructure', current: 15, target: 15 },
      { name: 'Other Alternatives', current: 5, target: 5 }
    ];

    return baseAllocations.map(allocation => {
      // Simulate drift based on performance assumptions
      const performanceMap: { [key: string]: number } = {
        'Private Equity': assumptions.privateEquityIRR,
        'Hedge Funds': assumptions.hedgeFundsIRR,
        'Real Estate': assumptions.realEstateIRR,
        'Infrastructure': assumptions.infrastructureIRR,
        'Other Alternatives': 8
      };
      
      const performance = performanceMap[allocation.name] || 8;
      const avgPerformance = (assumptions.privateEquityIRR + assumptions.hedgeFundsIRR + 
                             assumptions.realEstateIRR + assumptions.infrastructureIRR + 8) / 5;
      
      const drift = (performance - avgPerformance) * 0.5;
      const projected = Math.max(0, allocation.current + drift);
      
      return {
        ...allocation,
        projected: Math.round(projected * 10) / 10,
        drift: Math.round(drift * 10) / 10
      };
    });
  }, [assumptions]);

  const chartConfig = {
    nav: { label: "NAV", color: "#3b82f6" },
    p10: { label: "P10", color: "#ef4444" },
    p90: { label: "P90", color: "#10b981" },
    calls: { label: "Capital Calls", color: "#ef4444" },
    distributions: { label: "Distributions", color: "#10b981" },
    netCashFlow: { label: "Net Cash Flow", color: "#3b82f6" }
  };

  return (
    <div className="space-y-6">
      {/* NAV Projections */}
      <Card>
        <CardHeader>
          <CardTitle>NAV Projections (10-Year)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={navProjections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="p10" stroke="var(--color-p10)" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="nav" stroke="var(--color-nav)" strokeWidth={3} />
              <Line type="monotone" dataKey="p90" stroke="var(--color-p90)" strokeDasharray="5 5" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cash Flow Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Projections (10-Year)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={cashFlowProjections.slice(0, 20)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" angle={-45} textAnchor="end" height={60} />
              <YAxis tickFormatter={(value) => `$${value}M`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="calls" fill="var(--color-calls)" />
              <Bar dataKey="distributions" fill="var(--color-distributions)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Allocation Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allocationImpact.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Current: {item.current}%</span>
                    <span>Projected: {item.projected}%</span>
                    <span className={`font-medium ${item.drift >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.drift >= 0 ? '+' : ''}{item.drift}%
                    </span>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.projected / 40) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastDisplay;
