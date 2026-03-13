const OpenAI = require("openai");
const { getCachedAnalysis, cacheAnalysis } = require("./cacheService");
const { OPENAI_MODEL, OPENAI_ANALYZE_PROMPT } = require("../utils/constants");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const analyzeJournal = async (text) => {
  try {

    // Return cached result if available
    const cached = await getCachedAnalysis(text);
    if (cached) {
      return cached;
    }

    const prompt = OPENAI_ANALYZE_PROMPT.replace(
      "{{JOURNAL_TEXT}}",
      text
    );

    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You analyze journal entries and return emotion, keywords, and summary in JSON format only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    let result;

    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      result = {};
    }

    const analysis = {
      emotion: result.emotion || "neutral",
      keywords: Array.isArray(result.keywords) ? result.keywords : [],
      summary: result.summary || ""
    };

    // Cache the result
    await cacheAnalysis(text, analysis);

    return analysis;

  } catch (error) {
    console.error("OpenAI API Error:", error.message);

    // Fallback instead of crashing the API
    return {
      emotion: "neutral",
      keywords: [],
      summary: ""
    };
  }
};

module.exports = { analyzeJournal };