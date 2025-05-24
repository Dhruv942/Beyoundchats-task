// Define types for Gemini API response
export interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}
export const formatTimestamp = (ts: string | number): string => {
  return new Date(ts).toLocaleString();
};


export const fetchGeminiResponse = async (prompt: string): Promise<string | null> => {
  const apiKey = "AIzaSyBTSeCULiEKs6lkYHx59BH7d4i7b9U9oAM"; // hardcoded only for dev/testing

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    console.error('Gemini API error:', response.statusText);
    return null;
  }

  const data: GeminiApiResponse = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
};

