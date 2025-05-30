import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;
let isDemoMode = false;

export const initializeOpenAI = (apiKey: string) => {
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
  isDemoMode = false;
};

export const enableDemoMode = () => {
  isDemoMode = true;
  openaiClient = null;
};

export const isOpenAIInitialized = () => openaiClient !== null || isDemoMode;

export const isInDemoMode = () => isDemoMode;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const getDemoResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('performance') || message.includes('return')) {
    return `**Portfolio Performance Summary (Demo Data)**

**YTD Performance:**
• Total Portfolio Return: +8.4%
• Benchmark (60/40): +6.2%
• Outperformance: +2.2%

**Key Highlights:**
• Private Equity: +12.8% (best performer)
• Real Estate: +9.1% 
• Hedge Funds: +5.3%
• Public Equity: +7.9%

**Notable Trends:**
• Strong performance in technology and healthcare sectors
• Real estate benefiting from infrastructure investments
• Consistent alpha generation across alternative strategies

*Note: This is demo data for illustration purposes.*`;
  }
  
  if (message.includes('risk') || message.includes('exposure')) {
    return `**Risk Analysis Overview (Demo Data)**

**Current Risk Metrics:**
• Portfolio VaR (95%): 2.1%
• Sharpe Ratio: 1.34
• Maximum Drawdown: -3.8%
• Beta vs Benchmark: 0.89

**Geographic Exposure:**
• North America: 45%
• Europe: 28%
• Asia-Pacific: 18%
• Emerging Markets: 9%

**Concentration Risk:**
• Largest position: 4.2% (within limits)
• Top 10 holdings: 31.5%
• Sector concentration: Moderate

**Risk Assessment:** Portfolio maintains well-diversified risk profile with controlled exposure levels.

*Note: This is demo data for illustration purposes.*`;
  }
  
  if (message.includes('allocation') || message.includes('asset')) {
    return `**Asset Allocation Analysis (Demo Data)**

**Current Allocation:**
• Private Equity: 25% (Target: 25%)
• Public Equity: 30% (Target: 30%)
• Real Estate: 15% (Target: 15%)
• Hedge Funds: 20% (Target: 20%)
• Fixed Income: 8% (Target: 8%)
• Cash: 2% (Target: 2%)

**Compliance Status:**
✅ All asset classes within target ranges
✅ Geographic limits maintained
✅ ESG requirements met

**Recommendations:**
• Consider slight overweight to private equity given strong pipeline
• Monitor fixed income duration in current rate environment

*Note: This is demo data for illustration purposes.*`;
  }
  
  if (message.includes('compliance') || message.includes('alert')) {
    return `**Compliance Dashboard (Demo Data)**

**Current Status:** 🟢 All Clear

**Recent Alerts (Resolved):**
• ✅ Geographic concentration limit - Resolved 3 days ago
• ✅ ESG score threshold - Resolved 1 week ago

**Upcoming Reviews:**
• Quarterly compliance review - Due in 15 days
• Annual policy update - Due in 45 days

**Key Metrics:**
• Liquidity ratio: 12.3% (Target: >10%)
• ESG score: 87/100 (Target: >75)
• Regulatory capital ratio: 18.4% (Required: >15%)

**Action Items:** No immediate action required. All metrics within acceptable ranges.

*Note: This is demo data for illustration purposes.*`;
  }
  
  if (message.includes('esg') || message.includes('sustainability')) {
    return `**ESG & Sustainability Report (Demo Data)**

**Overall ESG Score:** 87/100 (Excellent)

**Component Scores:**
• Environmental: 85/100
• Social: 88/100  
• Governance: 89/100

**Key Initiatives:**
• 45% of portfolio in ESG-focused investments
• $2.3B committed to renewable energy projects
• Carbon footprint reduced by 23% YoY

**Impact Metrics:**
• Green buildings: 67% of real estate portfolio
• Clean technology investments: $890M
• Diverse fund managers: 38% of allocations

**Areas for Improvement:**
• Increase water sustainability focus
• Expand social impact measurement

*Note: This is demo data for illustration purposes.*`;
  }
  
  // Default response
  return `**AI Portfolio Assistant (Demo Mode)**

Thank you for your question about "${userMessage}". 

I'm currently running in demo mode with sample portfolio data. In the full version with your API key, I would provide detailed analysis of your actual portfolio data including:

• Real-time performance metrics and benchmarking
• Risk analysis and exposure breakdowns  
• Compliance monitoring and alerts
• Custom scenario modeling
• Detailed investment recommendations

**Sample Portfolio Overview (Demo Data):**
• Total AUM: $2.4B
• YTD Return: +8.4%
• Risk-Adjusted Return: Strong
• Compliance Status: All Clear

To get analysis of your actual portfolio data, please enter your OpenAI API key above.

*Note: This is demo data for illustration purposes.*`;
};

export const sendChatMessage = async (
  messages: ChatMessage[],
  portfolioContext: string
): Promise<string> => {
  if (isDemoMode) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lastUserMessage = messages[messages.length - 1];
    return getDemoResponse(lastUserMessage?.content || '');
  }

  if (!openaiClient) {
    throw new Error('OpenAI client not initialized');
  }

  const systemPrompt = `You are a professional financial portfolio analyst assistant for institutional investors. 
You have access to real-time portfolio data and should provide insightful, accurate financial analysis.

Current Portfolio Context:
${portfolioContext}

Guidelines:
- Provide concise, professional responses
- Use financial terminology appropriately
- Include specific numbers and percentages when available
- Suggest actionable insights when relevant
- Format responses clearly with bullet points or sections when helpful
- If you reference specific data, be precise about time periods and sources`;

  const openaiMessages = [
    { role: 'system' as const, content: systemPrompt },
    ...messages.map(msg => ({ 
      role: msg.role as 'user' | 'assistant', 
      content: msg.content 
    }))
  ];

  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: openaiMessages,
    temperature: 0.2,
    max_tokens: 1000,
    stream: false
  });

  return response.choices[0]?.message?.content || 'No response generated';
};
