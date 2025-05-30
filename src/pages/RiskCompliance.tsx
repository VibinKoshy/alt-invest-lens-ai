
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
      <main className="px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk & Compliance Dashboard</h2>
          <p className="text-gray-600">Monitor portfolio risks, compliance status, and regulatory requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <ComplianceOverview />
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="concentration">Concentration Risk</TabsTrigger>
            <TabsTrigger value="allocation">Allocation Compliance</TabsTrigger>
            <TabsTrigger value="esg">ESG & Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ExposureAlerts filter={alertFilter} onFilterChange={setAlertFilter} />
              <div className="space-y-6">
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
