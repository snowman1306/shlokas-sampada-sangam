import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export const openAIService = {
  async chat(message: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: "You are an AI assistant for farmers, knowledgeable about agriculture, weather patterns, government policies, and traditional farming wisdom. You can read and explain Sanskrit shlokas, provide farming advice, and explain government schemes. Keep responses helpful and concise." 
          },
          { role: "user", content: message }
        ],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0]?.message?.content || "I apologize, I couldn't process that request.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  }
};