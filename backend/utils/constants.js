module.exports = {
  AMBIENCES: ['forest', 'ocean', 'mountain'],
  EMOTIONS: ['happy', 'sad', 'calm', 'anxious', 'excited', 'neutral'],
  
  // OpenAI
  OPENAI_MODEL: 'gpt-4o-mini',
  OPENAI_ANALYZE_PROMPT: `Analyze this journal entry and return ONLY valid JSON in this exact format:

{
  "emotion": "one of: happy,sad,calm,anxious,excited,neutral",
  "keywords": ["word1", "word2", "word3"],
  "summary": "Short 1-sentence summary"
}

Journal: {{JOURNAL_TEXT}}

Be precise and concise.`,
  
  // Cache
  CACHE_TTL_ANALYSIS: 3600, // 1 hour
  CACHE_TTL_INSIGHTS: 300, // 5 min
};

