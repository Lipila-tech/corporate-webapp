
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Lipila Technologies AI Assistant. Lipila is a Zambian tech company specialized in:
- SaaS Platforms (Education, HR, Operations)
- Payment Systems (Gateways, Mobile Money integration, POS)
- Custom Software Development (Web, Mobile, Enterprise, Mobile Apps)
- Sectors: Finance, Education, Retail, Enterprise Services.

Your goal is to answer questions about the company's services, career opportunities, and culture.
Keep responses concise, professional, and helpful. Mention that Lipila is based in Kitwe, Zambia.
If someone asks about jobs, mention they can find current openings on the Careers page.
`;

export async function askAssistant(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Lipila Assistant is currently offline. Please try again later.";
  }
}
