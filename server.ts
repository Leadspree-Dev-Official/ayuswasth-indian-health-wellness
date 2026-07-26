import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fallback gracefully.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// 1. Prakriti Deep Analysis Endpoint
app.post("/api/prakriti-analysis", async (req, res) => {
  try {
    const { score, answers } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        summary: `Your predominant Prakriti constitution is ${score.dominant.toUpperCase()} (Vata: ${score.vata}%, Pitta: ${score.pitta}%, Kapha: ${score.kapha}%).`,
        recommendations: [
          "Maintain regular meal times to stabilize digestive fire (Agni).",
          "Favor warm, freshly cooked foods with ghee and mild warming spices.",
          "Practice daily gentle pranayama like Anulom Vilom for 10 minutes."
        ],
        foodsToFavor: ["Warm cooked grains", "Mung dal kitchari", "A2 Ghee", "Sweet ripe fruits"],
        foodsToAvoid: ["Raw cold salads", "Ice cold drinks", "Excessive processed sugar"],
        dinacharyaFocus: "Focus on early morning warm water (Ushapana) and grounding night routines."
      });
    }

    const prompt = `Act as a master Ayurvedic Vaidya and holistic Indian health scholar.
Analyze this user's Prakriti quiz results:
Prakriti Score: Vata: ${score.vata}%, Pitta: ${score.pitta}%, Kapha: ${score.kapha}%.
Dominant Dosha: ${score.dominant}.

User responses summary:
${JSON.stringify(answers)}

Provide a detailed, compassionate, and practical Ayurvedic diagnostic report. Include:
1. Constitutional Overview (explain why this combination manifests in their physical & mental tendencies).
2. Agni & Gut Health guidance.
3. Foods to favor vs foods to minimize.
4. Ideal seasonal/daily routine (Dinacharya & Ritucharya).
5. Recommended herbs and yoga practices.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Compassionate constitutional summary" },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 key actionable lifestyle recommendations"
            },
            foodsToFavor: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of nourishing foods suitable for this constitution"
            },
            foodsToAvoid: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of aggravating foods to minimize"
            },
            dinacharyaFocus: { type: Type.STRING, description: "Personalized daily routine advice" }
          },
          required: ["summary", "recommendations", "foodsToFavor", "foodsToAvoid", "dinacharyaFocus"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/prakriti-analysis:", error);
    res.status(500).json({ error: "Failed to generate Prakriti report." });
  }
});

// 2. AI Indian Meal Plan Generator
app.post("/api/generate-meal-plan", async (req, res) => {
  try {
    const { dosha, dietaryPref, goal, regionPreference } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        plan: [
          {
            day: 1,
            breakfast: "Sprouted Moong Chilla with Mint Chutney & Herbal Chai",
            lunch: "Tridoshic Moong Dal Kitchari with A2 Ghee & Roasted Cumin Papad",
            eveningSnack: "Roasted Fox Nuts (Makhana) with Turmeric & Himalayan Salt",
            dinner: "Yellow Pumpkin Soup with Jowar Roti & Steamed Lauki Sabzi",
            herbalKadha: "Tulsi Ginger Black Pepper Infusion",
            dailyTip: "Sip warm water throughout the day to boost Agni digestion."
          },
          {
            day: 2,
            breakfast: "Foxtail Millet Poha with Curry Leaves & Peanuts",
            lunch: "Ragi Roti with Palak Dal & Sprouted Bean Salad",
            eveningSnack: "Warm Almond Ragi Malt with Cardamom",
            dinner: "Kitchari with Steamed Vegetables & Ghee",
            herbalKadha: "Golden Turmeric Ashwagandha Milk",
            dailyTip: "Avoid drinking iced water right after meals."
          },
          {
            day: 3,
            breakfast: "Oats & Flaxseed Idli with Coconut Chutney",
            lunch: "Multigrain Khichdi with Steamed Lauki and Curd",
            eveningSnack: "Boiled Sprouted Chana Chaat with Coriander & Lemon",
            dinner: "Light Moong Soup with Sautéed Ridge Gourd & Bajra Roti",
            herbalKadha: "Triphala Water at Bedtime",
            dailyTip: "Chew every bite 24 times to activate salivary enzymes."
          }
        ]
      });
    }

    const prompt = `Create a personalized 3-Day Indian Sattvic Meal Plan for an individual with:
Dosha focus: ${dosha || "Tridoshic"}
Dietary Preference: ${dietaryPref || "Vegetarian"}
Primary Health Goal: ${goal || "Overall Immunity & Gut Health"}
Regional Cuisine Preference: ${regionPreference || "Pan-Indian"}

Each day must feature authentic Indian healthy dishes (incorporating millets like ragi/jowar/bajra, sprouted lentils, digestive spices like cumin/ajwain/turmeric, ghee, and herbal kadhas).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  breakfast: { type: Type.STRING },
                  lunch: { type: Type.STRING },
                  eveningSnack: { type: Type.STRING },
                  dinner: { type: Type.STRING },
                  herbalKadha: { type: Type.STRING },
                  dailyTip: { type: Type.STRING }
                },
                required: ["day", "breakfast", "lunch", "eveningSnack", "dinner", "herbalKadha", "dailyTip"]
              }
            }
          },
          required: ["plan"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/generate-meal-plan:", error);
    res.status(500).json({ error: "Failed to generate meal plan." });
  }
});

// 3. Custom Yoga Sequence Generator
app.post("/api/generate-yoga-sequence", async (req, res) => {
  try {
    const { targetGoal, durationMins, experienceLevel } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        sequenceTitle: `Holistic ${targetGoal || 'Wellness'} Yoga & Breath Sequence`,
        totalDuration: `${durationMins || 20} minutes`,
        poses: [
          {
            sanskritName: "Surya Namaskar",
            englishName: "Sun Salutation",
            duration: "6 minutes (4 rounds)",
            instruction: "Warm up joint movement and awaken vital energy.",
            focus: "Full body flow"
          },
          {
            sanskritName: "Bhujangasana",
            englishName: "Cobra Pose",
            duration: "3 minutes",
            instruction: "Inhale gently lift chest, open throat and heart area.",
            focus: "Spinal extension & lower back strengthen"
          },
          {
            sanskritName: "Viparita Karani",
            englishName: "Legs up the Wall",
            duration: "5 minutes",
            instruction: "Rest comfortably with legs elevated against wall.",
            focus: "Parasympathetic calming"
          },
          {
            sanskritName: "Anulom Vilom",
            englishName: "Alternate Nostril Breathing",
            duration: "6 minutes",
            instruction: "Slow rhythmic nostril breathing focusing on calm awareness.",
            focus: "Nadi purification & mental clarity"
          }
        ]
      });
    }

    const prompt = `Design a tailored Indian Yoga & Pranayama sequence for:
Goal/Focus: ${targetGoal}
Duration: ${durationMins || 20} minutes
Level: ${experienceLevel || 'Beginner'}

Provide 4 to 5 structured yoga poses / pranayama techniques with Sanskrit name, English name, duration, precise instruction, and therapeutic focus.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sequenceTitle: { type: Type.STRING },
            totalDuration: { type: Type.STRING },
            poses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sanskritName: { type: Type.STRING },
                  englishName: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  instruction: { type: Type.STRING },
                  focus: { type: Type.STRING }
                },
                required: ["sanskritName", "englishName", "duration", "instruction", "focus"]
              }
            }
          },
          required: ["sequenceTitle", "totalDuration", "poses"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/generate-yoga-sequence:", error);
    res.status(500).json({ error: "Failed to generate yoga sequence." });
  }
});

// 4. Ask AI Vaidya (Ayurvedic Expert) Consultation
app.post("/api/ask-vaidya", async (req, res) => {
  try {
    const { message, userDosha } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `Namaste! As an Ayurvedic wellness guide, I recommend focusing on balancing your ${userDosha || 'constitution'} with warm Sattvic meals, fresh ginger & tulsi infusions, and gentle pranayama. Please remember that severe or chronic conditions should always be evaluated by a certified medical practitioner.`
      });
    }

    const prompt = `You are "Vaidya Ananda", an expert Ayurvedic physician and traditional Indian wellness scholar.
User Question: "${message}"
User Dosha Context (if known): ${userDosha || "Not specified"}

Provide a warm, authoritative, authentic Ayurvedic response rooted in Classical Ayurvedic principles (Rasa, Virya, Vipaka, Agni, Dhatus, Doshas). Recommend natural home herbs (like Tulsi, Ashwagandha, Turmeric, Amla, Triphala), dietary tweaks, and Pranayama practices. Always include a brief polite disclaimer that your guidance is for educational and wellness purposes.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Vaidya Ananda, an empathetic and deeply knowledgeable Ayurvedic wellness expert. Provide clear, well-structured, and helpful advice with classical Indian health wisdom."
      }
    });

    res.json({ reply: response.text || "Namaste. I am here to help guide your Ayurvedic journey." });
  } catch (error) {
    console.error("Error in /api/ask-vaidya:", error);
    res.status(500).json({ error: "Failed to query AI Vaidya." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
