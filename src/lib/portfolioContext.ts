
export const buildPortfolioContext = (): string => {
  // This simulates extracting data from the existing components
  // In a real implementation, this would pull from actual state/API
  
  const performanceData = {
    ytdReturn: 17.5,
    benchmark: 12.1,
    monthlyReturns: [8.2, 9.1, 8.8, 10.2, 11.5, 12.1, 13.2, 12.8, 14.1, 15.2, 16.8, 17.5]
  };

  const allocationData = [
    { name: 'Private Equity', value: 35 },
    { name: 'Hedge Funds', value: 25 },
    { name: 'Real Estate', value: 20 },
    { name: 'Infrastructure', value: 15 },
    { name: 'Other Alternatives', value: 5 }
  ];

  const riskMetrics = {
    portfolioVaR: 8.2,
    concentrationRisk: 'Medium',
    liquidityRisk: 'High',
    vintageDiversification: 'Good'
  };

  const complianceStatus = {
    overallScore: 94,
    activeAlerts: 3,
    esgCompliance: 91,
    concentrationLevel: 'Medium'
  };

  // Vintage IRR data for context
  const vintageData = {
    bestVintageIRR: 24.8,
    worstVintageIRR: 12.4,
    vintageSpread: 12.4
  };

  return `
PORTFOLIO PERFORMANCE:
- Year-to-Date Return: ${performanceData.ytdReturn}%
- Benchmark Return: ${performanceData.benchmark}%
- Outperformance: +${(performanceData.ytdReturn - performanceData.benchmark).toFixed(1)}%
- Recent Monthly Performance: ${performanceData.monthlyReturns.slice(-3).join('%, ')}%

ASSET ALLOCATION:
${allocationData.map(item => `- ${item.name}: ${item.value}%`).join('\n')}

RISK METRICS:
- Portfolio VaR (95%): ${riskMetrics.portfolioVaR}%
- Concentration Risk: ${riskMetrics.concentrationRisk}
- Liquidity Risk: ${riskMetrics.liquidityRisk}
- Vintage Diversification: ${riskMetrics.vintageDiversification}

VINTAGE ANALYSIS:
- Best Vintage IRR: ${vintageData.bestVintageIRR}%
- Worst Vintage IRR: ${vintageData.worstVintageIRR}%
- Vintage Spread (Best - Worst): ${vintageData.vintageSpread}%

COMPLIANCE STATUS:
- Overall Compliance Score: ${complianceStatus.overallScore}%
- Active Alerts: ${complianceStatus.activeAlerts}
- ESG Compliance: ${complianceStatus.esgCompliance}%
- Concentration Risk Level: ${complianceStatus.concentrationLevel}

Current Date: ${new Date().toLocaleDateString()}
Portfolio Type: Institutional Alternative Investments
`;
};
