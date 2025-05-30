
import { useState } from 'react';
import ConcentrationRisk from '@/components/risk/ConcentrationRisk';
import AllocationCompliance from '@/components/risk/AllocationCompliance';
import ESGCompliance from '@/components/risk/ESGCompliance';
import ExposureAlerts from '@/components/risk/ExposureAlerts';
import ComplianceOverview from '@/components/risk/ComplianceOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RiskCompliance = () => {
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning'>('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Risk & Compliance Dashboard</h2>
          <p className="text-sm md:text-base text-gray-600">Monitor portfolio risks, compliance status, and regulatory requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <ComplianceOverview />
        </div>

        <Tabs defaultValue="overview" className="space-y-6 md:space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-[600px] gap-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm px-2 md:px-4">Overview</TabsTrigger>
            <TabsTrigger value="concentration" className="text-xs md:text-sm px-2 md:px-4">Concentration</TabsTrigger>
            <TabsTrigger value="allocation" className="text-xs md:text-sm px-2 md:px-4">Allocation</TabsTrigger>
            <TabsTrigger value="esg" className="text-xs md:text-sm px-2 md:px-4">ESG & Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <ExposureAlerts filter={alertFilter} onFilterChange={setAlertFilter} />
              <div className="space-y-4 md:space-y-6">
                <ConcentrationRisk />
                <AllocationCompliance />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="concentration">
            <ConcentrationRisk detailed />
          </TabsContent>

          <TabsContent value="allocation">
            <AllocationCompliance detailed />
          </TabsContent>

          <TabsContent value="esg">
            <ESGCompliance detailed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RiskCompliance;
