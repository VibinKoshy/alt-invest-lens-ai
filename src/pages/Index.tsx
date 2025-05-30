
import MetricsCard from '@/components/MetricsCard';
import AllocationChart from '@/components/AllocationChart';
import PerformanceChart from '@/components/PerformanceChart';
import HoldingsTable from '@/components/HoldingsTable';
import RiskMetrics from '@/components/RiskMetrics';

const Index = () => {
  // Calculate vintage spread (IRR best vintage - IRR worst vintage)
  const calculateVintageSpread = () => {
    // Sample vintage IRR data - in real implementation this would come from API/state
    const vintageIRRs = {
      2019: 24.8,
      2020: 12.4,
      2021: 18.2,
      2022: 21.5,
      2023: 16.3
    };
    
    const irrValues = Object.values(vintageIRRs);
    const maxIRR = Math.max(...irrValues);
    const minIRR = Math.min(...irrValues);
    const spread = maxIRR - minIRR;
    
    return {
      spread: spread.toFixed(1),
      change: "+1.2" // This would be calculated based on previous period
    };
  };

  const vintageSpreadData = calculateVintageSpread();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8">
        {/* Portfolio Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Total AUM"
              value="$2.4B"
              change="+8.2%"
              changeType="positive"
              subtitle="vs last quarter"
            />
            <MetricsCard
              title="Net IRR"
              value="17.5%"
              change="+2.3%"
              changeType="positive"
              subtitle="annualized"
            />
            <MetricsCard
              title="Portfolio Multiple"
              value="1.34x"
              change="+0.12x"
              changeType="positive"
              subtitle="TVPI"
            />
            <MetricsCard
              title="Vintage Spread"
              value={`${vintageSpreadData.spread}%`}
              change={`${vintageSpreadData.change}%`}
              changeType="positive"
              subtitle="IRR variance"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AllocationChart />
          <PerformanceChart />
        </div>

        {/* Holdings and Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HoldingsTable />
          </div>
          <div>
            <RiskMetrics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
