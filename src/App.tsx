
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataUpload from "./pages/DataUpload";
import ScenarioModeling from "./pages/ScenarioModeling";
import RiskCompliance from "./pages/RiskCompliance";
import ReportsExports from "./pages/ReportsExports";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<DataUpload />} />
            <Route path="/scenarios" element={<ScenarioModeling />} />
            <Route path="/risk-compliance" element={<RiskCompliance />} />
            <Route path="/reports" element={<ReportsExports />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
