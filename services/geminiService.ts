import axios from 'axios';

const BASE_URL = 'https://lipilaapi.pythonanywhere.com/api';
// const BASE_URL = 'http://localhost:8000/api';


export async function askAssistant(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/assistant/ask/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data.reply;
  } catch (error) {
    console.error("Assistant error:", error);
    return "The Lipila Assistant is currently unavailable. Please try again later.";
  }
}
