import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;

const getSystemInstruction = (): string => {
  return "You are a friendly host in a public guest chat room. Welcome the user and chat with them casually. Keep your responses brief and engaging. Your name is Jalpa.";
};

export const startGuestChatSession = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    return;
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemInstruction = getSystemInstruction();
  
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

export const sendMessageToBot = async (message: string): Promise<string> => {
  if (!chat) {
    startGuestChatSession();
    if (!chat) {
       throw new Error("Chat session could not be started.");
    }
  }
  
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
