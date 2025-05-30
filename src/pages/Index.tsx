
import MetricsCard from '@/components/MetricsCard';
import AllocationChart from '@/components/AllocationChart';
import PerformanceChart from '@/components/PerformanceChart';
import HoldingsTable from '@/components/HoldingsTable';
import RiskMetrics from '@/components/RiskMetrics';

const Index = () => {
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
              value="8 years"
              change="-1 year"
              changeType="negative"
              subtitle="concentration"
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
