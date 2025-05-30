
import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const isOpenAIInitialized = () => openaiClient !== null;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const sendChatMessage = async (
  messages: ChatMessage[],
  portfolioContext: string
): Promise<string> => {
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
