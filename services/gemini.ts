
import { GoogleGenAI, Modality } from "@google/genai";
import { MOCK_MARKET, MOCK_WORKERS, MOCK_TRANSPORT } from "../constants";

export const getBondhuBotResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Format local data into a string context for the AI
  const marketContext = MOCK_MARKET.map(i => `${i.name}: ৳${i.price} per ${i.unit}`).join(", ");
  const workerContext = MOCK_WORKERS.map(w => `${w.name} (${w.type}, Rating: ${w.rating})`).join(", ");
  const transportContext = MOCK_TRANSPORT.map(t => `${t.from} to ${t.to} via ${t.mode} costs ৳${t.fare}`).join(", ");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `আপনি "বন্ধুবট" (BondhuBot), বাংলাদেশের একটি অত্যন্ত মেধাবী ও বন্ধুত্বপূর্ণ এআই সহকারী। 
        আপনার কাছে বর্তমান অ্যাপের কিছু স্থানীয় তথ্য (Local Database) আছে:
        - বাজারের দাম: ${marketContext}
        - কাজের লোক: ${workerContext}
        - যাতায়াত তথ্য: ${transportContext}

        আপনার কাজ:
        1. ব্যবহারকারী কোনো দাম বা তথ্য জানতে চাইলে উপরের তালিকা থেকে সঠিক তথ্য দিন। 
        2. তালিকার বাইরে কিছু জিজ্ঞাসা করলে আপনার সাধারণ জ্ঞান ব্যবহার করুন কিন্তু বিনয়ের সাথে জানান যে এটি অ্যাপের তালিকায় নেই।
        3. সবসময় বাংলায় কথা বলুন।
        4. উত্তর খুব সংক্ষিপ্ত এবং কাজের হতে হবে।
        5. যদি কেউ কোনো সমস্যার কথা বলে (যেমন: প্লাম্বার দরকার), তাকে আশ্বস্ত করুন এবং "কাজের লোক" সেকশন দেখতে বলুন।`,
        temperature: 0.7,
      },
    });

    return response.text || "আমি আপনার কথা বুঝতে পারিনি। আবার বলবেন কি?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।";
  }
};

export const generateSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (err) {
    console.error("TTS Error", err);
    return null;
  }
};
